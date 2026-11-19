#!/bin/bash

# Docker version to install and maintain
DOCKER_VERSION="28.5.0"

# In a terminal, steps show a spinner and a one-line result, and command output
# goes to a log file whose last lines are shown if a step fails. Elsewhere (CI,
# redirected output) command output streams as before.
#
# Keep this POSIX sh: it runs as `curl ... | sh`, and sh is dash on Debian/Ubuntu.

if [ -t 1 ] && [ "${TERM:-}" != "dumb" ]; then
    PRETTY=1
else
    PRETTY=0
fi

ESC=$(printf '\033')
if [ "$PRETTY" = 1 ] && [ -z "${NO_COLOR:-}" ]; then
    GREEN="${ESC}[0;32m"
    YELLOW="${ESC}[1;33m"
    BLUE="${ESC}[0;34m"
    RED="${ESC}[0;31m"
    CYAN="${ESC}[0;36m"
    BOLD="${ESC}[1m"
    DIM="${ESC}[2m"
    NC="${ESC}[0m"
else
    GREEN=""; YELLOW=""; BLUE=""; RED=""; CYAN=""; BOLD=""; DIM=""; NC=""
fi

case "${LC_ALL:-${LC_CTYPE:-${LANG:-}}}" in
    *UTF-8*|*utf-8*|*UTF8*|*utf8*)
        SYM_OK="✓"; SYM_WARN="⚠"; SYM_FAIL="✗"; SYM_ARROW="›"; BAR="│"
        SPIN_FRAMES="⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏"
        ;;
    *)
        SYM_OK="+"; SYM_WARN="!"; SYM_FAIL="x"; SYM_ARROW=">"; BAR="|"
        SPIN_FRAMES="- \\ | /"
        ;;
esac

LOG_FILE=""
STEP_TOTAL=0
STEP_NUM=0
STEP_LABEL=""
STEP_PREFIX=""
STEP_START=0
SPINNER_PID=""
RAN_COMMANDS=0
WARNINGS=0
START_FAILED=0
RUN_START=$(date +%s)

setup_log() {
    [ "$PRETTY" = 1 ] || return 0
    if [ -d /var/log ] && [ -w /var/log ]; then
        LOG_FILE=/var/log/dokploy-install.log
    else
        LOG_FILE=$(mktemp /tmp/dokploy-install.XXXXXX 2>/dev/null) || LOG_FILE=""
    fi
    if [ -z "$LOG_FILE" ] || ! touch "$LOG_FILE" 2>/dev/null; then
        # Nowhere to write a log: stream command output instead.
        LOG_FILE=""
        PRETTY=0
        return 0
    fi
    [ -f "$LOG_FILE" ] && chmod 600 "$LOG_FILE" 2>/dev/null
    printf '\n===== %s: install.sh %s =====\n' "$(date)" "$1" >>"$LOG_FILE"
    trap on_exit EXIT
    trap on_interrupt INT
    trap on_terminate TERM
}

on_exit() {
    spinner_stop
}

on_interrupt() {
    spinner_stop
    printf '\n  %sCancelled.%s\n\n' "$RED" "$NC" >&2
    exit 130
}

# Same exit code as a shell killed by SIGTERM (128 + 15).
on_terminate() {
    spinner_stop
    exit 143
}

fmt_duration() {
    if [ "$1" -ge 60 ]; then
        printf '%dm %ds' $(($1 / 60)) $(($1 % 60))
    else
        printf '%ds' "$1"
    fi
}

terminal_width() {
    width=$(stty size </dev/tty 2>/dev/null | cut -d' ' -f2)
    case "$width" in
        ''|*[!0-9]*) width=$(tput cols 2>/dev/null) ;;
    esac
    case "$width" in
        ''|*[!0-9]*) width=80 ;;
    esac
    printf '%s' "$width"
}

spinner_start() {
    [ "$PRETTY" = 1 ] || return 0
    printf '%s[?25l' "$ESC"
    # A line wider than the terminal wraps, and \r then only returns to the
    # start of the last row, so frames pile up. Keep the line within one row.
    room=$(($(terminal_width) - ${#STEP_PREFIX} - 6))
    [ "$room" -lt 10 ] && room=10
    label=$(printf '%s' "$STEP_LABEL" | cut -c1-"$room")
    (
        parent=$$
        trap 'exit 0' TERM
        while kill -0 "$parent" 2>/dev/null; do
            for frame in $SPIN_FRAMES; do
                printf '\r  %s%s%s%s%s%s %s' "$DIM" "$STEP_PREFIX" "$NC" \
                    "$CYAN" "$frame" "$NC" "$label"
                sleep 0.1
            done
        done
    ) &
    SPINNER_PID=$!
}

spinner_stop() {
    [ -n "$SPINNER_PID" ] || return 0
    kill "$SPINNER_PID" 2>/dev/null
    wait "$SPINNER_PID" 2>/dev/null
    SPINNER_PID=""
    printf '\r%s[2K%s[?25h' "$ESC" "$ESC"
}

step() {
    STEP_NUM=$((STEP_NUM + 1))
    STEP_LABEL=$1
    STEP_PREFIX="[$STEP_NUM/$STEP_TOTAL] "
    STEP_START=$(date +%s)
    if [ "$PRETTY" = 1 ]; then
        spinner_start
    else
        printf '\n[%d/%d] %s\n' "$STEP_NUM" "$STEP_TOTAL" "$STEP_LABEL"
    fi
}

step_relabel() {
    STEP_LABEL=$1
    spinner_stop
    spinner_start
}

step_line() { # symbol color detail
    spinner_stop
    elapsed=$(($(date +%s) - STEP_START))
    timing=""
    [ "$elapsed" -ge 2 ] && timing="  $(fmt_duration "$elapsed")"
    printf '  %s[%d/%d]%s %s%s%s %-30s %s%s%s%s\n' "$DIM" "$STEP_NUM" "$STEP_TOTAL" "$NC" \
        "$2" "$1" "$NC" "$STEP_LABEL" "$DIM" "$3" "$timing" "$NC"
}

ok() {
    if [ "$PRETTY" = 1 ]; then
        step_line "$SYM_OK" "$GREEN" "${1:-}"
    elif [ -n "${1:-}" ]; then
        printf '%s\n' "$1"
    fi
}

warn() {
    WARNINGS=$((WARNINGS + 1))
    if [ "$PRETTY" = 1 ]; then
        step_line "$SYM_WARN" "$YELLOW" "$1"
    else
        printf 'Warning: %s\n' "$1" >&2
    fi
}

show_log_tail() {
    [ -n "$LOG_FILE" ] && [ "$RAN_COMMANDS" = 1 ] || return 0
    printf '\n  %sLast lines of %s:%s\n' "$DIM" "$LOG_FILE" "$NC" >&2
    tail -n 15 "$LOG_FILE" | sed "s/^/  ${DIM}${BAR}${NC} /" >&2
}

fail() {
    message=$1
    shift
    if [ "$PRETTY" = 1 ]; then
        step_line "$SYM_FAIL" "$RED" ""
        printf '\n  %sError:%s %s\n' "$RED" "$NC" "$message" >&2
        for hint in "$@"; do
            printf '  %s%s%s %s\n' "$DIM" "$SYM_ARROW" "$NC" "$hint" >&2
        done
        show_log_tail
        printf '\n' >&2
    else
        printf 'Error: %s\n' "$message" >&2
        for hint in "$@"; do
            printf '%s\n' "$hint" >&2
        done
    fi
    exit 1
}

notice() {
    title=$1
    shift
    if [ "$PRETTY" = 1 ]; then
        printf '  %s%s%s %s\n' "$YELLOW" "$SYM_WARN" "$NC" "$title"
        for detail in "$@"; do
            printf '    %s%s%s\n' "$DIM" "$detail" "$NC"
        done
    else
        printf '%s\n' "$title"
        for detail in "$@"; do
            printf '%s\n' "$detail"
        done
        printf '\n'
    fi
}

run() {
    if [ "$PRETTY" = 1 ]; then
        RAN_COMMANDS=1
        printf '\n$ %s\n' "$*" >>"$LOG_FILE"
        "$@" >>"$LOG_FILE" 2>&1
    else
        "$@"
    fi
}

run_hide_err() {
    if [ "$PRETTY" = 1 ]; then
        run "$@"
    else
        "$@" 2>/dev/null
    fi
}

with_log_stderr() {
    if [ "$PRETTY" = 1 ]; then
        "$@" 2>>"$LOG_FILE"
    else
        "$@"
    fi
}

print_header() {
    [ "$PRETTY" = 1 ] || return 0
    printf '\n  %sDokploy%s %s\n' "$BOLD" "$NC" "$1"
    printf '  %sFull output: %s%s\n\n' "$DIM" "$LOG_FILE" "$NC"
}

os_description() {
    os=""
    if [ -r /etc/os-release ]; then
        os=$(sed -n 's/^PRETTY_NAME=//p' /etc/os-release | tr -d '"')
    fi
    printf '%s, %s' "${os:-$(uname -s)}" "$(uname -m)"
}

docker_version() {
    docker --version 2>/dev/null | sed 's/^Docker version \([^,]*\).*/\1/'
}

# Detect version from environment variable or default to latest
# Usage with curl (export first): export DOKPLOY_VERSION=canary && curl -sSL https://dokploy.com/install.sh | sh
# Usage with curl (export first): export DOKPLOY_VERSION=latest && curl -sSL https://dokploy.com/install.sh | sh
# Usage with curl (bash -s): DOKPLOY_VERSION=canary bash -s < <(curl -sSL https://dokploy.com/install.sh)
# Usage with curl (default): curl -sSL https://dokploy.com/install.sh | sh (detects latest stable version)
# Usage with bash: DOKPLOY_VERSION=canary bash install.sh
# Usage with bash: DOKPLOY_VERSION=latest bash install.sh
# Usage with bash: bash install.sh (detects latest stable version)
detect_version() {
    local version="${DOKPLOY_VERSION}"

    # If no version specified, get latest stable version from GitHub releases
    if [ -z "$version" ]; then
        echo "Detecting latest stable version from GitHub..." >&2

        # Try to get latest release from GitHub by following redirects
        version=$(curl -fsSL --connect-timeout 10 -o /dev/null -w '%{url_effective}\n' \
            https://github.com/dokploy/dokploy/releases/latest 2>/dev/null | \
            sed 's#.*/tag/##')

        # When the request fails (unreachable network, rate limit), curl still
        # prints the attempted URL, which would produce an invalid image tag
        # like dokploy/dokploy:https://... Accept only values that look like a
        # release tag (e.g. v0.29.10).
        case "$version" in
            v[0-9]*) ;;
            *) version="" ;;
        esac

        # Fallback to latest tag if detection fails
        if [ -z "$version" ]; then
            echo "Warning: Could not detect latest version from GitHub, using fallback version latest" >&2
            version="latest"
        else
            echo "Latest stable version detected: $version" >&2
        fi
    fi

    echo "$version"
}

resolve_version() {
    VERSION_TAG=$(with_log_stderr detect_version)
    DOCKER_IMAGE="dokploy/dokploy:${VERSION_TAG}"
    if [ -n "${DOKPLOY_VERSION}" ]; then
        ok "$VERSION_TAG"
    elif [ "$VERSION_TAG" = "latest" ]; then
        warn "latest (could not reach GitHub to find the newest release)"
    else
        ok "$VERSION_TAG (latest stable)"
    fi
}

# Function to detect if running in Proxmox LXC container
is_proxmox_lxc() {
    # Check for LXC in environment
    if [ -n "$container" ] && [ "$container" = "lxc" ]; then
        return 0  # LXC container
    fi

    # Check for LXC in /proc/1/environ
    if grep -q "container=lxc" /proc/1/environ 2>/dev/null; then
        return 0  # LXC container
    fi

    return 1  # Not LXC
}

generate_random_password() {
    # Generate a secure random password using multiple methods with fallbacks
    local password=""

    # Try using openssl (most reliable, available on most systems)
    if command -v openssl >/dev/null 2>&1; then
        password=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-32)
    # Fallback to /dev/urandom with tr (most Linux systems)
    elif [ -r /dev/urandom ]; then
        password=$(tr -dc 'A-Za-z0-9' < /dev/urandom | head -c 32)
    # Last resort fallback using date and simple hashing
    else
        if command -v sha256sum >/dev/null 2>&1; then
            password=$(date +%s%N | sha256sum | base64 | head -c 32)
        elif command -v shasum >/dev/null 2>&1; then
            password=$(date +%s%N | shasum -a 256 | base64 | head -c 32)
        else
            # Very basic fallback - combines multiple sources of entropy
            password=$(echo "$(date +%s%N)-$(hostname)-$$-$RANDOM" | base64 | tr -d "=+/" | head -c 32)
        fi
    fi

    # Ensure we got a password of correct length
    if [ -z "$password" ] || [ ${#password} -lt 20 ]; then
        echo "Error: Failed to generate random password" >&2
        exit 1
    fi

    echo "$password"
}

port_in_use() {
    with_log_stderr ss -tulnp | grep ":$1 " >/dev/null
}

install_docker_pinned() {
    curl -sSL https://get.docker.com | sh -s -- --version $DOCKER_VERSION
}

install_docker_latest() {
    curl -sSL https://get.docker.com | sh
}

install_dokploy() {
    setup_log install
    print_header "installer"
    STEP_TOTAL=9

    step "Resolving Dokploy version"
    resolve_version
    [ "$PRETTY" = 1 ] || echo "Installing Dokploy version: ${VERSION_TAG}"

    step "Checking system requirements"
    if [ "$(id -u)" != "0" ]; then
        fail "This script must be run as root" "Run it again as root, or with sudo."
    fi

    # check if is Mac OS
    if [ "$(uname)" = "Darwin" ]; then
        fail "This script must be run on Linux"
    fi

    # check if is running inside a container
    if [ -f /.dockerenv ]; then
        fail "This script must be run on Linux" "It looks like this is running inside a Docker container."
    fi

    # check if something is running on port 80
    if port_in_use 80; then
        fail "something is already running on port 80" "Dokploy needs ports 80, 443 and 3000. Stop the service using port 80 and try again."
    fi

    # check if something is running on port 443
    if port_in_use 443; then
        fail "something is already running on port 443" "Dokploy needs ports 80, 443 and 3000. Stop the service using port 443 and try again."
    fi

    # check if something is running on port 3000
    if port_in_use 3000; then
        fail "something is already running on port 3000" "Dokploy requires port 3000 to be available. Please stop any service using this port."
    fi
    ok "$(os_description)"

    command_exists() {
      command -v "$@" > /dev/null 2>&1
    }

    if command_exists docker; then
      step "Checking Docker"
      ok "$(docker_version) already installed"
    else
      step "Installing Docker $DOCKER_VERSION"
      # get.docker.com exits without installing anything when the pinned version
      # is missing from the distro repository (Ubuntu 26.04 only ships 29.x)
      if ! run install_docker_pinned; then
        if [ "$PRETTY" = 1 ]; then
          echo "Docker $DOCKER_VERSION could not be installed, retrying with the latest version from the Docker repository" >>"$LOG_FILE"
          step_relabel "Installing the latest Docker"
        else
          echo "Docker $DOCKER_VERSION could not be installed, retrying with the latest version from the Docker repository"
        fi
        run install_docker_latest
      fi
      if ! command_exists docker; then
        fail "Docker installation failed" "Please install Docker manually (https://docs.docker.com/engine/install/) and run the installer again"
      fi
      # Hold docker packages to prevent unintended upgrades (apt-based distros only)
      if command_exists apt-mark; then
        run apt-mark hold docker-ce docker-ce-cli docker-ce-rootless-extras
      fi
      ok "$(docker_version) installed"
    fi

    # Check if running in Proxmox LXC container and set endpoint mode
    endpoint_mode=""
    if [ "$ENDPOINT_MODE" = "dnsrr" ]; then
        notice "ENDPOINT_MODE=dnsrr set — adding --endpoint-mode dnsrr to Docker services." \
            "Use this on kernels without IPVS support (e.g. ZimaOS / Buildroot-based images)."
        endpoint_mode="--endpoint-mode dnsrr"
    elif is_proxmox_lxc; then
        notice "Detected Proxmox LXC container environment!" \
            "Adding --endpoint-mode dnsrr to Docker services for LXC compatibility." \
            "This may affect service discovery but is required for LXC containers." \
            "Waiting for 5 seconds before continuing..."
        endpoint_mode="--endpoint-mode dnsrr"
        sleep 5
    fi

    step "Initializing Docker Swarm"
    run_hide_err docker swarm leave --force

    get_ip() {
        local ip=""

        # Try IPv4 first
        # First attempt: ifconfig.io
        ip=$(curl -4s --connect-timeout 5 https://ifconfig.io 2>/dev/null)

        # Second attempt: icanhazip.com
        if [ -z "$ip" ]; then
            ip=$(curl -4s --connect-timeout 5 https://icanhazip.com 2>/dev/null)
        fi

        # Third attempt: ipecho.net
        if [ -z "$ip" ]; then
            ip=$(curl -4s --connect-timeout 5 https://ipecho.net/plain 2>/dev/null)
        fi

        # If no IPv4, try IPv6
        if [ -z "$ip" ]; then
            # Try IPv6 with ifconfig.io
            ip=$(curl -6s --connect-timeout 5 https://ifconfig.io 2>/dev/null)

            # Try IPv6 with icanhazip.com
            if [ -z "$ip" ]; then
                ip=$(curl -6s --connect-timeout 5 https://icanhazip.com 2>/dev/null)
            fi

            # Try IPv6 with ipecho.net
            if [ -z "$ip" ]; then
                ip=$(curl -6s --connect-timeout 5 https://ipecho.net/plain 2>/dev/null)
            fi
        fi

        if [ -z "$ip" ]; then
            echo "Error: Could not determine server IP address automatically (neither IPv4 nor IPv6)." >&2
            echo "Please set the ADVERTISE_ADDR environment variable manually." >&2
            echo "Example: export ADVERTISE_ADDR=<your-server-ip>" >&2
            exit 1
        fi

        echo "$ip"
    }

    get_private_ip() {
        # Pick the first private (RFC1918) IP from a real interface. Docker-created
        # interfaces (docker0, br-*, veth*) are excluded: their IPs (e.g. 172.17.0.1)
        # are host-local and never reachable from other swarm nodes.
        ip -o -4 addr show scope global \
            | awk '$2 !~ /^(docker|br-|veth)/ {print $4}' \
            | cut -d/ -f1 \
            | grep -E "^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.)" \
            | head -n1
    }

    advertise_addr="${ADVERTISE_ADDR:-$(with_log_stderr get_private_ip)}"

    # Servers with only a public IP have no private interface: fall back to the public IP
    if [ -z "$advertise_addr" ]; then
        advertise_addr=$(with_log_stderr get_ip)
    fi

    if [ -z "$advertise_addr" ]; then
        fail "We couldn't detect your server IP address." \
            "Please set the ADVERTISE_ADDR environment variable manually." \
            "Example: curl -sSL https://dokploy.com/install.sh | sudo ADVERTISE_ADDR=192.168.1.100 sh"
    fi
    [ "$PRETTY" = 1 ] || echo "Using advertise address: $advertise_addr"

    # Allow custom Docker Swarm init arguments via DOCKER_SWARM_INIT_ARGS environment variable
    # Example: export DOCKER_SWARM_INIT_ARGS="--default-addr-pool 172.20.0.0/16 --default-addr-pool-mask-length 24"
    # This is useful to avoid CIDR overlapping with cloud provider VPCs (e.g., AWS)
    swarm_init_args="${DOCKER_SWARM_INIT_ARGS:-}"

    if [ -n "$swarm_init_args" ]; then
        [ "$PRETTY" = 1 ] || echo "Using custom swarm init arguments: $swarm_init_args"
        run docker swarm init --advertise-addr $advertise_addr $swarm_init_args
    else
        run docker swarm init --advertise-addr $advertise_addr
    fi

     if [ $? -ne 0 ]; then
        fail "Failed to initialize Docker Swarm"
    fi

    if [ -n "$swarm_init_args" ]; then
        ok "advertising $advertise_addr, custom init arguments"
    else
        ok "advertising $advertise_addr"
    fi

    step "Creating the dokploy-network"
    run_hide_err docker network rm -f dokploy-network
    if run docker network create --driver overlay --attachable dokploy-network; then
        ok "overlay, attachable"
    else
        warn "could not create the network, see the log"
    fi

    step "Generating secrets"
    mkdir -p /etc/dokploy

    # The installer runs as root and the Dokploy container also runs as root,
    # so nothing needs /etc/dokploy to be world-writable. 0777 lets any local
    # user rename root-owned entries (e.g. traefik/ or schedules/) and swap in
    # their own, which Dokploy and Traefik then read and run as root. 0755
    # keeps root as the sole writer. Remote installs already own the directory
    # with `chown` below instead of widening permissions.
    chmod 755 /etc/dokploy

    # Generate secure random password for Postgres
    POSTGRES_PASSWORD=$(generate_random_password)

    # Store password as Docker Secret (encrypted and secure)
    echo "$POSTGRES_PASSWORD" | run_hide_err docker secret create dokploy_postgres_password - || true

    # Generate secure auth secret for Better Auth
    AUTH_SECRET=$(openssl rand -hex 32)

    # Store auth secret as Docker Secret (encrypted and secure)
    echo "$AUTH_SECRET" | run_hide_err docker secret create dokploy_auth_secret - || true

    [ "$PRETTY" = 1 ] || echo "Generated secure database credentials and auth secret (stored in Docker Secrets)"
    ok "stored as Docker secrets"

    step "Starting PostgreSQL"
    if run docker service create \
    --name dokploy-postgres \
    --constraint 'node.role==manager' \
    --network dokploy-network \
    --env POSTGRES_USER=dokploy \
    --env POSTGRES_DB=dokploy \
    --secret source=dokploy_postgres_password,target=/run/secrets/postgres_password \
    --env POSTGRES_PASSWORD_FILE=/run/secrets/postgres_password \
    --mount type=volume,source=dokploy-postgres,target=/var/lib/postgresql/data \
    $endpoint_mode \
    postgres:16; then
        ok "postgres:16"
    else
        warn "could not create the dokploy-postgres service, see the log"
        START_FAILED=1
    fi

    # Installation
    # Set RELEASE_TAG environment variable for canary/feature versions
    # POSIX-compatible (no [[ ]]): the script is documented as `curl ... | sh`,
    # and on Debian/Ubuntu sh is dash, which has no [[ or =~ (issue #157)
    release_tag_env=""
    case "$VERSION_TAG" in
        v[0-9]*.[0-9]*.[0-9]*)
            # Specific version (v0.26.6, v0.26.7, etc.) → latest
            release_tag_env="-e RELEASE_TAG=latest"
            ;;
        latest)
            ;;
        *)
            # canary, feature/*, etc. → use the tag as-is
            release_tag_env="-e RELEASE_TAG=$VERSION_TAG"
            ;;
    esac

    step "Starting Dokploy"
    run docker service create \
      --name dokploy \
      --replicas 1 \
      --network dokploy-network \
      --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
      --mount type=bind,source=/etc/dokploy,target=/etc/dokploy \
      --mount type=volume,source=dokploy,target=/root/.docker \
      --secret source=dokploy_postgres_password,target=/run/secrets/postgres_password \
      --secret source=dokploy_auth_secret,target=/run/secrets/dokploy_auth_secret \
      --publish published=3000,target=3000,mode=host \
      --update-parallelism 1 \
      --update-order stop-first \
      --constraint 'node.role == manager' \
      $endpoint_mode \
      $release_tag_env \
      -e POSTGRES_PASSWORD_FILE=/run/secrets/postgres_password \
      -e BETTER_AUTH_SECRET_FILE=/run/secrets/dokploy_auth_secret \
      $DOCKER_IMAGE
    dokploy_status=$?

    sleep 4

    if [ "$dokploy_status" -eq 0 ]; then
        ok "$DOCKER_IMAGE"
    else
        warn "could not create the dokploy service, see the log"
        START_FAILED=1
    fi

    step "Starting Traefik"
    if run docker run -d \
        --name dokploy-traefik \
        --restart always \
        --network dokploy-network \
        -v /etc/dokploy/traefik/traefik.yml:/etc/traefik/traefik.yml \
        -v /etc/dokploy/traefik/dynamic:/etc/dokploy/traefik/dynamic \
        -v /var/run/docker.sock:/var/run/docker.sock:ro \
        -p 80:80/tcp \
        -p 443:443/tcp \
        -p 443:443/udp \
        traefik:v3.7.19; then
        ok "traefik:v3.7.19"
    else
        warn "could not start dokploy-traefik, see the log"
    fi


    # Optional: Use docker service create instead of docker run
    #   docker service create \
    #     --name dokploy-traefik \
    #     --constraint 'node.role==manager' \
    #     --network dokploy-network \
    #     --mount type=bind,source=/etc/dokploy/traefik/traefik.yml,target=/etc/traefik/traefik.yml \
    #     --mount type=bind,source=/etc/dokploy/traefik/dynamic,target=/etc/dokploy/traefik/dynamic \
    #     --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
    #     --publish mode=host,published=443,target=443 \
    #     --publish mode=host,published=80,target=80 \
    #     --publish mode=host,published=443,target=443,protocol=udp \
    #     traefik:v3.7.19

    format_ip_for_url() {
        local ip="$1"
        if echo "$ip" | grep -q ':'; then
            # IPv6
            echo "[${ip}]"
        else
            # IPv4
            echo "${ip}"
        fi
    }

    if [ "$PRETTY" = 1 ] && [ -z "${ADVERTISE_ADDR:-}" ]; then
        STEP_LABEL="Looking up the public IP address"
        STEP_PREFIX=""
        spinner_start
    fi
    public_ip="${ADVERTISE_ADDR:-$(with_log_stderr get_ip)}"
    private_ip=$(with_log_stderr get_private_ip)
    formatted_addr=$(format_ip_for_url "$public_ip")
    spinner_stop

    if [ "$PRETTY" = 1 ]; then
        total=$(fmt_duration $(($(date +%s) - RUN_START)))
        printf '\n'
        if [ "$START_FAILED" = 1 ]; then
            # Exit 0 as before, but don't claim success or link a dashboard that isn't running.
            printf '  %s%s Installation finished, but Dokploy did not start%s  %stook %s%s\n\n' "$RED$BOLD" "$SYM_FAIL" "$NC" "$DIM" "$total" "$NC"
            printf '    %d step(s) reported problems. Details are in %s%s%s\n' "$WARNINGS" "$BOLD" "$LOG_FILE" "$NC"
            printf '    %sThe last lines usually say why, for example a full disk or a failed image download.%s\n\n' "$DIM" "$NC"
            return 0
        fi
        if [ "$WARNINGS" -eq 0 ]; then
            printf '  %s%s Dokploy is installed%s  %s%s, took %s%s\n' "$GREEN$BOLD" "$SYM_OK" "$NC" "$DIM" "$VERSION_TAG" "$total" "$NC"
        else
            printf '  %s%s Dokploy is installed, with %d warning(s)%s  %s%s, took %s%s\n' "$YELLOW$BOLD" "$SYM_WARN" "$WARNINGS" "$NC" "$DIM" "$VERSION_TAG" "$total" "$NC"
        fi
        printf '\n'
        printf '    Open the dashboard   %s%s%s\n' "$BOLD$BLUE" "http://${formatted_addr:-<your-server-ip>}:3000" "$NC"
        if [ -n "$private_ip" ] && [ "$private_ip" != "$public_ip" ]; then
            printf '    On the same network  %s%s%s\n' "$BLUE" "http://${private_ip}:3000" "$NC"
        fi
        printf '\n'
        printf '    %sThe server needs about 15 seconds to start. Then create your admin account.%s\n' "$DIM" "$NC"
        if [ "$WARNINGS" -gt 0 ]; then
            printf '    %sSome steps reported problems. Details are in %s%s\n' "$YELLOW" "$LOG_FILE" "$NC"
        else
            printf '    %sFull output: %s%s\n' "$DIM" "$LOG_FILE" "$NC"
        fi
        printf '\n'
    else
        echo ""
        printf "Congratulations, Dokploy is installed!\n"
        printf "Wait 15 seconds for the server to start\n"
        printf "Please go to http://${formatted_addr}:3000\n"
        # Home servers and local VMs are often not reachable on their public IP
        # (no port forwarding), so also print the private IP when there is one.
        if [ -n "$private_ip" ] && [ "$private_ip" != "$public_ip" ]; then
            printf "If you are on the same local network, use http://${private_ip}:3000\n"
        fi
        printf "\n"
    fi
}

update_dokploy() {
    setup_log update
    print_header "updater"
    STEP_TOTAL=3

    step "Resolving Dokploy version"
    resolve_version
    [ "$PRETTY" = 1 ] || echo "Updating Dokploy to version: ${VERSION_TAG}"

    # Pull the image
    step "Pulling $DOCKER_IMAGE"
    if run docker pull $DOCKER_IMAGE; then
        ok
    else
        warn "pull failed, see the log"
    fi

    # Update the service
    step "Updating the dokploy service"
    if run docker service update --image $DOCKER_IMAGE dokploy; then
        ok
    else
        warn "update failed, see the log"
    fi


    if [ "$PRETTY" = 1 ]; then
        printf '\n'
        if [ "$WARNINGS" -eq 0 ]; then
            printf '  %s%s Dokploy has been updated to %s%s\n' "$GREEN$BOLD" "$SYM_OK" "$VERSION_TAG" "$NC"
            printf '    %sFull output: %s%s\n\n' "$DIM" "$LOG_FILE" "$NC"
        else
            printf '  %s%s The update to %s did not finish cleanly%s\n' "$YELLOW$BOLD" "$SYM_WARN" "$VERSION_TAG" "$NC"
            printf '    %sDetails are in %s%s\n\n' "$YELLOW" "$LOG_FILE" "$NC"
        fi
    else
        echo "Dokploy has been updated to version: ${VERSION_TAG}"
    fi
}

# Main script execution
if [ "$1" = "update" ]; then
    update_dokploy
else
    install_dokploy
fi

#!/usr/bin/env bash
# Dokploy production installer
#
# Supported: Ubuntu 22.04/24.04 and Debian 12 on amd64 or arm64.
# Experimental: other systemd-based Linux distributions with an existing,
# supported Docker Engine installation. Docker/OpenVZ containers, rootless,
# Snap, Podman, Docker Desktop, and remote Docker daemons are unsupported.
#
# Run as root with Bash 4.3 or newer. Use DOKPLOY_INSTALL_ACTION=check for a
# non-destructive preflight. Important settings are documented in
# https://docs.dokploy.com/docs/core/installation. Logs and sanitized failure diagnostics are written to
# /var/log/dokploy by default. Secret material is created with mode 0600, is
# never logged, and is stored in Docker secrets.
#
# Version pinning: DOKPLOY_VERSION=v0.29.13 bash install.sh
# Debug tracing: DEBUG=1 bash install.sh (secret operations disable tracing)

set -Eeuo pipefail
IFS=$'\n\t'
umask 077

readonly INSTALLER_VERSION="2.0.0"
readonly MINIMUM_BASH_MAJOR=4
readonly MINIMUM_BASH_MINOR=3
readonly MINIMUM_KERNEL_MAJOR=5
readonly MINIMUM_KERNEL_MINOR=4
readonly HARD_MINIMUM_MEMORY_MB=1024
readonly MINIMUM_MEMORY_MB=2048
readonly RECOMMENDED_MEMORY_MB=4096
readonly MINIMUM_DISK_MB=10240
readonly RECOMMENDED_DISK_MB=30720
readonly MINIMUM_DOCKER_MAJOR=24
readonly MINIMUM_COMPOSE_MAJOR=2
readonly MINIMUM_COMPOSE_MINOR=20
readonly DOCKER_GPG_FINGERPRINT="9DC858229FC7DD38854AE2D88D81803C0EBFCD88"
readonly DOKPLOY_IMAGE_REPOSITORY="dokploy/dokploy"
readonly POSTGRES_IMAGE="postgres:16"
readonly TRAEFIK_IMAGE="traefik:v3.6.7"
readonly SUPPORT_URL="https://docs.dokploy.com/docs/core/installation"
readonly SUPPORT_CHANNEL="https://discord.gg/2tBnJ3jDJc"

# Central configuration. See the installation documentation for formats and security notes.
DOKPLOY_VERSION="${DOKPLOY_VERSION:-latest}"
DOKPLOY_DATA_DIR="${DOKPLOY_DATA_DIR:-/etc/dokploy}"
DOKPLOY_HTTP_PORT="${DOKPLOY_HTTP_PORT:-80}"
DOKPLOY_HTTPS_PORT="${DOKPLOY_HTTPS_PORT:-443}"
DOKPLOY_APP_PORT="${DOKPLOY_APP_PORT:-3000}"
DOKPLOY_DOMAIN="${DOKPLOY_DOMAIN:-}"
DOKPLOY_EMAIL="${DOKPLOY_EMAIL:-}"
DOKPLOY_TIMEZONE="${DOKPLOY_TIMEZONE:-UTC}"
DOKPLOY_NETWORK_NAME="${DOKPLOY_NETWORK_NAME:-dokploy-network}"
DOKPLOY_ADVERTISE_ADDR="${DOKPLOY_ADVERTISE_ADDR:-${ADVERTISE_ADDR:-}}"
DOKPLOY_INSTALL_ACTION="${DOKPLOY_INSTALL_ACTION:-auto}"
DOKPLOY_LOG_DIR="${DOKPLOY_LOG_DIR:-/var/log/dokploy}"
DOKPLOY_BACKUP_DIR="${DOKPLOY_BACKUP_DIR:-/var/backups/dokploy}"
DOKPLOY_SKIP_DOCKER_INSTALL="${DOKPLOY_SKIP_DOCKER_INSTALL:-0}"
DOKPLOY_NONINTERACTIVE="${DOKPLOY_NONINTERACTIVE:-0}"
DOKPLOY_ALLOW_PORT_CONFLICT="${DOKPLOY_ALLOW_PORT_CONFLICT:-0}"
DOKPLOY_ALLOW_UNSUPPORTED="${DOKPLOY_ALLOW_UNSUPPORTED:-0}"
DOKPLOY_ALLOW_LOW_RESOURCES="${DOKPLOY_ALLOW_LOW_RESOURCES:-0}"
DOKPLOY_SKIP_TRAEFIK="${DOKPLOY_SKIP_TRAEFIK:-0}"
DOKPLOY_DIAGNOSTICS="${DOKPLOY_DIAGNOSTICS:-1}"
DOKPLOY_HEALTH_ATTEMPTS="${DOKPLOY_HEALTH_ATTEMPTS:-45}"
DOKPLOY_HEALTH_INTERVAL="${DOKPLOY_HEALTH_INTERVAL:-2}"
DOKPLOY_STABILIZATION_SECONDS="${DOKPLOY_STABILIZATION_SECONDS:-10}"
DOKPLOY_DOCKER_VERSION="${DOKPLOY_DOCKER_VERSION:-28.5}"
DOKPLOY_MIN_UPGRADE_VERSION="${DOKPLOY_MIN_UPGRADE_VERSION:-}"
DOKPLOY_ALLOW_BREAKING_UPGRADE="${DOKPLOY_ALLOW_BREAKING_UPGRADE:-0}"
DOKPLOY_ROLLBACK_COMPATIBILITY_FILE="${DOKPLOY_ROLLBACK_COMPATIBILITY_FILE:-${DOKPLOY_DATA_DIR}/installer-rollback-compatible}"
DOKPLOY_REUSE_EXISTING_SWARM="${DOKPLOY_REUSE_EXISTING_SWARM:-0}"
DOKPLOY_ENDPOINT_MODE="${DOKPLOY_ENDPOINT_MODE:-${ENDPOINT_MODE:-auto}}"
DOKPLOY_LOCK_FILE="${DOKPLOY_LOCK_FILE:-/var/lock/dokploy-installer.lock}"
DRY_RUN="${DRY_RUN:-0}"
DEBUG="${DEBUG:-0}"
NO_COLOR="${NO_COLOR:-}"

LOG_FILE=""
DIAGNOSTICS_FILE=""
TMP_DIR=""
LOCK_FILE="$DOKPLOY_LOCK_FILE"
CURRENT_PHASE="initialization"
START_EPOCH=0
INSTALLATION_STATE="unknown"
SELECTED_ACTION=""
TARGET_VERSION=""
TARGET_IMAGE=""
TARGET_IMAGE_DIGEST=""
POSTGRES_IMAGE_DIGEST=""
TRAEFIK_IMAGE_DIGEST=""
INSTALLED_VERSION="none"
INSTALLED_IMAGE=""
UPGRADE_TYPE="none"
ROLLBACK_SUPPORTED="no"
BACKUP_PATH=""
HOST_CONFIG_BACKUP_PATH=""
PLATFORM_ID="unknown"
PLATFORM_VERSION="unknown"
PLATFORM_CLASS="unsupported"
PACKAGE_MANAGER="unknown"
INIT_SYSTEM="unknown"
ARCHITECTURE="unknown"
VIRTUALIZATION="none"
KERNEL_VERSION="unknown"
MEMORY_MB=0
SWAP_MB=0
INSTALL_FREE_MB=0
BACKUP_FREE_MB=0
DOCKER_FREE_MB=0
TMP_FREE_MB=0
FILESYSTEM_TYPE="unknown"
BACKUP_FILESYSTEM_TYPE="unknown"
DOCKER_AVAILABLE=0
DOCKER_DAEMON_AVAILABLE=0
DOCKER_VERSION="not installed"
COMPOSE_VERSION="not installed"
DOCKER_STORAGE_DRIVER="unknown"
DOCKER_ROOT_DIR="unknown"
SWARM_STATE="unknown"
ENDPOINT_MODE=""
PREFLIGHT_FAILURES=0
PREFLIGHT_WARNINGS=0
FAILURE_HANDLED=0
INSTALL_SUCCEEDED=0
CREATED_NETWORK=0
CREATED_DOKPLOY_SERVICE=0
CREATED_POSTGRES_SERVICE=0
CREATED_TRAEFIK_CONTAINER=0
CREATED_POSTGRES_SECRET=0
CREATED_AUTH_SECRET=0
ROLLBACK_ATTEMPTED="no"
ROLLBACK_RESULT="not attempted"
TRACE_WAS_ENABLED=0
STEP_NUMBER=0

if [[ -t 1 && -z "$NO_COLOR" ]]; then
	readonly COLOR_GREEN=$'\033[0;32m'
	readonly COLOR_YELLOW=$'\033[1;33m'
	readonly COLOR_RED=$'\033[0;31m'
	readonly COLOR_BLUE=$'\033[0;34m'
	readonly COLOR_RESET=$'\033[0m'
else
	readonly COLOR_GREEN=""
	readonly COLOR_YELLOW=""
	readonly COLOR_RED=""
	readonly COLOR_BLUE=""
	readonly COLOR_RESET=""
fi

# Print a timestamped message. Arguments must not contain secrets.
log() {
	printf '%s %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*"
}

section() {
	STEP_NUMBER=$((STEP_NUMBER + 1))
	printf '\n%s== [%s] %s ==%s\n' "$COLOR_BLUE" "$STEP_NUMBER" "$1" "$COLOR_RESET"
}

ok() {
	printf '%s[OK]%s %s\n' "$COLOR_GREEN" "$COLOR_RESET" "$1"
}

warn() {
	PREFLIGHT_WARNINGS=$((PREFLIGHT_WARNINGS + 1))
	printf '%s[WARN]%s %s\n' "$COLOR_YELLOW" "$COLOR_RESET" "$1" >&2
}

audit_command() {
	local rendered="" argument
	for argument in "$@"; do
		printf -v rendered '%s%q ' "$rendered" "$argument"
	done
	printf '%s RUN %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "${rendered% }" >&2
}

run_logged() {
	audit_command "$@"
	"$@"
}

failure_guidance() {
	case "$CURRENT_PHASE" in
		*port*) printf 'Likely cause: a configured host port is owned by another proxy, container, or system service.\n' >&2 ;;
		*Docker\ installation*) printf 'Likely cause: the signed Docker repository, requested package version, or systemd service is unavailable.\n' >&2 ;;
		*network\ connectivity* | *version\ resolution* | *image\ download*) printf 'Likely cause: DNS, proxy, TLS trust, system clock, GitHub, or registry connectivity failed.\n' >&2 ;;
		*backup*) printf 'Likely cause: PostgreSQL is unavailable or the protected backup filesystem lacks space/permissions.\n' >&2 ;;
		*reverse\ proxy*) printf 'Likely cause: Traefik configuration was not generated, a port is occupied, or Docker network attachment failed.\n' >&2 ;;
		*health*) printf 'Likely cause: a service is restarting, PostgreSQL is unavailable, the app endpoint failed, or required mounts/networks are missing.\n' >&2 ;;
		*rollback*) printf 'Recovery requires the prior image/configuration and a database-compatible migration path.\n' >&2 ;;
		*) printf 'Review the failed phase and the immediately preceding log entries for the rejected operation.\n' >&2 ;;
	esac
}

fail_check() {
	PREFLIGHT_FAILURES=$((PREFLIGHT_FAILURES + 1))
	printf '%s[FAIL]%s %s\n' "$COLOR_RED" "$COLOR_RESET" "$1" >&2
}

# Exit with a consistent, supportable error. The ERR trap is suppressed while
# this function exits so the original phase and message remain visible.
error() {
	local message="${1:-Unknown error}"
	FAILURE_HANDLED=1
	printf '\n%sERROR:%s %s\n' "$COLOR_RED" "$COLOR_RESET" "$message" >&2
	printf 'Failed phase: %s\n' "$CURRENT_PHASE" >&2
	failure_guidance
	[[ -n "$LOG_FILE" ]] && printf 'Installation log: %s\n' "$LOG_FILE" >&2
	printf 'Documentation: %s\nSupport: %s\n' "$SUPPORT_URL" "$SUPPORT_CHANNEL" >&2
	exit 1
}

# ERR handler: report location without printing BASH_COMMAND, which may contain
# credentials supplied by the caller.
on_error() {
	local exit_code=$?
	local line_number="${1:-unknown}"
	((FAILURE_HANDLED == 1)) && return "$exit_code"
	FAILURE_HANDLED=1
	printf '\n%sERROR:%s Unexpected command failure at line %s (exit %s).\n' \
		"$COLOR_RED" "$COLOR_RESET" "$line_number" "$exit_code" >&2
	printf 'Failed phase: %s\n' "$CURRENT_PHASE" >&2
	failure_guidance
	[[ -n "$LOG_FILE" ]] && printf 'Installation log: %s\n' "$LOG_FILE" >&2
	return "$exit_code"
}

on_signal() {
	FAILURE_HANDLED=1
	printf '\nInstallation interrupted during %s. Existing user data will be preserved.\n' "$CURRENT_PHASE" >&2
	exit 130
}

# Remove only temporary files and resources positively identified as created by
# this failed fresh-install run. Persistent volumes and user data are untouched.
cleanup() {
	local exit_code=$?
	set +e
	if ((exit_code != 0 && INSTALL_SUCCEEDED == 0)); then
		if [[ "$DOKPLOY_DIAGNOSTICS" == "1" && "$DOKPLOY_INSTALL_ACTION" != "check" && "$DRY_RUN" != "1" ]]; then
			generate_diagnostics_bundle || true
		fi
		cleanup_partial_install
	fi
	if [[ -n "$TMP_DIR" && -d "$TMP_DIR" ]]; then
		rm -rf -- "$TMP_DIR"
	fi
	if ((exit_code != 0)); then
		printf 'Recovery status: %s\nRollback attempted: %s\n' "$ROLLBACK_RESULT" "$ROLLBACK_ATTEMPTED" >&2
		[[ -n "$DIAGNOSTICS_FILE" ]] && printf 'Diagnostics: %s\n' "$DIAGNOSTICS_FILE" >&2
	fi
	log "Dokploy installer ended with exit code $exit_code after $(($(date +%s) - START_EPOCH))s"
	exit "$exit_code"
}

enable_debug_trace() {
	if [[ "$DEBUG" == "1" ]]; then
		TRACE_WAS_ENABLED=1
		export PS4='+ ${BASH_SOURCE##*/}:${LINENO}:${FUNCNAME[0]:-main}: '
		set -x
	fi
}

trace_off() {
	case "$-" in
		*x*)
			TRACE_WAS_ENABLED=1
			set +x
			;;
		*) TRACE_WAS_ENABLED=0 ;;
	esac
}

trace_restore() {
	((TRACE_WAS_ENABLED == 1)) && set -x
}

validate_bool() {
	local name="$1"
	local value="$2"
	[[ "$value" == "0" || "$value" == "1" ]] || error "$name must be 0 or 1 (received: $value)"
}

validate_port() {
	local port="$1"
	[[ "$port" =~ ^[0-9]+$ ]] && ((port >= 1 && port <= 65535))
}

validate_path() {
	local value="$1"
	[[ "$value" == /* && "$value" != *$'\n'* && "$value" != *$'\r'* ]]
}

validate_safe_directory() {
	local value="$1"
	validate_path "$value" || return 1
	case "$value" in
		/ | /bin | /boot | /dev | /etc | /home | /lib | /lib64 | /opt | /proc | /root | /run | /sbin | /srv | /sys | /tmp | /usr | /var) return 1 ;;
	esac
	return 0
}

validate_version() {
	local version="$1"
	[[ "$version" =~ ^v?[0-9]+\.[0-9]+\.[0-9]+([.-][A-Za-z0-9][A-Za-z0-9.-]*)?$ || "$version" == "latest" || "$version" == "canary" ]]
}

# Validate every supported environment input before host mutation. Populates no
# external state and terminates with a named input error on invalid data.
validate_configuration() {
	CURRENT_PHASE="configuration validation"
	local name
	for name in DOKPLOY_SKIP_DOCKER_INSTALL DOKPLOY_NONINTERACTIVE DOKPLOY_ALLOW_PORT_CONFLICT \
		DOKPLOY_ALLOW_UNSUPPORTED DOKPLOY_ALLOW_LOW_RESOURCES DOKPLOY_SKIP_TRAEFIK \
		DOKPLOY_DIAGNOSTICS DOKPLOY_ALLOW_BREAKING_UPGRADE DOKPLOY_REUSE_EXISTING_SWARM DRY_RUN DEBUG; do
		validate_bool "$name" "${!name}"
	done
	validate_port "$DOKPLOY_HTTP_PORT" || error "DOKPLOY_HTTP_PORT must be an integer from 1 to 65535"
	validate_port "$DOKPLOY_HTTPS_PORT" || error "DOKPLOY_HTTPS_PORT must be an integer from 1 to 65535"
	validate_port "$DOKPLOY_APP_PORT" || error "DOKPLOY_APP_PORT must be an integer from 1 to 65535"
	[[ "$DOKPLOY_HTTP_PORT" != "$DOKPLOY_HTTPS_PORT" && "$DOKPLOY_HTTP_PORT" != "$DOKPLOY_APP_PORT" && "$DOKPLOY_HTTPS_PORT" != "$DOKPLOY_APP_PORT" ]] ||
		error "HTTP, HTTPS, and application ports must be distinct"
	validate_safe_directory "$DOKPLOY_DATA_DIR" || error "DOKPLOY_DATA_DIR must be a dedicated absolute directory, not a system root"
	validate_safe_directory "$DOKPLOY_LOG_DIR" || error "DOKPLOY_LOG_DIR must be a dedicated absolute directory, not a system root"
	validate_safe_directory "$DOKPLOY_BACKUP_DIR" || error "DOKPLOY_BACKUP_DIR must be a dedicated absolute directory, not a system root"
	validate_path "$DOKPLOY_ROLLBACK_COMPATIBILITY_FILE" || error "DOKPLOY_ROLLBACK_COMPATIBILITY_FILE must be an absolute path"
	validate_path "$DOKPLOY_LOCK_FILE" || error "DOKPLOY_LOCK_FILE must be an absolute path"
	[[ "$DOKPLOY_BACKUP_DIR/" != "$DOKPLOY_DATA_DIR/"* ]] || error "DOKPLOY_BACKUP_DIR must not be inside DOKPLOY_DATA_DIR"
	[[ ! -L "$DOKPLOY_DATA_DIR" && ! -L "$DOKPLOY_LOG_DIR" && ! -L "$DOKPLOY_BACKUP_DIR" ]] || error "Dokploy data, log, and backup directories must not be symbolic links"
	[[ "$DOKPLOY_NETWORK_NAME" =~ ^[A-Za-z0-9][A-Za-z0-9_.-]{0,62}$ ]] || error "Invalid DOKPLOY_NETWORK_NAME"
	validate_version "$DOKPLOY_VERSION" || error "Invalid DOKPLOY_VERSION: $DOKPLOY_VERSION"
	[[ -z "$DOKPLOY_MIN_UPGRADE_VERSION" || "$DOKPLOY_MIN_UPGRADE_VERSION" =~ ^v?[0-9]+\.[0-9]+\.[0-9]+$ ]] || error "DOKPLOY_MIN_UPGRADE_VERSION must be an explicit release version"
	[[ "$DOKPLOY_DOCKER_VERSION" =~ ^[0-9]+\.[0-9]+(\.[0-9]+)?$ ]] || error "DOKPLOY_DOCKER_VERSION must be a numeric version prefix"
	[[ "$DOKPLOY_ENDPOINT_MODE" =~ ^(auto|vip|dnsrr)$ ]] || error "DOKPLOY_ENDPOINT_MODE must be auto, vip, or dnsrr"
	[[ "$DOKPLOY_ADVERTISE_ADDR" != *$'\n'* && "$DOKPLOY_ADVERTISE_ADDR" != *$'\r'* ]] || error "DOKPLOY_ADVERTISE_ADDR must not contain newlines"
	[[ "$DOKPLOY_INSTALL_ACTION" =~ ^(auto|install|upgrade|repair|abort|check)$ ]] || error "DOKPLOY_INSTALL_ACTION must be auto, install, upgrade, repair, abort, or check"
	[[ "$DOKPLOY_HEALTH_ATTEMPTS" =~ ^[0-9]+$ && "$DOKPLOY_HEALTH_ATTEMPTS" -gt 0 ]] || error "DOKPLOY_HEALTH_ATTEMPTS must be positive"
	[[ "$DOKPLOY_HEALTH_INTERVAL" =~ ^[0-9]+$ && "$DOKPLOY_HEALTH_INTERVAL" -gt 0 ]] || error "DOKPLOY_HEALTH_INTERVAL must be positive"
	[[ "$DOKPLOY_STABILIZATION_SECONDS" =~ ^[0-9]+$ ]] || error "DOKPLOY_STABILIZATION_SECONDS must be zero or positive"
	[[ -z "$DOKPLOY_DOMAIN" || "$DOKPLOY_DOMAIN" =~ ^([A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$ ]] || error "Invalid DOKPLOY_DOMAIN"
	[[ -z "$DOKPLOY_EMAIL" || "$DOKPLOY_EMAIL" =~ ^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$ ]] || error "Invalid DOKPLOY_EMAIL"
	[[ "$DOKPLOY_TIMEZONE" =~ ^[A-Za-z0-9_+/-]+$ && -e "/usr/share/zoneinfo/$DOKPLOY_TIMEZONE" ]] || error "Invalid DOKPLOY_TIMEZONE"
	if [[ "$DRY_RUN" == "1" ]]; then
		DOKPLOY_INSTALL_ACTION="check"
	fi
}

# Configure a persistent combined stdout/stderr log. Check mode is deliberately
# write-free and therefore only writes to the caller's stdout.
configure_logging() {
	CURRENT_PHASE="logging setup"
	START_EPOCH=$(date +%s)
	if [[ "$DOKPLOY_INSTALL_ACTION" == "check" || "$DRY_RUN" == "1" ]]; then
		LOG_FILE="check mode: no file created"
		return
	fi
	mkdir -p -- "$DOKPLOY_LOG_DIR" || error "Cannot create log directory $DOKPLOY_LOG_DIR"
	chmod 0750 "$DOKPLOY_LOG_DIR"
	LOG_FILE="$DOKPLOY_LOG_DIR/install-$(date -u +%Y%m%dT%H%M%SZ).log"
	touch "$LOG_FILE"
	chmod 0600 "$LOG_FILE"
	exec > >(tee -a "$LOG_FILE") 2>&1
}

acquire_lock() {
	CURRENT_PHASE="installation lock"
	[[ "$DOKPLOY_INSTALL_ACTION" == "check" ]] && return
	command -v flock >/dev/null 2>&1 || error "flock is required (install util-linux)"
	mkdir -p -- "$(dirname "$LOCK_FILE")"
	[[ ! -L "$LOCK_FILE" ]] || error "Installer lock file must not be a symbolic link: $LOCK_FILE"
	exec 9>>"$LOCK_FILE"
	flock -n 9 || error "Another Dokploy installation process is running"
}

validate_privileges() {
	CURRENT_PHASE="privilege validation"
	if ((EUID != 0)); then
		if [[ "$DOKPLOY_INSTALL_ACTION" == "check" ]]; then
			fail_check "Root privileges are required for installation (check mode will continue)"
		else
			error "This installer must run as root because it manages Docker, system services, and /etc/dokploy"
		fi
	else
		ok "Running with required root privileges"
	fi
}

command_exists() {
	command -v "$1" >/dev/null 2>&1
}

os_release_value() {
	local key="$1"
	awk -F= -v key="$key" '$1 == key {value=substr($0, index($0, "=") + 1); gsub(/^"|"$/, "", value); print value; exit}' /etc/os-release
}

# Detect OS support class, package manager, init, architecture, kernel, and
# virtualization. Reads host metadata and sets platform globals; changes nothing.
detect_platform() {
	CURRENT_PHASE="platform detection"
	[[ "${BASH_VERSINFO[0]}" -gt "$MINIMUM_BASH_MAJOR" ||
		("${BASH_VERSINFO[0]}" -eq "$MINIMUM_BASH_MAJOR" && "${BASH_VERSINFO[1]}" -ge "$MINIMUM_BASH_MINOR") ]] ||
		error "Bash ${MINIMUM_BASH_MAJOR}.${MINIMUM_BASH_MINOR} or newer is required"
	[[ "$(uname -s)" == "Linux" ]] || error "Dokploy supports Linux servers only"

	if [[ -r /etc/os-release ]]; then
		PLATFORM_ID=$(os_release_value ID)
		PLATFORM_VERSION=$(os_release_value VERSION_ID)
		[[ "$PLATFORM_ID" =~ ^[a-z0-9._-]+$ ]] || error "Invalid ID in /etc/os-release"
		[[ "$PLATFORM_VERSION" =~ ^[A-Za-z0-9._-]+$ ]] || error "Invalid VERSION_ID in /etc/os-release"
	fi
	case "$PLATFORM_ID:$PLATFORM_VERSION" in
		ubuntu:22.04 | ubuntu:24.04 | debian:12*) PLATFORM_CLASS="supported" ;;
		ubuntu:* | debian:*) PLATFORM_CLASS="experimental" ;;
		*) PLATFORM_CLASS="experimental" ;;
	esac
	if command_exists apt-get; then
		PACKAGE_MANAGER="apt"
	elif command_exists dnf; then
		PACKAGE_MANAGER="dnf"
	elif command_exists yum; then
		PACKAGE_MANAGER="yum"
	elif command_exists zypper; then
		PACKAGE_MANAGER="zypper"
	elif command_exists pacman; then
		PACKAGE_MANAGER="pacman"
	fi
	if command_exists systemctl && [[ "$(ps -p 1 -o comm= 2>/dev/null || true)" == "systemd" ]]; then
		INIT_SYSTEM="systemd"
	else
		INIT_SYSTEM="unsupported"
	fi
	case "$(uname -m)" in
		x86_64 | amd64) ARCHITECTURE="amd64" ;;
		aarch64 | arm64) ARCHITECTURE="arm64" ;;
		*) ARCHITECTURE="unsupported" ;;
	esac
	KERNEL_VERSION="$(uname -r)"
	if command_exists systemd-detect-virt; then
		VIRTUALIZATION="$(systemd-detect-virt 2>/dev/null || printf 'none')"
	elif [[ -f /.dockerenv ]]; then
		VIRTUALIZATION="docker"
	elif [[ -r /proc/1/environ ]] && grep -aq 'container=lxc' /proc/1/environ; then
		VIRTUALIZATION="lxc"
	fi
	if [[ "$VIRTUALIZATION" == "lxc" ]]; then
		ENDPOINT_MODE="dnsrr"
	fi
	case "$DOKPLOY_ENDPOINT_MODE" in
		dnsrr) ENDPOINT_MODE="dnsrr" ;;
		vip) ENDPOINT_MODE="" ;;
	esac
}

# Report mandatory and optional command capabilities. Missing mandatory tools
# add blocking preflight failures and are never installed implicitly.
check_dependencies() {
	CURRENT_PHASE="dependency validation"
	local required=(awk basename cat chmod cmp cp curl date df dirname findmnt flock getent grep gzip head install ip mkdir mktemp mv openssl ps rm sed sha256sum sort ss stat systemctl tar tee touch tr uname wc)
	local optional=(gpg journalctl modprobe timedatectl)
	local missing=()
	local tool
	for tool in "${required[@]}"; do
		command_exists "$tool" || missing+=("$tool")
	done
	if ((${#missing[@]} > 0)); then
		fail_check "Missing required tools: ${missing[*]}. Install them with your distribution package manager."
	else
		ok "Required host tools are available"
	fi
	for tool in "${optional[@]}"; do
		command_exists "$tool" || warn "Optional tool $tool is unavailable; related diagnostics will be limited"
	done
}

# Measure RAM, swap, disk, filesystems, mount writability, and inode capacity for
# data, backup, Docker, and temporary paths. Only preflight globals are changed.
detect_resources() {
	CURRENT_PHASE="resource detection"
	MEMORY_MB=$(awk '/MemTotal:/ {printf "%d", $2 / 1024}' /proc/meminfo 2>/dev/null || printf '0')
	SWAP_MB=$(awk '/SwapTotal:/ {printf "%d", $2 / 1024}' /proc/meminfo 2>/dev/null || printf '0')
	local install_parent="$DOKPLOY_DATA_DIR"
	while [[ ! -e "$install_parent" && "$install_parent" != "/" ]]; do install_parent=$(dirname "$install_parent"); done
	local backup_parent="$DOKPLOY_BACKUP_DIR"
	while [[ ! -e "$backup_parent" && "$backup_parent" != "/" ]]; do backup_parent=$(dirname "$backup_parent"); done
	INSTALL_FREE_MB=$(df -Pm "$install_parent" 2>/dev/null | awk 'NR==2 {print $4}' || printf '0')
	BACKUP_FREE_MB=$(df -Pm "$backup_parent" 2>/dev/null | awk 'NR==2 {print $4}' || printf '0')
	TMP_FREE_MB=$(df -Pm "${TMPDIR:-/tmp}" 2>/dev/null | awk 'NR==2 {print $4}' || printf '0')
	FILESYSTEM_TYPE=$(findmnt -n -o FSTYPE --target "$install_parent" 2>/dev/null || printf 'unknown')
	BACKUP_FILESYSTEM_TYPE=$(findmnt -n -o FSTYPE --target "$backup_parent" 2>/dev/null || printf 'unknown')
	local mount_options
	mount_options=$(findmnt -n -o OPTIONS --target "$install_parent" 2>/dev/null || true)
	[[ ",$mount_options," != *,ro,* ]] || fail_check "$DOKPLOY_DATA_DIR is on a read-only mount"
	mount_options=$(findmnt -n -o OPTIONS --target "$backup_parent" 2>/dev/null || true)
	[[ ",$mount_options," != *,ro,* ]] || fail_check "$DOKPLOY_BACKUP_DIR is on a read-only mount"
	case "$FILESYSTEM_TYPE" in
		nfs | nfs4 | cifs | smb3 | fuse.* | 9p) fail_check "Network filesystem $FILESYSTEM_TYPE is unsupported for Dokploy data" ;;
		ext4 | xfs | btrfs | zfs) ok "Installation filesystem $FILESYSTEM_TYPE is supported" ;;
		overlay) fail_check "Overlay filesystem indicates an unsupported nested/container installation" ;;
		*) warn "Filesystem $FILESYSTEM_TYPE is untested; ext4 or xfs is recommended" ;;
	esac
	case "$BACKUP_FILESYSTEM_TYPE" in
		nfs | nfs4 | cifs | smb3 | fuse.* | 9p) warn "Backup filesystem $BACKUP_FILESYSTEM_TYPE is remote; verify durability, locking, and access controls" ;;
		overlay) fail_check "Overlay filesystem is unsupported for Dokploy backups" ;;
	esac
	local inode_free
	inode_free=$(df -Pi "$install_parent" 2>/dev/null | awk 'NR==2 {print $4}' || printf '0')
	if [[ "$inode_free" =~ ^[0-9]+$ ]] && ((inode_free < 100000)); then
		warn "Only $inode_free free inodes are available at $install_parent"
	else
		ok "Filesystem has sufficient free inodes"
	fi
}

# Validate kernel/cgroup/overlay capabilities and reject unsupported nested
# environments. Experimental LXC requires an explicit override.
check_kernel_and_virtualization() {
	CURRENT_PHASE="kernel and virtualization validation"
	local kernel_major kernel_minor
	kernel_major=${KERNEL_VERSION%%.*}
	kernel_minor=${KERNEL_VERSION#*.}
	kernel_minor=${kernel_minor%%.*}
	if [[ "$kernel_major" =~ ^[0-9]+$ && "$kernel_minor" =~ ^[0-9]+$ ]] &&
		((kernel_major < MINIMUM_KERNEL_MAJOR || (kernel_major == MINIMUM_KERNEL_MAJOR && kernel_minor < MINIMUM_KERNEL_MINOR))); then
		fail_check "Kernel $KERNEL_VERSION is too old; ${MINIMUM_KERNEL_MAJOR}.${MINIMUM_KERNEL_MINOR}+ is required"
	else
		ok "Kernel $KERNEL_VERSION meets the minimum requirement"
	fi
	case "$VIRTUALIZATION" in
		docker | podman | openvz | systemd-nspawn | wsl) fail_check "$VIRTUALIZATION is unsupported; use a systemd VM or bare-metal host" ;;
		lxc)
			if [[ "$DOKPLOY_ALLOW_UNSUPPORTED" == "1" ]]; then
				warn "LXC is experimental; DNSRR endpoint mode will be used because IPVS may be unavailable"
			else
				fail_check "LXC is experimental. Use a VM, or set DOKPLOY_ALLOW_UNSUPPORTED=1 after enabling nesting and keyctl"
			fi
			;;
		*) ok "Virtualization environment: $VIRTUALIZATION" ;;
	esac
	[[ -d /sys/fs/cgroup ]] || fail_check "Linux cgroups are unavailable"
	if [[ -r /proc/filesystems ]] && grep -qw overlay /proc/filesystems; then
		ok "Overlay filesystem kernel support is available"
	else
		fail_check "Kernel overlay filesystem support is required by Docker"
	fi
	local ipvs_available=0
	if [[ -r /proc/net/ip_vs ]] || grep -q '^ip_vs ' /proc/modules 2>/dev/null; then
		ipvs_available=1
	elif command_exists modprobe && modprobe -n ip_vs >/dev/null 2>&1; then
		ipvs_available=1
	fi
	if ((ipvs_available == 1)); then
		ok "IPVS capability is available for Swarm VIP networking"
	elif [[ "$DOKPLOY_ENDPOINT_MODE" == "vip" ]]; then
		fail_check "Swarm VIP mode was requested, but the kernel has no detectable IPVS capability"
	else
		ENDPOINT_MODE="dnsrr"
		warn "IPVS capability is unavailable; Swarm services will use DNSRR endpoint mode"
	fi
}

check_resource_thresholds() {
	if ((MEMORY_MB < HARD_MINIMUM_MEMORY_MB)); then
		fail_check "${MEMORY_MB} MB RAM detected; at least ${HARD_MINIMUM_MEMORY_MB} MB is required"
	elif ((MEMORY_MB < MINIMUM_MEMORY_MB)); then
		if [[ "$DOKPLOY_ALLOW_LOW_RESOURCES" == "1" ]]; then
			warn "${MEMORY_MB} MB RAM is below the supported minimum of ${MINIMUM_MEMORY_MB} MB"
		else
			fail_check "${MEMORY_MB} MB RAM is below the supported minimum; set DOKPLOY_ALLOW_LOW_RESOURCES=1 to override"
		fi
	elif ((MEMORY_MB < RECOMMENDED_MEMORY_MB)); then
		warn "${MEMORY_MB} MB RAM meets the minimum; ${RECOMMENDED_MEMORY_MB} MB is recommended (swap: ${SWAP_MB} MB)"
	else
		ok "Memory: ${MEMORY_MB} MB RAM, ${SWAP_MB} MB swap"
	fi
	if ((INSTALL_FREE_MB < MINIMUM_DISK_MB)); then
		fail_check "Only ${INSTALL_FREE_MB} MB is free for $DOKPLOY_DATA_DIR; ${MINIMUM_DISK_MB} MB is required"
	elif ((INSTALL_FREE_MB < RECOMMENDED_DISK_MB)); then
		warn "${INSTALL_FREE_MB} MB free at $DOKPLOY_DATA_DIR; ${RECOMMENDED_DISK_MB} MB is recommended"
	else
		ok "Installation disk space: ${INSTALL_FREE_MB} MB free"
	fi
	if ((TMP_FREE_MB < 1024)); then
		fail_check "Less than 1 GB is available for temporary downloads"
	else
		ok "Temporary disk space: ${TMP_FREE_MB} MB free"
	fi
	if ((BACKUP_FREE_MB < MINIMUM_DISK_MB)); then
		fail_check "Only ${BACKUP_FREE_MB} MB is free for backups at $DOKPLOY_BACKUP_DIR; ${MINIMUM_DISK_MB} MB is required"
	else
		ok "Backup disk space: ${BACKUP_FREE_MB} MB free"
	fi
}

docker_info_value() {
	local format="$1"
	docker info --format "$format" 2>/dev/null || true
}

# Inspect the client, daemon, socket, Engine/Compose versions, storage, Swarm,
# context, and installation origin. Existing Docker configuration is read-only.
detect_docker() {
	CURRENT_PHASE="Docker detection"
	if ! command_exists docker; then
		DOCKER_AVAILABLE=0
		return
	fi
	DOCKER_AVAILABLE=1
	DOCKER_VERSION=$(docker version --format '{{.Client.Version}}' 2>/dev/null || docker --version 2>/dev/null || printf 'unknown')
	if docker --version 2>/dev/null | grep -qi podman; then
		fail_check "Podman Docker compatibility is unsupported; install Docker Engine"
	fi
	if command_exists snap && snap list docker >/dev/null 2>&1; then
		fail_check "Docker installed through Snap is unsupported. Remove it with 'snap remove docker' and install Docker Engine from Docker's apt repository"
	fi
	if [[ -n "${DOCKER_HOST:-}" && "${DOCKER_HOST:-}" != "unix:///var/run/docker.sock" ]]; then
		fail_check "Remote or nonstandard DOCKER_HOST is unsupported; unset DOCKER_HOST and use /var/run/docker.sock"
	fi
	local context
	context=$(docker context show 2>/dev/null || printf 'default')
	[[ "$context" == "default" ]] || fail_check "Remote Docker context '$context' is unsupported; select the default local context"
	if ! docker info >/dev/null 2>&1; then
		fail_check "Docker is installed, but the daemon is not reachable through /var/run/docker.sock"
		return
	fi
	DOCKER_DAEMON_AVAILABLE=1
	[[ -S /var/run/docker.sock && -r /var/run/docker.sock && -w /var/run/docker.sock ]] || fail_check "The supported local Docker socket /var/run/docker.sock is not accessible"
	local security_options operating_system
	security_options=$(docker_info_value '{{json .SecurityOptions}}')
	operating_system=$(docker_info_value '{{.OperatingSystem}}')
	[[ "$security_options" != *rootless* ]] || fail_check "Rootless Docker is unsupported; install the system Docker Engine daemon"
	[[ "$operating_system" != *"Docker Desktop"* ]] || fail_check "Docker Desktop is unsupported for server installation"
	DOCKER_STORAGE_DRIVER=$(docker_info_value '{{.Driver}}')
	DOCKER_ROOT_DIR=$(docker_info_value '{{.DockerRootDir}}')
	SWARM_STATE=$(docker_info_value '{{.Swarm.LocalNodeState}}')
	COMPOSE_VERSION=$(docker compose version --short 2>/dev/null || true)
	[[ -n "$COMPOSE_VERSION" ]] || fail_check "The Docker Compose v2 plugin is required"
	local docker_major compose_numeric compose_major compose_minor
	docker_major=${DOCKER_VERSION#v}
	docker_major=${docker_major%%.*}
	compose_numeric=${COMPOSE_VERSION#v}
	compose_major=${compose_numeric%%.*}
	compose_minor=${compose_numeric#*.}
	compose_minor=${compose_minor%%.*}
	if [[ "$docker_major" =~ ^[0-9]+$ ]] && ((docker_major < MINIMUM_DOCKER_MAJOR)); then
		fail_check "Docker Engine $DOCKER_VERSION is unsupported; version $MINIMUM_DOCKER_MAJOR or newer is required"
	fi
	if [[ "$compose_major" =~ ^[0-9]+$ && "$compose_minor" =~ ^[0-9]+$ ]] &&
		((compose_major < MINIMUM_COMPOSE_MAJOR || (compose_major == MINIMUM_COMPOSE_MAJOR && compose_minor < MINIMUM_COMPOSE_MINOR))); then
		fail_check "Docker Compose $COMPOSE_VERSION is unsupported; ${MINIMUM_COMPOSE_MAJOR}.${MINIMUM_COMPOSE_MINOR}+ is required"
	fi
	case "$DOCKER_STORAGE_DRIVER" in
		overlay2 | btrfs | zfs) ok "Docker storage driver: $DOCKER_STORAGE_DRIVER" ;;
		*) warn "Docker storage driver $DOCKER_STORAGE_DRIVER is untested; overlay2 is recommended" ;;
	esac
	if [[ -n "$DOCKER_ROOT_DIR" && "$DOCKER_ROOT_DIR" != "unknown" ]]; then
		DOCKER_FREE_MB=$(df -Pm "$DOCKER_ROOT_DIR" 2>/dev/null | awk 'NR==2 {print $4}' || printf '0')
		local docker_fs
		docker_fs=$(findmnt -n -o FSTYPE --target "$DOCKER_ROOT_DIR" 2>/dev/null || printf 'unknown')
		case "$docker_fs" in nfs | nfs4 | cifs | smb3 | 9p) fail_check "Docker data root is on unsupported network filesystem $docker_fs" ;; esac
		((DOCKER_FREE_MB >= MINIMUM_DISK_MB)) || fail_check "Docker data root has only ${DOCKER_FREE_MB} MB free"
	fi
	if [[ -r /etc/docker/daemon.json ]]; then
		docker info >/dev/null 2>&1 || fail_check "Existing /etc/docker/daemon.json is incompatible with the Docker daemon"
		ok "Existing Docker daemon configuration is accepted without modification"
	fi
	ok "Docker daemon $DOCKER_VERSION is reachable; Compose $COMPOSE_VERSION is available"
}

# Validate DNS, TLS, registries, proxy settings, address families, and clock
# synchronization before image downloads or host changes.
check_connectivity() {
	CURRENT_PHASE="network connectivity validation"
	local dns_ok=1 https_ok=1 registry_ok=1
	getent ahosts github.com >/dev/null 2>&1 || dns_ok=0
	getent ahosts registry-1.docker.io >/dev/null 2>&1 || dns_ok=0
	if ((dns_ok == 1)); then ok "DNS resolution works"; else fail_check "DNS cannot resolve GitHub or Docker Hub"; fi
	curl --fail --silent --show-error --location --retry 2 --retry-delay 1 --connect-timeout 10 --max-time 30 \
		-o /dev/null https://github.com/dokploy/dokploy/releases/latest || https_ok=0
	if ((https_ok == 1)); then ok "HTTPS and certificate validation work"; else fail_check "Cannot reach Dokploy releases over verified HTTPS"; fi
	local registry_code
	registry_code=$(curl --silent --show-error --output /dev/null --write-out '%{http_code}' --retry 2 --connect-timeout 10 --max-time 30 \
		https://registry-1.docker.io/v2/ || true)
	[[ "$registry_code" == "200" || "$registry_code" == "401" ]] || registry_ok=0
	if ((registry_ok == 1)); then ok "Docker Hub registry is reachable"; else fail_check "Docker Hub registry is unreachable (HTTP ${registry_code:-none})"; fi
	if ip -4 route show default 2>/dev/null | grep -q .; then ok "IPv4 default route detected"; else warn "No IPv4 default route detected"; fi
	if ip -6 route show default 2>/dev/null | grep -q .; then
		ok "IPv6 default route detected"
		curl -6 --fail --silent --show-error --connect-timeout 5 --max-time 15 -o /dev/null https://github.com/ || warn "IPv6 has a default route but verified HTTPS over IPv6 failed; Docker should prefer working IPv4"
	else
		log "IPv6 default route not detected (optional)"
	fi
	if [[ -n "${HTTP_PROXY:-}${HTTPS_PROXY:-}${http_proxy:-}${https_proxy:-}" ]]; then
		warn "Proxy environment variables are set; ensure Docker daemon proxy settings match"
	fi
	if command_exists timedatectl; then
		local clock_sync
		clock_sync=$(timedatectl show -p NTPSynchronized --value 2>/dev/null || printf 'unknown')
		if [[ "$clock_sync" == "yes" ]]; then ok "System clock is synchronized"; else warn "System clock synchronization is $clock_sync; TLS and releases require accurate time"; fi
	fi
}

has_service() { docker service inspect "$1" >/dev/null 2>&1; }
has_container() { docker container inspect "$1" >/dev/null 2>&1; }
has_network() { docker network inspect "$1" >/dev/null 2>&1; }
has_volume() { docker volume inspect "$1" >/dev/null 2>&1; }

service_running() {
	local service="$1"
	local desired running
	desired=$(docker service inspect --format '{{.Spec.Mode.Replicated.Replicas}}' "$service" 2>/dev/null || printf '1')
	running=$(docker service ps --filter desired-state=running --format '{{.CurrentState}}' "$service" 2>/dev/null | grep -c '^Running' || true)
	((running >= desired))
}

detect_installed_version() {
	INSTALLED_VERSION="none"
	INSTALLED_IMAGE=""
	if [[ -r "$DOKPLOY_DATA_DIR/installer-state.env" ]]; then
		INSTALLED_VERSION=$(sed -n 's/^DOKPLOY_INSTALLED_VERSION=//p' "$DOKPLOY_DATA_DIR/installer-state.env" | head -n1)
	fi
	if has_service dokploy; then
		INSTALLED_IMAGE=$(docker service inspect --format '{{.Spec.TaskTemplate.ContainerSpec.Image}}' dokploy 2>/dev/null || true)
		if [[ "$INSTALLED_VERSION" == "none" || -z "$INSTALLED_VERSION" ]]; then
			local without_digest
			without_digest=${INSTALLED_IMAGE%@*}
			if [[ "$without_digest" == *:* ]]; then INSTALLED_VERSION=${without_digest##*:}; else INSTALLED_VERSION="unknown"; fi
		fi
	fi
	if [[ ! "$INSTALLED_VERSION" =~ ^v?[0-9]+\.[0-9]+\.[0-9]+([.-][A-Za-z0-9][A-Za-z0-9.-]*)?$ && "$INSTALLED_VERSION" != "latest" && "$INSTALLED_VERSION" != "canary" && "$INSTALLED_VERSION" != "none" ]]; then
		warn "Installed version metadata is invalid or unavailable; treating the version as unknown"
		INSTALLED_VERSION="unknown"
	fi
}

# Classify named services, containers, Compose projects, networks, volumes, and
# metadata into a safe install/upgrade/repair/conflict state. No state is changed.
determine_installation_state() {
	CURRENT_PHASE="installation state detection"
	if ((DOCKER_DAEMON_AVAILABLE == 0)); then
		INSTALLATION_STATE="Fresh install"
		INSTALLED_VERSION="none"
		return
	fi
	if has_container dokploy || has_container dokploy-postgres ||
		[[ -n "$(docker ps -a --filter label=com.docker.compose.project=dokploy --format '{{.ID}}' 2>/dev/null | head -n1)" ]]; then
		INSTALLATION_STATE="Conflicting installation"
		detect_installed_version
		return
	fi
	local markers=0 expected=0
	has_service dokploy && markers=$((markers + 1))
	has_service dokploy-postgres && markers=$((markers + 1))
	has_container dokploy-traefik && markers=$((markers + 1))
	has_network "$DOKPLOY_NETWORK_NAME" && markers=$((markers + 1))
	has_volume dokploy-postgres && markers=$((markers + 1))
	[[ -d "$DOKPLOY_DATA_DIR" ]] && markers=$((markers + 1))
	detect_installed_version
	if ((markers == 0)); then
		if [[ "$SWARM_STATE" == "active" && "$DOKPLOY_REUSE_EXISTING_SWARM" != "1" ]]; then
			INSTALLATION_STATE="Conflicting installation"
		else
			INSTALLATION_STATE="Fresh install"
		fi
		return
	fi
	has_service dokploy && expected=$((expected + 1))
	has_service dokploy-postgres && expected=$((expected + 1))
	has_network "$DOKPLOY_NETWORK_NAME" && expected=$((expected + 1))
	if [[ "$DOKPLOY_SKIP_TRAEFIK" == "1" ]] || has_container dokploy-traefik; then expected=$((expected + 1)); fi
	if ((expected < 4)); then
		INSTALLATION_STATE="Partial installation"
		return
	fi
	if service_running dokploy && service_running dokploy-postgres &&
		{ [[ "$DOKPLOY_SKIP_TRAEFIK" == "1" ]] || [[ "$(docker inspect -f '{{.State.Running}}' dokploy-traefik 2>/dev/null)" == "true" ]]; }; then
		if [[ "$TARGET_VERSION" != "" && "$INSTALLED_VERSION" != "$TARGET_VERSION" && "$INSTALLED_VERSION" != "unknown" ]]; then
			INSTALLATION_STATE="Upgrade available"
		else
			INSTALLATION_STATE="Existing healthy install"
		fi
	else
		INSTALLATION_STATE="Repair required"
	fi
}

# Resolve "latest" over verified HTTPS to a validated immutable release tag.
# Sets TARGET_VERSION/TARGET_IMAGE and fails closed if resolution is ambiguous.
resolve_target_version() {
	CURRENT_PHASE="version resolution"
	local requested="$DOKPLOY_VERSION"
	if [[ "$requested" == "latest" ]]; then
		local effective
		effective=$(curl --fail --silent --show-error --location --retry 5 --retry-delay 2 --connect-timeout 10 --max-time 60 \
			-o /dev/null --write-out '%{url_effective}' https://github.com/dokploy/dokploy/releases/latest) ||
			error "Could not resolve the latest immutable Dokploy release; pin DOKPLOY_VERSION explicitly"
		requested=${effective##*/}
		[[ "$requested" =~ ^v?[0-9]+\.[0-9]+\.[0-9]+([.-][A-Za-z0-9][A-Za-z0-9.-]*)?$ ]] ||
			error "Release endpoint returned an invalid version: $requested"
	fi
	TARGET_VERSION="$requested"
	TARGET_IMAGE="$DOKPLOY_IMAGE_REPOSITORY:$TARGET_VERSION"
	ok "Target Dokploy version resolved to $TARGET_VERSION"
}

normalize_version() { printf '%s' "${1#v}"; }

version_compare() {
	local left right
	left=$(normalize_version "$1")
	right=$(normalize_version "$2")
	if [[ "$left" == "$right" ]]; then
		printf 'equal'
		return
	fi
	if [[ "$(printf '%s\n%s\n' "$left" "$right" | sort -V | head -n1)" == "$left" ]]; then printf 'older'; else printf 'newer'; fi
}

classify_upgrade() {
	UPGRADE_TYPE="unknown"
	ROLLBACK_SUPPORTED="no"
	if [[ ! "$INSTALLED_VERSION" =~ ^v?[0-9]+\.[0-9]+\.[0-9]+ || ! "$TARGET_VERSION" =~ ^v?[0-9]+\.[0-9]+\.[0-9]+ ]]; then
		return 0
	fi
	local old new old_major old_minor old_patch new_major new_minor new_patch direction
	old=$(normalize_version "$INSTALLED_VERSION")
	new=$(normalize_version "$TARGET_VERSION")
	IFS=. read -r old_major old_minor old_patch <<<"${old%%-*}"
	IFS=. read -r new_major new_minor new_patch <<<"${new%%-*}"
	direction=$(version_compare "$INSTALLED_VERSION" "$TARGET_VERSION")
	if [[ "$direction" == "newer" ]]; then
		UPGRADE_TYPE="downgrade"
	elif [[ "$old_major" != "$new_major" ]]; then
		UPGRADE_TYPE="major"
	elif [[ "$old_minor" != "$new_minor" ]]; then
		UPGRADE_TYPE="minor"
	elif [[ "$old_patch" != "$new_patch" ]]; then
		UPGRADE_TYPE="patch"
	else
		UPGRADE_TYPE="same"
	fi
	if [[ -r "$DOKPLOY_ROLLBACK_COMPATIBILITY_FILE" ]] &&
		awk -v old="$INSTALLED_VERSION" -v new="$TARGET_VERSION" '$1 == old && $2 == new && $3 == "database-safe" {found=1} END {exit !found}' "$DOKPLOY_ROLLBACK_COMPATIBILITY_FILE"; then
		ROLLBACK_SUPPORTED="yes"
	fi
}

validate_upgrade_path() {
	classify_upgrade
	if [[ -n "$DOKPLOY_MIN_UPGRADE_VERSION" && "$INSTALLED_VERSION" =~ ^v?[0-9] ]]; then
		[[ "$(version_compare "$INSTALLED_VERSION" "$DOKPLOY_MIN_UPGRADE_VERSION")" != "older" ]] ||
			error "Installed version $INSTALLED_VERSION is below the minimum direct-upgrade version $DOKPLOY_MIN_UPGRADE_VERSION"
	fi
	case "$UPGRADE_TYPE" in
		downgrade | major)
			[[ "$DOKPLOY_ALLOW_BREAKING_UPGRADE" == "1" ]] || error "$UPGRADE_TYPE upgrade path $INSTALLED_VERSION -> $TARGET_VERSION requires DOKPLOY_ALLOW_BREAKING_UPGRADE=1 after reviewing release notes"
			;;
	esac
}

port_owner() {
	local port="$1"
	ss -H -ltnup "sport = :$port" 2>/dev/null | head -n1 || true
}

container_port_owner() {
	local port="$1"
	docker ps --format '{{.Names}} {{.Ports}}' 2>/dev/null | awk -v p=":$port->" 'index($0,p) {print; exit}' || true
}

# Inspect TCP and UDP ownership for each configured host port and identify the
# owning Docker container where possible. External-proxy mode skips 80/443.
check_ports() {
	CURRENT_PHASE="port validation"
	command_exists ss || {
		fail_check "Cannot inspect ports because ss is missing"
		return
	}
	local label port owner container_owner expected
	while IFS='|' read -r label port; do
		if [[ "$DOKPLOY_SKIP_TRAEFIK" == "1" && "$label" != "Application" ]]; then
			log "$label port $port is managed by the operator's external reverse proxy"
			continue
		fi
		owner=$(port_owner "$port")
		[[ -z "$owner" ]] && {
			ok "$label port $port is available"
			continue
		}
		container_owner=""
		((DOCKER_DAEMON_AVAILABLE == 1)) && container_owner=$(container_port_owner "$port")
		expected=0
		if [[ "$INSTALLATION_STATE" != "Fresh install" ]]; then
			[[ "$label" == "Application" && "$container_owner" == dokploy.* ]] && expected=1
			[[ "$label" != "Application" && "$container_owner" == dokploy-traefik* ]] && expected=1
		fi
		if ((expected == 1)); then
			ok "$label port $port is owned by the existing Dokploy installation"
		elif [[ "$DOKPLOY_ALLOW_PORT_CONFLICT" == "1" ]]; then
			warn "$label port $port is occupied and conflict override is enabled. Host owner: $owner; container: ${container_owner:-none}"
		else
			fail_check "$label port $port is occupied. Host owner: $owner; container: ${container_owner:-none}. Choose an alternate DOKPLOY_*_PORT, integrate an existing proxy with DOKPLOY_SKIP_TRAEFIK=1, or explicitly set DOKPLOY_ALLOW_PORT_CONFLICT=1"
		fi
	done <<EOF
HTTP|$DOKPLOY_HTTP_PORT
HTTPS|$DOKPLOY_HTTPS_PORT
Application|$DOKPLOY_APP_PORT
EOF
}

select_action() {
	local requested="$DOKPLOY_INSTALL_ACTION"
	if [[ "$requested" == "check" ]]; then
		SELECTED_ACTION="check"
		return
	fi
	if [[ "$requested" == "abort" ]]; then
		SELECTED_ACTION="abort"
		fail_check "DOKPLOY_INSTALL_ACTION=abort requested; no changes will be made"
		return
	fi
	if [[ "$requested" != "auto" ]]; then
		SELECTED_ACTION="$requested"
	else
		case "$INSTALLATION_STATE" in
			"Fresh install") SELECTED_ACTION="install" ;;
			"Upgrade available") SELECTED_ACTION="upgrade" ;;
			"Repair required" | "Partial installation") SELECTED_ACTION="repair" ;;
			"Existing healthy install") SELECTED_ACTION="validate" ;;
			*) SELECTED_ACTION="abort" ;;
		esac
	fi
	case "$SELECTED_ACTION:$INSTALLATION_STATE" in
		install:"Fresh install" | upgrade:"Upgrade available" | repair:"Repair required" | repair:"Partial installation" | validate:"Existing healthy install") ;;
		*) fail_check "Action '$SELECTED_ACTION' is incompatible with state '$INSTALLATION_STATE'" ;;
	esac
}

print_preflight_report() {
	section "Dokploy installation preflight"
	printf '%-22s %s\n' \
		"Installer version:" "$INSTALLER_VERSION" \
		"Operating system:" "$PLATFORM_ID $PLATFORM_VERSION ($PLATFORM_CLASS)" \
		"Package manager:" "$PACKAGE_MANAGER" \
		"Init system:" "$INIT_SYSTEM" \
		"Architecture:" "$ARCHITECTURE" \
		"Kernel:" "$KERNEL_VERSION" \
		"Virtualization:" "$VIRTUALIZATION" \
		"Memory:" "${MEMORY_MB} MB (recommended: ${RECOMMENDED_MEMORY_MB} MB)" \
		"Swap:" "${SWAP_MB} MB" \
		"Free disk:" "${INSTALL_FREE_MB} MB at $DOKPLOY_DATA_DIR" \
		"Backup disk:" "${BACKUP_FREE_MB} MB at $DOKPLOY_BACKUP_DIR" \
		"Filesystem:" "$FILESYSTEM_TYPE" \
		"Backup filesystem:" "$BACKUP_FILESYSTEM_TYPE" \
		"Docker:" "$DOCKER_VERSION" \
		"Docker Compose:" "$COMPOSE_VERSION" \
		"Docker data root:" "$DOCKER_ROOT_DIR (${DOCKER_FREE_MB} MB free)" \
		"Docker Swarm:" "$SWARM_STATE" \
		"Existing install:" "$INSTALLATION_STATE" \
		"Installed version:" "$INSTALLED_VERSION" \
		"Target version:" "$TARGET_VERSION" \
		"Upgrade type:" "$UPGRADE_TYPE" \
		"DB migration:" "$([[ "$INSTALLATION_STATE" == "Upgrade available" ]] && printf 'application-managed' || printf 'not required')" \
		"Rollback supported:" "$ROLLBACK_SUPPORTED" \
		"Requested action:" "$DOKPLOY_INSTALL_ACTION" \
		"Selected action:" "${SELECTED_ACTION:-pending}" \
		"Log file:" "$LOG_FILE"
	if ((PREFLIGHT_FAILURES > 0)); then
		printf '\n%sPreflight result: blocked (%s failure(s), %s warning(s))%s\n' "$COLOR_RED" "$PREFLIGHT_FAILURES" "$PREFLIGHT_WARNINGS" "$COLOR_RESET"
	else
		printf '\n%sPreflight result: ready (%s warning(s))%s\n' "$COLOR_GREEN" "$PREFLIGHT_WARNINGS" "$COLOR_RESET"
	fi
}

print_dry_run_actions() {
	section "Planned actions (no changes made)"
	if ((DOCKER_AVAILABLE == 0)); then printf 'Would install Docker Engine %s from its signed apt repository\n' "$DOKPLOY_DOCKER_VERSION"; fi
	case "$INSTALLATION_STATE" in
		"Fresh install")
			printf 'Would create %s with restrictive permissions\n' "$DOKPLOY_DATA_DIR"
			printf 'Would initialize Docker Swarm only if inactive\n'
			printf 'Would create Docker network %s only if absent\n' "$DOKPLOY_NETWORK_NAME"
			printf 'Would create PostgreSQL and Dokploy services using Docker secrets\n'
			[[ "$DOKPLOY_SKIP_TRAEFIK" == "1" ]] || printf 'Would reserve ports %s and %s and start Traefik\n' "$DOKPLOY_HTTP_PORT" "$DOKPLOY_HTTPS_PORT"
			printf 'Would install Dokploy %s on port %s\n' "$TARGET_VERSION" "$DOKPLOY_APP_PORT"
			;;
		"Upgrade available") printf 'Would back up version %s, pull verified image %s, upgrade, validate, and roll back only if the declared path is safe\n' "$INSTALLED_VERSION" "$TARGET_IMAGE" ;;
		"Repair required" | "Partial installation") printf 'Would preserve existing data and recreate only missing or unhealthy Dokploy resources\n' ;;
		"Existing healthy install") printf 'Would make no changes; the requested version is already healthy\n' ;;
	esac
}

# Execute all read-only host, Docker, resource, and connectivity checks. Results
# accumulate in PREFLIGHT_FAILURES/WARNINGS for one structured report.
run_preflight() {
	section "Preflight checks"
	validate_privileges
	detect_platform
	check_dependencies
	if [[ "$ARCHITECTURE" == "unsupported" ]]; then fail_check "Unsupported CPU architecture $(uname -m); amd64 and arm64 are supported"; else ok "Architecture $ARCHITECTURE is supported"; fi
	if [[ "$PLATFORM_CLASS" == "supported" ]]; then
		ok "$PLATFORM_ID $PLATFORM_VERSION is supported"
	elif [[ "$DOKPLOY_ALLOW_UNSUPPORTED" == "1" ]]; then
		warn "$PLATFORM_ID $PLATFORM_VERSION is experimental and explicitly allowed"
	else
		fail_check "$PLATFORM_ID $PLATFORM_VERSION is experimental. Supported releases: Ubuntu 22.04/24.04 and Debian 12. Set DOKPLOY_ALLOW_UNSUPPORTED=1 only after testing"
	fi
	if [[ "$INIT_SYSTEM" == "systemd" ]]; then ok "systemd init is available"; else fail_check "A systemd-based server is required"; fi
	detect_resources
	check_kernel_and_virtualization
	check_resource_thresholds
	detect_docker
	if ((DOCKER_AVAILABLE == 0)); then
		if [[ "$DOKPLOY_SKIP_DOCKER_INSTALL" == "1" ]]; then
			fail_check "Docker is absent and automatic Docker installation is disabled"
		elif [[ "$PACKAGE_MANAGER" != "apt" ]]; then
			fail_check "Docker is absent; automatic installation is available only on supported apt hosts"
		else
			warn "Docker is absent and will be installed from Docker's signed apt repository"
		fi
	fi
	check_connectivity
}

install_host_file() {
	local source="$1" target="$2" mode="$3"
	if [[ -f "$target" ]] && cmp -s "$source" "$target"; then
		ok "Existing $target already matches the validated configuration"
		return
	fi
	[[ ! -L "$target" ]] || error "Refusing to replace symbolic-link host configuration $target"
	if [[ -e "$target" ]]; then
		if [[ -z "$HOST_CONFIG_BACKUP_PATH" ]]; then
			HOST_CONFIG_BACKUP_PATH="$DOKPLOY_BACKUP_DIR/host-config-$(date -u +%Y%m%dT%H%M%SZ)"
			mkdir -p "$HOST_CONFIG_BACKUP_PATH"
			chmod 0700 "$HOST_CONFIG_BACKUP_PATH"
		fi
		cp -a -- "$target" "$HOST_CONFIG_BACKUP_PATH/$(basename "$target")"
		sha256sum "$HOST_CONFIG_BACKUP_PATH/$(basename "$target")" >"$HOST_CONFIG_BACKUP_PATH/$(basename "$target").sha256"
		ok "Backed up $target to $HOST_CONFIG_BACKUP_PATH"
	fi
	install -m "$mode" "$source" "$target.dokploy-new"
	mv -f -- "$target.dokploy-new" "$target"
	ok "Atomically installed validated host configuration $target"
}

# Install Docker from Docker's signed apt repository. Existing installations
# are never replaced and daemon.json is never modified.
install_docker() {
	CURRENT_PHASE="Docker installation"
	((DOCKER_AVAILABLE == 0)) || return
	[[ "$DOKPLOY_SKIP_DOCKER_INSTALL" == "0" ]] || error "Docker is absent and DOKPLOY_SKIP_DOCKER_INSTALL=1"
	[[ "$PACKAGE_MANAGER" == "apt" ]] || error "Automatic Docker installation is supported only on apt systems. Install Docker Engine and Compose v2 manually, then rerun"
	section "Install Docker Engine"
	local repo_os="$PLATFORM_ID" codename key_file fingerprint package_version
	case "$repo_os" in ubuntu | debian) ;; *) error "Docker apt repository does not support detected OS $repo_os" ;; esac
	codename=$(os_release_value VERSION_CODENAME)
	[[ "$codename" =~ ^[a-z0-9._-]+$ ]] || error "Invalid distribution codename in /etc/os-release"
	[[ -n "$codename" ]] || error "Cannot determine distribution codename"
	run_logged apt-get update
	audit_command env DEBIAN_FRONTEND=noninteractive apt-get install -y ca-certificates curl gpg
	DEBIAN_FRONTEND=noninteractive apt-get install -y ca-certificates curl gpg
	command_exists gpg || error "gpg was installed but is unavailable for Docker repository identity verification"
	install -m 0755 -d /etc/apt/keyrings
	key_file="$TMP_DIR/docker.asc"
	curl --fail --show-error --location --retry 5 --retry-delay 2 --connect-timeout 10 --max-time 120 \
		https://download.docker.com/linux/"$repo_os"/gpg --output "$key_file"
	fingerprint=$(gpg --show-keys --with-colons "$key_file" 2>/dev/null | awk -F: '$1 == "fpr" {print $10; exit}')
	[[ "$fingerprint" == "$DOCKER_GPG_FINGERPRINT" ]] || error "Docker repository key identity verification failed"
	install_host_file "$key_file" /etc/apt/keyrings/docker.asc 0644
	printf 'deb [arch=%s signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/%s %s stable\n' \
		"$ARCHITECTURE" "$repo_os" "$codename" >"$TMP_DIR/docker.list"
	install_host_file "$TMP_DIR/docker.list" /etc/apt/sources.list.d/docker.list 0644
	run_logged apt-get update
	package_version=$(apt-cache madison docker-ce | awk -v want="$DOKPLOY_DOCKER_VERSION" '$3 ~ want {print $3; exit}')
	[[ -n "$package_version" ]] || error "Docker Engine $DOKPLOY_DOCKER_VERSION is unavailable for $repo_os $codename"
	audit_command env DEBIAN_FRONTEND=noninteractive apt-get install -y "docker-ce=$package_version" "docker-ce-cli=$package_version" containerd.io docker-buildx-plugin docker-compose-plugin
	DEBIAN_FRONTEND=noninteractive apt-get install -y \
		"docker-ce=$package_version" "docker-ce-cli=$package_version" containerd.io docker-buildx-plugin docker-compose-plugin
	run_logged systemctl enable --now docker
	local failures_before_validation=$PREFLIGHT_FAILURES
	DOCKER_AVAILABLE=0
	DOCKER_DAEMON_AVAILABLE=0
	detect_docker
	((DOCKER_DAEMON_AVAILABLE == 1)) || error "Docker was installed, but its daemon is not reachable"
	((PREFLIGHT_FAILURES == failures_before_validation)) || error "Docker was installed but failed post-install compatibility validation"
}

get_private_ip() {
	ip -o -4 addr show scope global 2>/dev/null |
		awk '$2 !~ /^(docker|br-|veth)/ {split($4,a,"/"); if (a[1] ~ /^10\./ || a[1] ~ /^192\.168\./ || a[1] ~ /^172\.(1[6-9]|2[0-9]|3[01])\./) {print a[1]; exit}}'
}

get_public_ip() {
	local endpoint ip_value=""
	for endpoint in https://ifconfig.io/ip https://icanhazip.com https://ipecho.net/plain; do
		ip_value=$(curl -4 --fail --silent --show-error --connect-timeout 5 --max-time 10 "$endpoint" 2>/dev/null | tr -d '[:space:]') || true
		[[ "$ip_value" =~ ^[0-9]{1,3}(\.[0-9]{1,3}){3}$ ]] && {
			printf '%s' "$ip_value"
			return
		}
	done
	return 1
}

resolve_advertise_address() {
	local address="$DOKPLOY_ADVERTISE_ADDR"
	[[ -n "$address" ]] || address=$(get_private_ip || true)
	[[ -n "$address" ]] || address=$(get_public_ip || true)
	[[ -n "$address" && "$address" != *[[:space:]]* ]] || error "Could not determine a Docker Swarm advertise address. Set DOKPLOY_ADVERTISE_ADDR to a local interface address"
	DOKPLOY_ADVERTISE_ADDR="$address"
}

# Initialize Swarm only when inactive, or reuse it when Dokploy/explicit policy
# permits. Never leaves an existing swarm or interpolates arguments with eval.
initialize_swarm() {
	CURRENT_PHASE="Docker Swarm initialization"
	SWARM_STATE=$(docker_info_value '{{.Swarm.LocalNodeState}}')
	case "$SWARM_STATE" in
		active)
			if has_service dokploy || [[ "$INSTALLATION_STATE" == "Fresh install" && "$DOKPLOY_REUSE_EXISTING_SWARM" == "1" ]]; then
				ok "Reusing active Docker Swarm"
			else
				error "This host is already in a non-Dokploy swarm. Set DOKPLOY_REUSE_EXISTING_SWARM=1 only if Dokploy should share it"
			fi
			;;
		inactive | pending | locked | error | unknown | "")
			resolve_advertise_address
			local init_args=(swarm init --advertise-addr "$DOKPLOY_ADVERTISE_ADDR")
			if [[ -n "${DOCKER_SWARM_INIT_ARGS:-}" ]]; then
				warn "DOCKER_SWARM_INIT_ARGS is deprecated; values are split without eval and must not contain quoted spaces"
				local extra_args=()
				IFS=' ' read -r -a extra_args <<<"$DOCKER_SWARM_INIT_ARGS"
				init_args+=("${extra_args[@]}")
			fi
			run_logged docker "${init_args[@]}" || error "Failed to initialize Docker Swarm at $DOKPLOY_ADVERTISE_ADDR"
			ok "Docker Swarm initialized"
			;;
		*) error "Unsupported Docker Swarm state: $SWARM_STATE" ;;
	esac
}

# Reuse a compatible attachable overlay network or create it idempotently. An
# incompatible same-name network is a blocking conflict and is never replaced.
ensure_network() {
	CURRENT_PHASE="Docker network setup"
	if has_network "$DOKPLOY_NETWORK_NAME"; then
		local driver scope
		driver=$(docker network inspect --format '{{.Driver}}' "$DOKPLOY_NETWORK_NAME")
		scope=$(docker network inspect --format '{{.Scope}}' "$DOKPLOY_NETWORK_NAME")
		[[ "$driver:$scope" == "overlay:swarm" ]] || error "Existing network $DOKPLOY_NETWORK_NAME is $driver/$scope, but overlay/swarm is required"
		ok "Reusing Docker network $DOKPLOY_NETWORK_NAME"
	else
		run_logged docker network create --driver overlay --attachable "$DOKPLOY_NETWORK_NAME" >/dev/null || error "Failed to create overlay network $DOKPLOY_NETWORK_NAME"
		CREATED_NETWORK=1
		ok "Docker network $DOKPLOY_NETWORK_NAME created"
	fi
}

# Create a missing Docker secret from a protected temporary file with tracing
# disabled. Existing secrets are preserved and secret values are never logged.
create_secret_if_missing() {
	local secret_name="$1"
	local generator="$2"
	if docker secret inspect "$secret_name" >/dev/null 2>&1; then
		ok "Reusing Docker secret $secret_name"
		return
	fi
	local secret_file="$TMP_DIR/$secret_name"
	trace_off
	case "$generator" in
		password) openssl rand -hex 24 >"$secret_file" ;;
		hex) openssl rand -hex 32 >"$secret_file" ;;
		*)
			trace_restore
			error "Unknown secret generator"
			;;
	esac
	[[ $(wc -c <"$secret_file") -ge 32 ]] || {
		trace_restore
		error "Failed to generate secret $secret_name"
	}
	chmod 0600 "$secret_file"
	docker secret create "$secret_name" "$secret_file" >/dev/null || {
		trace_restore
		error "Failed to create Docker secret $secret_name"
	}
	: >"$secret_file"
	trace_restore
	case "$secret_name" in
		dokploy_postgres_password) CREATED_POSTGRES_SECRET=1 ;;
		dokploy_auth_secret) CREATED_AUTH_SECRET=1 ;;
	esac
	ok "Created Docker secret $secret_name"
}

validate_repair_secrets() {
	if has_volume dokploy-postgres && ! docker secret inspect dokploy_postgres_password >/dev/null 2>&1 && ! has_service dokploy-postgres; then
		error "The existing dokploy-postgres volume has no recoverable Docker password secret. Restore the original secret or a database backup before repair; generating a new password would make the preserved database unreachable"
	fi
}

prepare_repair_target() {
	if has_service dokploy && [[ "$INSTALLED_VERSION" != "none" && "$INSTALLED_VERSION" != "unknown" && "$INSTALLED_VERSION" != "$TARGET_VERSION" ]]; then
		warn "Repair preserves installed version $INSTALLED_VERSION; run a separate upgrade after the repaired installation is healthy"
		TARGET_VERSION="$INSTALLED_VERSION"
		TARGET_IMAGE="$DOKPLOY_IMAGE_REPOSITORY:$TARGET_VERSION"
	elif has_service dokploy && [[ "$INSTALLED_VERSION" == "unknown" && -n "$INSTALLED_IMAGE" ]]; then
		TARGET_VERSION="unknown"
		TARGET_IMAGE="$INSTALLED_IMAGE"
	fi
}

release_tag_for_version() {
	case "$TARGET_VERSION" in v[0-9]*.[0-9]*.[0-9]* | latest) printf 'latest' ;; *) printf '%s' "$TARGET_VERSION" ;; esac
}

# Pull through Docker's TLS registry client, verify that the image supplies a
# content-addressed RepoDigest, and use that immutable digest for deployment.
pull_and_verify_images() {
	CURRENT_PHASE="verified image download"
	section "Download and verify container images"
	local scope="${1:-all}" image digest
	local images=("$TARGET_IMAGE")
	if [[ "$scope" == "all" ]]; then
		images+=("$POSTGRES_IMAGE" "$TRAEFIK_IMAGE")
	fi
	for image in "${images[@]}"; do
		[[ "$image" == "$TRAEFIK_IMAGE" && "$DOKPLOY_SKIP_TRAEFIK" == "1" ]] && continue
		run_logged docker pull "$image" || error "Failed to pull image $image from the verified registry connection"
		digest=$(docker image inspect --format '{{index .RepoDigests 0}}' "$image" 2>/dev/null || true)
		[[ "$digest" == *@sha256:* ]] || error "Image $image has no verified content digest"
		ok "Verified $image as $digest"
		case "$image" in
			"$TARGET_IMAGE") TARGET_IMAGE_DIGEST="$digest" ;;
			"$POSTGRES_IMAGE") POSTGRES_IMAGE_DIGEST="$digest" ;;
			"$TRAEFIK_IMAGE") TRAEFIK_IMAGE_DIGEST="$digest" ;;
		esac
	done
	return 0
}

ensure_data_directory() {
	CURRENT_PHASE="data directory setup"
	mkdir -p -- "$DOKPLOY_DATA_DIR"
	chmod 0750 "$DOKPLOY_DATA_DIR"
}

# Create PostgreSQL when absent or force an unhealthy existing task during
# repair. The persistent volume is always retained on failures and reruns.
create_postgres_service() {
	CURRENT_PHASE="PostgreSQL service setup"
	if has_service dokploy-postgres; then
		if ! service_running dokploy-postgres && [[ "$SELECTED_ACTION" == "repair" ]]; then
			run_logged docker service update --force dokploy-postgres >/dev/null || error "Failed to restart the existing PostgreSQL service during repair"
			ok "PostgreSQL service repair requested"
		else
			ok "Reusing dokploy-postgres service"
		fi
		return
	fi
	local args=(service create --name dokploy-postgres --constraint 'node.role==manager' --network "$DOKPLOY_NETWORK_NAME"
		--env POSTGRES_USER=dokploy --env POSTGRES_DB=dokploy
		--secret "source=dokploy_postgres_password,target=/run/secrets/postgres_password"
		--env POSTGRES_PASSWORD_FILE=/run/secrets/postgres_password
		--mount "type=volume,source=dokploy-postgres,target=/var/lib/postgresql/data")
	[[ -n "$ENDPOINT_MODE" ]] && args+=(--endpoint-mode "$ENDPOINT_MODE")
	[[ -n "$POSTGRES_IMAGE_DIGEST" ]] || error "Verified PostgreSQL image digest is unavailable"
	args+=("$POSTGRES_IMAGE_DIGEST")
	run_logged docker "${args[@]}" >/dev/null || error "Failed to create PostgreSQL service"
	CREATED_POSTGRES_SERVICE=1
	ok "PostgreSQL service created"
}

# Create Dokploy at the verified image digest or force an unhealthy repair task.
# Mounts, secrets, network, port, and manager placement are explicit.
create_dokploy_service() {
	CURRENT_PHASE="Dokploy service setup"
	if has_service dokploy; then
		if ! service_running dokploy && [[ "$SELECTED_ACTION" == "repair" ]]; then
			run_logged docker service update --force --image "$TARGET_IMAGE_DIGEST" dokploy >/dev/null || error "Failed to restart the existing Dokploy service during repair"
			ok "Dokploy service repair requested"
		else
			ok "Reusing dokploy service"
		fi
		return
	fi
	local release_tag args
	release_tag=$(release_tag_for_version)
	args=(service create --name dokploy --replicas 1 --network "$DOKPLOY_NETWORK_NAME"
		--mount "type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock"
		--mount "type=bind,source=$DOKPLOY_DATA_DIR,target=/etc/dokploy"
		--mount "type=volume,source=dokploy,target=/root/.docker"
		--secret "source=dokploy_postgres_password,target=/run/secrets/postgres_password"
		--secret "source=dokploy_auth_secret,target=/run/secrets/dokploy_auth_secret"
		--publish "published=$DOKPLOY_APP_PORT,target=3000,mode=host"
		--update-parallelism 1 --update-order stop-first --constraint 'node.role == manager'
		--env POSTGRES_PASSWORD_FILE=/run/secrets/postgres_password
		--env BETTER_AUTH_SECRET_FILE=/run/secrets/dokploy_auth_secret
		--env "RELEASE_TAG=$release_tag")
	[[ -n "$ENDPOINT_MODE" ]] && args+=(--endpoint-mode "$ENDPOINT_MODE")
	args+=("$TARGET_IMAGE_DIGEST")
	run_logged docker "${args[@]}" >/dev/null || error "Failed to create Dokploy service"
	CREATED_DOKPLOY_SERVICE=1
	ok "Dokploy service created at immutable image digest"
}

wait_for_file() {
	local path="$1" attempts="${2:-30}" i
	for ((i = 1; i <= attempts; i++)); do
		[[ -f "$path" ]] && return 0
		sleep 2
	done
	return 1
}

# Start or repair the bundled proxy after Dokploy generates validated bind-file
# paths. Existing proxy mode leaves ports and proxy ownership to the operator.
ensure_traefik() {
	CURRENT_PHASE="reverse proxy setup"
	[[ "$DOKPLOY_SKIP_TRAEFIK" == "0" ]] || {
		warn "Traefik installation skipped; configure the existing reverse proxy to route to port $DOKPLOY_APP_PORT"
		return
	}
	if has_container dokploy-traefik; then
		if [[ "$(docker inspect -f '{{.State.Running}}' dokploy-traefik 2>/dev/null)" != "true" ]]; then docker start dokploy-traefik >/dev/null; fi
		docker network inspect "$DOKPLOY_NETWORK_NAME" --format '{{json .Containers}}' | grep -q dokploy-traefik ||
			docker network connect "$DOKPLOY_NETWORK_NAME" dokploy-traefik
		ok "Reusing dokploy-traefik container"
		return
	fi
	wait_for_file "$DOKPLOY_DATA_DIR/traefik/traefik.yml" 45 || error "Dokploy did not generate Traefik configuration within 90 seconds"
	[[ -n "$TRAEFIK_IMAGE_DIGEST" ]] || error "Verified Traefik image digest is unavailable"
	audit_command docker run -d --name dokploy-traefik --restart always \
		-v "$DOKPLOY_DATA_DIR/traefik/traefik.yml:/etc/traefik/traefik.yml:ro" \
		-v "$DOKPLOY_DATA_DIR/traefik/dynamic:/etc/dokploy/traefik/dynamic" \
		-v /var/run/docker.sock:/var/run/docker.sock:ro \
		-p "$DOKPLOY_HTTP_PORT:80/tcp" -p "$DOKPLOY_HTTPS_PORT:443/tcp" -p "$DOKPLOY_HTTPS_PORT:443/udp" "$TRAEFIK_IMAGE_DIGEST"
	docker run -d --name dokploy-traefik --restart always \
		-v "$DOKPLOY_DATA_DIR/traefik/traefik.yml:/etc/traefik/traefik.yml:ro" \
		-v "$DOKPLOY_DATA_DIR/traefik/dynamic:/etc/dokploy/traefik/dynamic" \
		-v /var/run/docker.sock:/var/run/docker.sock:ro \
		-p "$DOKPLOY_HTTP_PORT:80/tcp" -p "$DOKPLOY_HTTPS_PORT:443/tcp" -p "$DOKPLOY_HTTPS_PORT:443/udp" \
		"$TRAEFIK_IMAGE_DIGEST" >/dev/null || error "Failed to start Dokploy Traefik reverse proxy"
	CREATED_TRAEFIK_CONTAINER=1
	docker network connect "$DOKPLOY_NETWORK_NAME" dokploy-traefik || error "Failed to attach Traefik to $DOKPLOY_NETWORK_NAME"
	ok "Traefik reverse proxy created"
}

# Preserve service specs, prior image/channel, configuration, and a PostgreSQL
# dump in a private checksummed directory. Any backup failure blocks the upgrade.
create_backup() {
	CURRENT_PHASE="pre-upgrade backup"
	section "Create pre-upgrade backup"
	mkdir -p -- "$DOKPLOY_BACKUP_DIR"
	chmod 0700 "$DOKPLOY_BACKUP_DIR"
	BACKUP_PATH="$DOKPLOY_BACKUP_DIR/${INSTALLED_VERSION}-$(date -u +%Y%m%dT%H%M%SZ)"
	mkdir -p "$BACKUP_PATH"
	chmod 0700 "$BACKUP_PATH"
	docker service inspect dokploy >"$BACKUP_PATH/dokploy-service.json"
	docker service inspect dokploy-postgres >"$BACKUP_PATH/postgres-service.json"
	printf '%s\n' "$INSTALLED_IMAGE" >"$BACKUP_PATH/previous-image"
	docker service inspect --format '{{range .Spec.TaskTemplate.ContainerSpec.Env}}{{println .}}{{end}}' dokploy |
		sed -n 's/^RELEASE_TAG=//p' | head -n1 >"$BACKUP_PATH/previous-release-tag"
	if [[ -d "$DOKPLOY_DATA_DIR" ]]; then
		tar --acls --xattrs -czf "$BACKUP_PATH/dokploy-config.tar.gz" -C "$(dirname "$DOKPLOY_DATA_DIR")" "$(basename "$DOKPLOY_DATA_DIR")" || error "Failed to back up Dokploy configuration"
	fi
	local postgres_container
	postgres_container=$(docker ps --filter name=dokploy-postgres --filter status=running --format '{{.ID}}' | head -n1)
	[[ -n "$postgres_container" ]] || error "Cannot back up database because the PostgreSQL task is not running"
	docker exec "$postgres_container" pg_dump -U dokploy -d dokploy -Fc >"$BACKUP_PATH/database.dump" || error "Database backup failed; upgrade was not started"
	sha256sum "$BACKUP_PATH"/* >"$BACKUP_PATH/SHA256SUMS"
	chmod 0600 "$BACKUP_PATH"/*
	ok "Backup created and checksummed at $BACKUP_PATH"
}

# Run the ordered validation, backup, digest pull, migration handoff, service
# update, health validation, rollback decision, and retention/cleanup phases.
upgrade_dokploy() {
	CURRENT_PHASE="upgrade validation"
	validate_upgrade_path
	create_backup
	pull_and_verify_images target
	CURRENT_PHASE="configuration migration"
	log "No installer-owned configuration migration is required for $INSTALLED_VERSION -> $TARGET_VERSION"
	CURRENT_PHASE="database migration"
	log "Database migrations are application-managed during Dokploy startup; pre-migration backup is available at $BACKUP_PATH/database.dump"
	CURRENT_PHASE="service upgrade"
	local release_tag update_args
	release_tag=$(release_tag_for_version)
	update_args=(service update --image "$TARGET_IMAGE_DIGEST" --update-order stop-first --update-parallelism 1)
	if docker service inspect --format '{{range .Spec.TaskTemplate.ContainerSpec.Env}}{{println .}}{{end}}' dokploy | grep -q '^RELEASE_TAG='; then
		update_args+=(--env-rm RELEASE_TAG)
	fi
	update_args+=(--env-add "RELEASE_TAG=$release_tag" dokploy)
	run_logged docker "${update_args[@]}" >/dev/null || {
		attempt_rollback || true
		error "Dokploy service update failed"
	}
	if ! validate_services; then
		attempt_rollback || true
		error "Upgraded services did not pass health validation"
	fi
	CURRENT_PHASE="post-upgrade cleanup"
	log "Upgrade cleanup complete; the prior image and checksummed backup are intentionally retained for recovery"
}

# Restore the previous image/channel only for an explicitly database-safe pair,
# then run the same health checks. Database dumps are never restored destructively.
attempt_rollback() {
	ROLLBACK_ATTEMPTED="yes"
	CURRENT_PHASE="automatic rollback"
	if [[ "$ROLLBACK_SUPPORTED" != "yes" ]]; then
		ROLLBACK_RESULT="not safe for this migration path; backup preserved at $BACKUP_PATH"
		warn "Automatic rollback is not declared database-safe for $INSTALLED_VERSION -> $TARGET_VERSION. The failed deployment and backup were preserved for manual recovery."
		return 1
	fi
	local previous_image previous_release_tag rollback_args
	previous_image=$(<"$BACKUP_PATH/previous-image")
	[[ -n "$previous_image" ]] || {
		ROLLBACK_RESULT="failed: previous image is unknown"
		return 1
	}
	previous_release_tag=$(<"$BACKUP_PATH/previous-release-tag")
	rollback_args=(service update --image "$previous_image" --rollback-order stop-first)
	if docker service inspect --format '{{range .Spec.TaskTemplate.ContainerSpec.Env}}{{println .}}{{end}}' dokploy | grep -q '^RELEASE_TAG='; then
		rollback_args+=(--env-rm RELEASE_TAG)
	fi
	[[ -n "$previous_release_tag" ]] && rollback_args+=(--env-add "RELEASE_TAG=$previous_release_tag")
	rollback_args+=(dokploy)
	run_logged docker "${rollback_args[@]}" >/dev/null || {
		ROLLBACK_RESULT="failed while restoring previous image"
		return 1
	}
	if validate_services; then
		ROLLBACK_RESULT="previous image restored and healthy; database backup retained (not destructively restored)"
		return 0
	fi
	ROLLBACK_RESULT="failed health validation after restoring previous image"
	return 1
}

# Recreate only missing/unhealthy Dokploy resources at the installed version.
# Existing data and credentials are preserved; unrecoverable secrets fail closed.
repair_installation() {
	CURRENT_PHASE="installation repair"
	section "Repair installation"
	initialize_swarm
	ensure_network
	ensure_data_directory
	validate_repair_secrets
	prepare_repair_target
	create_secret_if_missing dokploy_postgres_password password
	create_secret_if_missing dokploy_auth_secret hex
	pull_and_verify_images
	create_postgres_service
	create_dokploy_service
	ensure_traefik
}

# Provision a fresh supported host in dependency order. Every resource creation
# is tracked so failure cleanup can remove only resources from this run.
apply_fresh_install() {
	CURRENT_PHASE="fresh installation"
	section "Install Dokploy"
	install_docker
	initialize_swarm
	ensure_network
	ensure_data_directory
	create_secret_if_missing dokploy_postgres_password password
	create_secret_if_missing dokploy_auth_secret hex
	pull_and_verify_images
	create_postgres_service
	create_dokploy_service
	ensure_traefik
}

wait_for_service() {
	local service="$1" attempts="$2" i
	for ((i = 1; i <= attempts; i++)); do
		service_running "$service" && return 0
		sleep "$DOKPLOY_HEALTH_INTERVAL"
	done
	return 1
}

wait_for_http() {
	local url="$1" attempts="$2" i
	for ((i = 1; i <= attempts; i++)); do
		if curl --fail --silent --show-error --max-time 5 "$url" >/dev/null 2>&1; then return 0; fi
		sleep "$DOKPLOY_HEALTH_INTERVAL"
	done
	return 1
}

check_restart_loops() {
	local service="$1"
	! docker service ps --filter desired-state=running --no-trunc --format '{{.CurrentState}} {{.Error}}' "$service" 2>/dev/null | grep -Eq 'Rejected|Failed|non-zero exit'
}

# Verify service tasks, database reachability, endpoint response, mounts,
# network attachment, proxy state, HTTPS (when configured), and stability.
validate_services() {
	CURRENT_PHASE="post-install health validation"
	section "Validate Dokploy services"
	wait_for_service dokploy-postgres "$DOKPLOY_HEALTH_ATTEMPTS" || {
		warn "PostgreSQL service did not reach running state"
		return 1
	}
	wait_for_service dokploy "$DOKPLOY_HEALTH_ATTEMPTS" || {
		warn "Dokploy service did not reach running state"
		return 1
	}
	local postgres_container dokploy_mounts postgres_mounts networks postgres_networks
	postgres_container=$(docker ps --filter name=dokploy-postgres --filter status=running --format '{{.ID}}' | head -n1)
	[[ -n "$postgres_container" ]] || return 1
	docker exec "$postgres_container" pg_isready -U dokploy -d dokploy >/dev/null || {
		warn "PostgreSQL is not accepting connections"
		return 1
	}
	wait_for_http "http://127.0.0.1:$DOKPLOY_APP_PORT" "$DOKPLOY_HEALTH_ATTEMPTS" || {
		warn "Dokploy application endpoint did not respond"
		return 1
	}
	check_restart_loops dokploy || {
		warn "Dokploy has failed or restarting tasks"
		return 1
	}
	check_restart_loops dokploy-postgres || {
		warn "PostgreSQL has failed or restarting tasks"
		return 1
	}
	dokploy_mounts=$(docker service inspect --format '{{json .Spec.TaskTemplate.ContainerSpec.Mounts}}' dokploy)
	[[ "$dokploy_mounts" == *"$DOKPLOY_DATA_DIR"* && "$dokploy_mounts" == *docker.sock* ]] || {
		warn "Required Dokploy mounts are missing"
		return 1
	}
	postgres_mounts=$(docker service inspect --format '{{json .Spec.TaskTemplate.ContainerSpec.Mounts}}' dokploy-postgres)
	[[ "$postgres_mounts" == *dokploy-postgres* && "$postgres_mounts" == */var/lib/postgresql/data* ]] || {
		warn "Required PostgreSQL persistent volume mount is missing"
		return 1
	}
	networks=$(docker service inspect --format '{{json .Spec.TaskTemplate.Networks}}' dokploy)
	[[ "$networks" == *"$(docker network inspect --format '{{.Id}}' "$DOKPLOY_NETWORK_NAME")"* ]] || {
		warn "Dokploy is not attached to $DOKPLOY_NETWORK_NAME"
		return 1
	}
	postgres_networks=$(docker service inspect --format '{{json .Spec.TaskTemplate.Networks}}' dokploy-postgres)
	[[ "$postgres_networks" == *"$(docker network inspect --format '{{.Id}}' "$DOKPLOY_NETWORK_NAME")"* ]] || {
		warn "PostgreSQL is not attached to $DOKPLOY_NETWORK_NAME"
		return 1
	}
	if [[ "$DOKPLOY_SKIP_TRAEFIK" == "0" ]]; then
		[[ "$(docker inspect -f '{{.State.Running}}' dokploy-traefik 2>/dev/null)" == "true" ]] || {
			warn "Traefik is not running"
			return 1
		}
		docker inspect --format '{{json .NetworkSettings.Networks}}' dokploy-traefik | grep -Fq "\"$DOKPLOY_NETWORK_NAME\"" || {
			warn "Traefik is not attached to $DOKPLOY_NETWORK_NAME"
			return 1
		}
		curl --silent --show-error --max-time 5 "http://127.0.0.1:$DOKPLOY_HTTP_PORT" >/dev/null 2>&1 || warn "Traefik HTTP entrypoint is running but no default route responded (expected before domain configuration)"
		if [[ -n "$DOKPLOY_DOMAIN" ]]; then
			curl --fail --silent --show-error --max-time 10 --resolve "$DOKPLOY_DOMAIN:$DOKPLOY_HTTPS_PORT:127.0.0.1" \
				"https://$DOKPLOY_DOMAIN:$DOKPLOY_HTTPS_PORT" >/dev/null || {
				warn "Configured HTTPS domain did not pass certificate/routing validation"
				return 1
			}
		fi
	fi
	if ((DOKPLOY_STABILIZATION_SECONDS > 0)); then
		log "Observing service stability for ${DOKPLOY_STABILIZATION_SECONDS}s"
		sleep "$DOKPLOY_STABILIZATION_SECONDS"
		if ! service_running dokploy || ! service_running dokploy-postgres; then
			warn "Services became unhealthy during stabilization"
			return 1
		fi
		check_restart_loops dokploy || return 1
	fi
	ok "Expected containers, database, endpoint, mounts, networks, and stability checks passed"
	return 0
}

write_state_metadata() {
	CURRENT_PHASE="installation finalization"
	local temporary="$TMP_DIR/installer-state.env"
	printf 'DOKPLOY_INSTALLED_VERSION=%s\nDOKPLOY_IMAGE=%s\nINSTALLED_AT=%s\nINSTALLER_VERSION=%s\n' \
		"$TARGET_VERSION" "$TARGET_IMAGE_DIGEST" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$INSTALLER_VERSION" >"$temporary"
	chmod 0600 "$temporary"
	install -m 0600 "$temporary" "$DOKPLOY_DATA_DIR/installer-state.env.new"
	mv -f "$DOKPLOY_DATA_DIR/installer-state.env.new" "$DOKPLOY_DATA_DIR/installer-state.env"
}

redact_stream() {
	local host_pattern
	host_pattern=$(uname -n 2>/dev/null || true)
	if [[ "$host_pattern" =~ ^[A-Za-z0-9._-]+$ ]]; then
		host_pattern=${host_pattern//./\\.}
	else
		host_pattern='a^'
	fi
	sed -E \
		-e "s/$host_pattern/[HOSTNAME]/g" \
		-e 's/((authorization|proxy-authorization|cookie|set-cookie)[[:space:]]*:[[:space:]]*).*/\1[REDACTED]/Ig' \
		-e 's/((password|passwd|token|secret|authorization|cookie|username|email|private[_-]?key)[[:space:]]*[:=][[:space:]]*)[^[:space:]",}]+/\1[REDACTED]/Ig' \
		-e 's#(postgres(ql)?://)[^/@[:space:]]+@#\1[REDACTED]@#Ig' \
		-e 's/(Bearer[[:space:]]+)[A-Za-z0-9._~+\/-]+/\1[REDACTED]/Ig' \
		-e '/-----BEGIN ([A-Z ]+ )?PRIVATE KEY-----/,/-----END ([A-Z ]+ )?PRIVATE KEY-----/c\[PRIVATE KEY REDACTED]'
}

# Build an opt-out support bundle containing host/Docker/Dokploy status only.
# Application environment variables and non-Dokploy workload logs are excluded.
generate_diagnostics_bundle() {
	[[ -n "$DOKPLOY_LOG_DIR" && -d "$DOKPLOY_LOG_DIR" ]] || return 0
	local stamp diagnostics_dir output file
	stamp=$(date -u +%Y%m%dT%H%M%SZ)
	diagnostics_dir=$(mktemp -d "${TMPDIR:-/tmp}/dokploy-diagnostics.XXXXXX")
	output="$DOKPLOY_LOG_DIR/diagnostics-$stamp.tar.gz"
	{
		printf 'installer=%s\nphase=%s\ninstalled=%s\ntarget=%s\nstate=%s\nrollback=%s\n' "$INSTALLER_VERSION" "$CURRENT_PHASE" "$INSTALLED_VERSION" "$TARGET_VERSION" "$INSTALLATION_STATE" "$ROLLBACK_RESULT"
		uname -a
		[[ -r /etc/os-release ]] && sed -n '1,40p' /etc/os-release
		cat /proc/meminfo
		df -hT
		df -hi
		ss -ltnp 2>&1
	} >"$diagnostics_dir/host.txt" 2>&1
	if command_exists docker; then
		{
			docker version
			docker compose version
			docker info
			docker service ls
			docker service ps --no-trunc dokploy
			docker service ps --no-trunc dokploy-postgres
			docker ps -a --filter name=dokploy --format '{{json .}}'
			docker network ls
		} >"$diagnostics_dir/docker.txt" 2>&1 || true
		docker service logs --tail 200 --timestamps dokploy >"$diagnostics_dir/dokploy.log" 2>&1 || true
		docker service logs --tail 200 --timestamps dokploy-postgres >"$diagnostics_dir/postgres.log" 2>&1 || true
		docker logs --tail 200 --timestamps dokploy-traefik >"$diagnostics_dir/traefik.log" 2>&1 || true
	fi
	if command_exists systemctl; then systemctl status docker --no-pager >"$diagnostics_dir/docker-systemd.txt" 2>&1 || true; fi
	if command_exists journalctl; then journalctl -u docker --since '-30 minutes' --no-pager -n 300 >"$diagnostics_dir/docker-journal.txt" 2>&1 || true; fi
	[[ -n "$LOG_FILE" && -f "$LOG_FILE" ]] && cp "$LOG_FILE" "$diagnostics_dir/installer.log"
	for file in "$diagnostics_dir"/*; do
		[[ -f "$file" ]] || continue
		redact_stream <"$file" >"$file.redacted"
		mv -f "$file.redacted" "$file"
		chmod 0600 "$file"
	done
	tar -czf "$output" -C "$diagnostics_dir" .
	chmod 0600 "$output"
	rm -rf -- "$diagnostics_dir"
	DIAGNOSTICS_FILE="$output"
}

# Remove only containers, services, secrets, and networks positively tracked as
# created by a failed install/repair. Persistent volumes and data are untouched.
cleanup_partial_install() {
	[[ "$SELECTED_ACTION" == "install" || "$SELECTED_ACTION" == "repair" ]] || return 0
	if ((CREATED_TRAEFIK_CONTAINER == 1)); then docker rm -f dokploy-traefik >/dev/null 2>&1 || true; fi
	if ((CREATED_DOKPLOY_SERVICE == 1)); then docker service rm dokploy >/dev/null 2>&1 || true; fi
	if ((CREATED_POSTGRES_SERVICE == 1)); then docker service rm dokploy-postgres >/dev/null 2>&1 || true; fi
	local attempt
	for ((attempt = 1; attempt <= 5; attempt++)); do
		if ! has_service dokploy && ! has_service dokploy-postgres; then break; fi
		sleep 1
	done
	if ((CREATED_POSTGRES_SECRET == 1)); then docker secret rm dokploy_postgres_password >/dev/null 2>&1 || true; fi
	if ((CREATED_AUTH_SECRET == 1)); then docker secret rm dokploy_auth_secret >/dev/null 2>&1 || true; fi
	if ((CREATED_NETWORK == 1)); then
		for ((attempt = 1; attempt <= 5; attempt++)); do
			docker network rm "$DOKPLOY_NETWORK_NAME" >/dev/null 2>&1 && break
			sleep 1
		done
	fi
	ROLLBACK_RESULT="partial resources and secrets created by this run were removed; persistent volumes and data were preserved"
}

format_ip_for_url() {
	local address="$1"
	if [[ "$address" == *:* ]]; then printf '[%s]' "$address"; else printf '%s' "$address"; fi
}

# Persist atomic installation metadata after health succeeds and print access,
# elapsed-time, log, and security guidance. Healthy no-op reruns do not rewrite it.
finalize_installation() {
	[[ -n "$TARGET_IMAGE_DIGEST" ]] || TARGET_IMAGE_DIGEST="$INSTALLED_IMAGE"
	if [[ "$SELECTED_ACTION" != "validate" ]]; then
		write_state_metadata
	fi
	INSTALL_SUCCEEDED=1
	local elapsed address
	elapsed=$(($(date +%s) - START_EPOCH))
	address=${DOKPLOY_ADVERTISE_ADDR:-$(get_public_ip || printf 'SERVER_IP')}
	section "Installation complete"
	printf '%sDokploy installation completed successfully.%s\n' "$COLOR_GREEN" "$COLOR_RESET"
	printf 'Version: %s\nAccess: http://%s:%s\nElapsed time: %ss\nLog: %s\n' \
		"$TARGET_VERSION" "$(format_ip_for_url "$address")" "$DOKPLOY_APP_PORT" "$elapsed" "$LOG_FILE"
	printf 'Security: create the first administrator immediately, configure DNS/HTTPS, and retain the backup/log in a protected location.\n'
}

# Orchestrate initialization, lock/log setup, preflight/state/action selection,
# mutation, validation, recovery traps, and final reporting.
main() {
	if [[ "${1:-}" == "update" && "$DOKPLOY_INSTALL_ACTION" == "auto" ]]; then DOKPLOY_INSTALL_ACTION="upgrade"; fi
	if [[ ! -t 0 || ! -t 1 ]]; then DOKPLOY_NONINTERACTIVE=1; fi
	validate_configuration
	configure_logging
	enable_debug_trace
	trap 'on_error "$LINENO"' ERR
	trap cleanup EXIT
	trap on_signal INT TERM
	if [[ "$DOKPLOY_INSTALL_ACTION" != "check" ]]; then
		TMP_DIR=$(mktemp -d "${TMPDIR:-/tmp}/dokploy-installer.XXXXXX")
		chmod 0700 "$TMP_DIR"
	fi
	acquire_lock
	log "Dokploy installer $INSTALLER_VERSION started; requested version=$DOKPLOY_VERSION action=$DOKPLOY_INSTALL_ACTION"
	run_preflight
	resolve_target_version
	determine_installation_state
	classify_upgrade
	check_ports
	select_action
	print_preflight_report
	if [[ "$SELECTED_ACTION" == "check" ]]; then
		print_dry_run_actions
		CURRENT_PHASE="preflight result"
		((PREFLIGHT_FAILURES == 0)) || error "Preflight found $PREFLIGHT_FAILURES blocking problem(s); no changes were made"
		INSTALL_SUCCEEDED=1
		return 0
	fi
	CURRENT_PHASE="preflight result"
	((PREFLIGHT_FAILURES == 0)) || error "Preflight found $PREFLIGHT_FAILURES blocking problem(s); no installation changes were made"
	case "$SELECTED_ACTION" in
		install) apply_fresh_install ;;
		upgrade) upgrade_dokploy ;;
		repair) repair_installation ;;
		validate) log "Requested version is already installed; validating without changing resources" ;;
		*) error "No safe action was selected" ;;
	esac
	if [[ "$SELECTED_ACTION" != "upgrade" ]]; then validate_services || error "Dokploy services failed post-install health validation"; fi
	finalize_installation
}

if [[ "${BASH_SOURCE[0]}" == "$0" ]]; then
	main "$@"
fi

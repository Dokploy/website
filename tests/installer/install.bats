#!/usr/bin/env bats

setup() {
	REPO_ROOT="$(cd "$BATS_TEST_DIRNAME/../.." && pwd)"
	INSTALLER="$REPO_ROOT/apps/website/public/install.sh"
}

@test "installer has valid Bash syntax" {
	run bash -n "$INSTALLER"
	[ "$status" -eq 0 ]
}

@test "port validation accepts only the TCP/UDP port range" {
	run bash -c 'source "$1"; validate_port 1; validate_port 443; validate_port 65535' _ "$INSTALLER"
	[ "$status" -eq 0 ]

	for value in 0 65536 abc '80;id' ''; do
		run bash -c 'source "$1"; validate_port "$2"' _ "$INSTALLER" "$value"
		[ "$status" -ne 0 ]
	done
}

@test "version validation rejects command and URL input" {
	run bash -c 'source "$1"; validate_version v0.29.13; validate_version 0.29.13; validate_version latest; validate_version canary' _ "$INSTALLER"
	[ "$status" -eq 0 ]

	for value in 'latest;id' 'https://example.com/image' "\$(id)" 'v1'; do
		run bash -c 'source "$1"; validate_version "$2"' _ "$INSTALLER" "$value"
		[ "$status" -ne 0 ]
	done
}

@test "version comparison and upgrade classification are deterministic" {
	run bash -c '
		source "$1"
		printf "%s " "$(version_compare v0.29.1 v0.29.2)"
		printf "%s " "$(version_compare v0.29.2 v0.29.1)"
		printf "%s\n" "$(version_compare v0.29.2 v0.29.2)"
		INSTALLED_VERSION=v0.29.1 TARGET_VERSION=v0.29.2 classify_upgrade
		printf "%s %s\n" "$UPGRADE_TYPE" "$ROLLBACK_SUPPORTED"
		INSTALLED_VERSION=v0.29.2 TARGET_VERSION=v0.30.0 classify_upgrade
		printf "%s\n" "$UPGRADE_TYPE"
	' _ "$INSTALLER"
	[ "$status" -eq 0 ]
	[ "${lines[0]}" = "older newer equal" ]
	[ "${lines[1]}" = "patch no" ]
	[ "${lines[2]}" = "minor" ]
}

@test "rollback is advertised only for an explicitly database-safe pair" {
	compatibility="$BATS_TEST_TMPDIR/rollback-compatible"
	printf '%s\n' 'v0.29.1 v0.29.2 database-safe' >"$compatibility"
	run bash -c '
		source "$1"
		DOKPLOY_ROLLBACK_COMPATIBILITY_FILE="$2"
		INSTALLED_VERSION=v0.29.1 TARGET_VERSION=v0.29.2 classify_upgrade
		printf "%s %s\n" "$UPGRADE_TYPE" "$ROLLBACK_SUPPORTED"
		INSTALLED_VERSION=v0.29.2 TARGET_VERSION=v0.29.3 classify_upgrade
		printf "%s\n" "$ROLLBACK_SUPPORTED"
	' _ "$INSTALLER" "$compatibility"
	[ "$status" -eq 0 ]
	[ "${lines[0]}" = "patch yes" ]
	[ "${lines[1]}" = "no" ]
}

@test "auto action is idempotent for an existing healthy installation" {
	run bash -c '
		source "$1"
		DOKPLOY_INSTALL_ACTION=auto
		INSTALLATION_STATE="Existing healthy install"
		select_action
		printf "%s\n" "$SELECTED_ACTION"
	' _ "$INSTALLER"
	[ "$status" -eq 0 ]
	[ "$output" = "validate" ]
}

@test "fresh state never leaves or replaces an active foreign swarm" {
	run bash -c '
		source "$1"
		DOCKER_DAEMON_AVAILABLE=1
		SWARM_STATE=active
		TARGET_VERSION=v0.29.13
		DOKPLOY_DATA_DIR="$2/nonexistent"
		has_service() { return 1; }
		has_container() { return 1; }
		has_network() { return 1; }
		has_volume() { return 1; }
		determine_installation_state
		printf "%s\n" "$INSTALLATION_STATE"
	' _ "$INSTALLER" "$BATS_TEST_TMPDIR"
	[ "$status" -eq 0 ]
	[ "$output" = "Conflicting installation" ]
}

@test "diagnostic redaction masks credentials and private keys" {
	run bash -c '
		source "$1"
		printf "%s\n" \
			"password=visible token:abc postgres://user:pass@db:5432/dokploy" \
			"Authorization: Bearer abc.def" \
			"-----BEGIN PRIVATE KEY-----" \
			"very-secret-key" \
			"-----END PRIVATE KEY-----" | redact_stream
	' _ "$INSTALLER"
	[ "$status" -eq 0 ]
	[[ "$output" != *visible* ]]
	[[ "$output" != *abc.def* ]]
	[[ "$output" != *user:pass* ]]
	[[ "$output" != *very-secret-key* ]]
	[[ "$output" == *REDACTED* ]]
}

@test "release tags map to the stable application channel without eval" {
	run bash -c '
		source "$1"
		TARGET_VERSION=v0.29.13; printf "%s\n" "$(release_tag_for_version)"
		TARGET_VERSION=canary; printf "%s\n" "$(release_tag_for_version)"
	' _ "$INSTALLER"
	[ "$status" -eq 0 ]
	[ "${lines[0]}" = "latest" ]
	[ "${lines[1]}" = "canary" ]
}

@test "check mode does not create a log, lock, or temporary directory" {
	run bash -c '
		source "$1"
		DOKPLOY_INSTALL_ACTION=check
		DRY_RUN=0
		validate_configuration
		configure_logging
		acquire_lock
		printf "%s|%s\n" "$LOG_FILE" "$TMP_DIR"
	' _ "$INSTALLER"
	[ "$status" -eq 0 ]
	[ "$output" = "check mode: no file created|" ]
}

@test "external proxy integration ignores HTTP and HTTPS ownership only" {
	run bash -c '
		source "$1"
		DOKPLOY_SKIP_TRAEFIK=1
		DOKPLOY_ALLOW_PORT_CONFLICT=0
		DOCKER_DAEMON_AVAILABLE=0
		INSTALLATION_STATE="Fresh install"
		command_exists() { return 0; }
		port_owner() { printf "occupied"; }
		check_ports
		printf "failures=%s\n" "$PREFLIGHT_FAILURES"
	' _ "$INSTALLER"
	[ "$status" -eq 0 ]
	[ "${lines[${#lines[@]} - 1]}" = "failures=1" ]
}

@test "healthy rerun validates without rewriting installation metadata" {
	run bash -c '
		source "$1"
		SELECTED_ACTION=validate
		TARGET_IMAGE_DIGEST=sha256:existing
		DOKPLOY_ADVERTISE_ADDR=127.0.0.1
		START_EPOCH=$(date +%s)
		write_state_metadata() { printf "metadata-written\n"; }
		finalize_installation
	' _ "$INSTALLER"
	[ "$status" -eq 0 ]
	[[ "$output" != *metadata-written* ]]
}

@test "repair refuses to replace a lost password for an existing database" {
	run bash -c '
		source "$1"
		has_volume() { return 0; }
		has_service() { return 1; }
		docker() { return 1; }
		validate_repair_secrets
	' _ "$INSTALLER"
	[ "$status" -eq 1 ]
	[[ "$output" == *"existing dokploy-postgres volume"* ]]
}

@test "failed fresh cleanup removes only resources created by that run" {
	run bash -c '
		source "$1"
		CLEANUP_LOG="$2"
		SELECTED_ACTION=install
		CREATED_TRAEFIK_CONTAINER=1
		CREATED_DOKPLOY_SERVICE=1
		CREATED_POSTGRES_SERVICE=1
		CREATED_NETWORK=1
		CREATED_POSTGRES_SECRET=1
		CREATED_AUTH_SECRET=1
		has_service() { return 1; }
		docker() {
			printf "docker" >>"$CLEANUP_LOG"
			printf " %s" "$@" >>"$CLEANUP_LOG"
			printf "\n" >>"$CLEANUP_LOG"
		}
		cleanup_partial_install
		cat "$CLEANUP_LOG"
	' _ "$INSTALLER" "$BATS_TEST_TMPDIR/cleanup.log"
	[ "$status" -eq 0 ]
	[[ "$output" == *"service rm dokploy"* ]]
	[[ "$output" == *"network rm"* ]]
	[[ "$output" != *"volume rm"* ]]
	[[ "$output" == *"secret rm dokploy_postgres_password"* ]]
}

@test "declared-safe rollback restores the previous image and release channel" {
	backup="$BATS_TEST_TMPDIR/backup"
	mkdir -p "$backup"
	printf '%s\n' 'dokploy/dokploy:v0.29.1@sha256:previous' >"$backup/previous-image"
	printf '%s\n' 'latest' >"$backup/previous-release-tag"
	run bash -c '
		source "$1"
		BACKUP_PATH="$2"
		ROLLBACK_SUPPORTED=yes
		INSTALLED_VERSION=v0.29.1
		TARGET_VERSION=v0.29.2
		docker() {
			if [[ "${1:-}" == service && "${2:-}" == inspect ]]; then printf "RELEASE_TAG=canary\n"; fi
			return 0
		}
		validate_services() { return 0; }
		attempt_rollback
		printf "%s\n" "$ROLLBACK_RESULT"
	' _ "$INSTALLER" "$backup"
	[ "$status" -eq 0 ]
	[[ "$output" == *"previous image restored and healthy"* ]]
}

@test "undeclared migration path never attempts an unsafe rollback" {
	run bash -c '
		source "$1"
		ROLLBACK_SUPPORTED=no
		INSTALLED_VERSION=v0.28.0
		TARGET_VERSION=v0.29.0
		BACKUP_PATH=/protected/backup
		docker() { printf "docker-must-not-run\n"; }
		attempt_rollback
	' _ "$INSTALLER"
	[ "$status" -ne 0 ]
	[[ "$output" != *docker-must-not-run* ]]
	[[ "$output" == *"not declared database-safe"* ]]
}

@test "resource preflight distinguishes hard minimums from recommendations" {
	run bash -c '
		source "$1"
		MEMORY_MB=512
		SWAP_MB=0
		INSTALL_FREE_MB=100
		BACKUP_FREE_MB=100
		TMP_FREE_MB=100
		check_resource_thresholds
		printf "failures=%s\n" "$PREFLIGHT_FAILURES"
	' _ "$INSTALLER"
	[ "$status" -eq 0 ]
	[[ "$output" == *"failures=4"* ]]
}

@test "network preflight reports DNS, HTTPS, and registry failures" {
	run bash -c '
		source "$1"
		getent() { return 1; }
		curl() { return 1; }
		ip() { return 1; }
		command_exists() { return 1; }
		check_connectivity
		printf "failures=%s\n" "$PREFLIGHT_FAILURES"
	' _ "$INSTALLER"
	[ "$status" -eq 0 ]
	[[ "$output" == *"failures=3"* ]]
}

@test "Docker validation rejects Snap and rootless installations" {
	run bash -c '
		source "$1"
		command_exists() { return 0; }
		snap() { return 0; }
		docker() {
			if [[ "${1:-}" == --version ]]; then printf "Docker version 24.0.0\n"
			elif [[ "${1:-}" == version ]]; then printf "24.0.0\n"
			elif [[ "${1:-}" == context ]]; then printf "production-remote\n"
			elif [[ "${1:-}" == compose ]]; then printf "2.20.0\n"
			elif [[ "${1:-}" == info && "${2:-}" != --format ]]; then return 0
			elif [[ "${3:-}" == *SecurityOptions* ]]; then printf "[\"name=rootless\"]\n"
			elif [[ "${3:-}" == *OperatingSystem* ]]; then printf "Docker Desktop\n"
			elif [[ "${3:-}" == *DockerRootDir* ]]; then printf "/tmp\n"
			elif [[ "${3:-}" == *LocalNodeState* ]]; then printf "inactive\n"
			elif [[ "${3:-}" == *Driver* ]]; then printf "overlay2\n"
			fi
		}
		detect_docker
	' _ "$INSTALLER"
	[ "$status" -eq 0 ]
	[[ "$output" == *"Docker installed through Snap is unsupported"* ]]
	[[ "$output" == *"Rootless Docker is unsupported"* ]]
	[[ "$output" == *"Docker Desktop is unsupported"* ]]
	[[ "$output" == *"Remote Docker context"* ]]
}

@test "Docker validation rejects Podman aliases" {
	run bash -c '
		source "$1"
		command_exists() { return 0; }
		snap() { return 1; }
		docker() {
			if [[ "${1:-}" == --version ]]; then printf "podman version 5.0\n"
			elif [[ "${1:-}" == version ]]; then printf "5.0\n"
			elif [[ "${1:-}" == context ]]; then printf "default\n"
			elif [[ "${1:-}" == info ]]; then return 1
			fi
		}
		detect_docker
	' _ "$INSTALLER"
	[ "$status" -eq 0 ]
	[[ "$output" == *"Podman Docker compatibility is unsupported"* ]]
}

@test "host configuration replacement is atomic and backed up" {
	work="$BATS_TEST_TMPDIR/host-config"
	mkdir -p "$work"
	printf '%s\n' old >"$work/target"
	printf '%s\n' new >"$work/source"
	run bash -c '
		source "$1"
		DOKPLOY_BACKUP_DIR="$2/backups"
		install_host_file "$2/source" "$2/target" 0600
		printf "current="; cat "$2/target"
		printf "backup="; cat "$HOST_CONFIG_BACKUP_PATH/target"
		stat -c "mode=%a" "$2/target"
	' _ "$INSTALLER" "$work"
	[ "$status" -eq 0 ]
	[[ "$output" == *"current=new"* ]]
	[[ "$output" == *"backup=old"* ]]
	[[ "$output" == *"mode=600"* ]]
}

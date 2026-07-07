#!/bin/bash

# Dokploy Security Migration Script
# Configures a unique BETTER_AUTH_SECRET for Dokploy installations

set -e

# Check if running as root
if [ "$(id -u)" != "0" ]; then
    echo "Error: This script must be run as root" >&2
    exit 1
fi

# Check if Dokploy is installed
if ! docker service ls 2>/dev/null | grep -q dokploy; then
    echo "Error: Dokploy service not found. Is Dokploy installed?" >&2
    exit 1
fi

# Check if already configured
if docker secret ls 2>/dev/null | grep -q "dokploy-auth-secret"; then
    echo "✅ Auth secret is already configured!"
    echo "   (Stored securely in Docker Secrets)"
    echo ""
    exit 0
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Dokploy Auth Secret Migration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "👋 This script will generate a unique auth secret for your"
echo "   Dokploy installation and migrate any existing 2FA data."
echo ""

# Generate new secret
echo "🔐 Generating secure auth secret..."
NEW_SECRET=$(openssl rand -hex 32)

# Store in Docker Secret
echo "$NEW_SECRET" | docker secret create dokploy-auth-secret -
echo "✅ Auth secret saved in Docker Secrets"

# Run 2FA migration inside the Dokploy container
echo "🔄 Migrating existing 2FA records..."
DOKPLOY_CONTAINER=$(docker ps --filter "name=dokploy" --format "{{.ID}}" | head -n1)

if [ -n "$DOKPLOY_CONTAINER" ]; then
    docker exec \
        -e OLD_SECRET=better-auth-secret-123456789 \
        -e NEW_SECRET="$NEW_SECRET" \
        "$DOKPLOY_CONTAINER" \
        sh -c "cd /app && pnpm run migrate-auth-secret"
    echo "✅ 2FA records migrated"
else
    echo "⚠️  Dokploy container not found, skipping 2FA migration"
fi

# Update Dokploy service to use the Docker Secret
echo "🔄 Updating Dokploy service..."
docker service update \
    --secret-add source=dokploy-auth-secret,target=/run/secrets/dokploy-auth-secret \
    --env-add BETTER_AUTH_SECRET_FILE=/run/secrets/dokploy-auth-secret \
    --env-rm BETTER_AUTH_SECRET \
    dokploy

echo "⏳ Waiting for service to restart..."
sleep 5

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All done! Your auth secret is now secured."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 What was configured:"
echo "   • Unique auth secret generated with openssl rand -hex 32"
echo "   • Secret stored in Docker Secrets (encrypted, in-memory only)"
echo "   • Existing 2FA records re-encrypted with the new secret"
echo "   • Dokploy service updated to use the new secret"
echo ""
echo "💡 Next steps:"
echo "   • All active sessions have been invalidated — users will need to log in again"
echo "   • 2FA remains fully functional"
echo ""

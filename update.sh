#!/bin/bash
# Frontend Testing Skill Updater
# Usage: ./update.sh /path/to/project

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_SRC="$SCRIPT_DIR/plugin/frontend-testing"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

if [ -z "$1" ]; then
    echo -e "${RED}Error: Please specify target project path${NC}"
    echo "Usage: $0 /path/to/target/project"
    exit 1
fi

TARGET_DIR="$1"
CLAUDE_DIR="$TARGET_DIR/.claude"

if [ ! -d "$CLAUDE_DIR/skills/frontend-testing" ]; then
    echo -e "${RED}Error: Testing skill not installed at $TARGET_DIR${NC}"
    echo "Run install-local.sh first"
    exit 1
fi

# Check versions
CURRENT_VERSION=""
NEW_VERSION=""

if [ -f "$CLAUDE_DIR/skills/frontend-testing/VERSION" ]; then
    CURRENT_VERSION=$(cat "$CLAUDE_DIR/skills/frontend-testing/VERSION")
fi

if [ -f "$PLUGIN_SRC/VERSION" ]; then
    NEW_VERSION=$(cat "$PLUGIN_SRC/VERSION")
fi

echo -e "${BLUE}Frontend Testing Skill Updater${NC}"
echo "  Current version: ${CURRENT_VERSION:-unknown}"
echo "  New version: ${NEW_VERSION:-unknown}"
echo ""

if [ "$CURRENT_VERSION" = "$NEW_VERSION" ]; then
    echo -e "${YELLOW}Already at latest version ($CURRENT_VERSION)${NC}"
    read -p "Force update anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
fi

echo -e "${GREEN}Updating skill...${NC}"

# Backup config.toml if user has customized it
if [ -f "$CLAUDE_DIR/skills/frontend-testing/config.toml" ]; then
    cp "$CLAUDE_DIR/skills/frontend-testing/config.toml" "$CLAUDE_DIR/skills/frontend-testing/config.toml.backup"
    echo -e "  ${YELLOW}✓${NC} Backed up config.toml"
fi

# Update agents
if [ -d "$PLUGIN_SRC/agents" ]; then
    cp -r "$PLUGIN_SRC/agents/"* "$CLAUDE_DIR/agents/" 2>/dev/null || true
    echo -e "  ${GREEN}✓${NC} Agents updated"
fi

# Update commands
if [ -d "$PLUGIN_SRC/commands" ]; then
    cp -r "$PLUGIN_SRC/commands/"* "$CLAUDE_DIR/commands/" 2>/dev/null || true
    echo -e "  ${GREEN}✓${NC} Commands updated"
fi

# Update skills (but preserve user's config.toml)
if [ -d "$PLUGIN_SRC/skills/frontend-testing" ]; then
    # Copy everything except config.toml
    for file in "$PLUGIN_SRC/skills/frontend-testing/"*; do
        filename=$(basename "$file")
        if [ "$filename" != "config.toml" ]; then
            cp -r "$file" "$CLAUDE_DIR/skills/frontend-testing/" 2>/dev/null || true
        fi
    done
    echo -e "  ${GREEN}✓${NC} Skill documentation updated"
fi

# Copy VERSION file
if [ -f "$PLUGIN_SRC/VERSION" ]; then
    cp "$PLUGIN_SRC/VERSION" "$CLAUDE_DIR/skills/frontend-testing/VERSION"
fi

echo ""
echo -e "${GREEN}✅ Updated to version ${NEW_VERSION:-latest}!${NC}"
echo ""
echo "Note: Your config.toml was preserved. Backup at config.toml.backup"
echo ""

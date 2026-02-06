#!/bin/bash
# Frontend Testing Skill Local Installer
# Usage: ./install-local.sh /path/to/target/project

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_SRC="$SCRIPT_DIR/plugin/frontend-testing"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

if [ -z "$1" ]; then
    echo -e "${RED}Error: Please specify target project path${NC}"
    echo "Usage: $0 /path/to/target/project"
    exit 1
fi

TARGET_DIR="$1"

if [ ! -d "$TARGET_DIR" ]; then
    echo -e "${RED}Error: Target directory does not exist: $TARGET_DIR${NC}"
    exit 1
fi

CLAUDE_DIR="$TARGET_DIR/.claude"

echo -e "${GREEN}Installing Frontend Testing Skill to: $TARGET_DIR${NC}"

# Create .claude directory structure if it doesn't exist
mkdir -p "$CLAUDE_DIR/agents"
mkdir -p "$CLAUDE_DIR/commands"
mkdir -p "$CLAUDE_DIR/skills/frontend-testing"

# Copy agents
if [ -d "$PLUGIN_SRC/agents" ]; then
    cp -r "$PLUGIN_SRC/agents/"* "$CLAUDE_DIR/agents/" 2>/dev/null || true
    echo -e "  ${GREEN}✓${NC} Agents installed"
fi

# Copy commands
if [ -d "$PLUGIN_SRC/commands" ]; then
    cp -r "$PLUGIN_SRC/commands/"* "$CLAUDE_DIR/commands/" 2>/dev/null || true
    echo -e "  ${GREEN}✓${NC} Commands installed"
fi

# Copy skills
if [ -d "$PLUGIN_SRC/skills/frontend-testing" ]; then
    cp -r "$PLUGIN_SRC/skills/frontend-testing/"* "$CLAUDE_DIR/skills/frontend-testing/" 2>/dev/null || true
    echo -e "  ${GREEN}✓${NC} Skill documentation installed"
fi

# Copy VERSION file
if [ -f "$PLUGIN_SRC/VERSION" ]; then
    cp "$PLUGIN_SRC/VERSION" "$CLAUDE_DIR/skills/frontend-testing/VERSION"
    echo -e "  ${GREEN}✓${NC} Version: $(cat $PLUGIN_SRC/VERSION)"
fi

echo ""
echo -e "${GREEN}✅ Frontend Testing Skill installed successfully!${NC}"
echo ""
echo "Installed to: $CLAUDE_DIR"
echo ""
echo "Next steps:"
echo "  1. Edit .claude/skills/frontend-testing/config.toml to configure your project"
echo "  2. Restart Claude Code in the project directory"
echo "  3. Use /frontend-testing skill to access test commands"
echo ""

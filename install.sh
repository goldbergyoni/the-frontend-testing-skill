#!/bin/bash
# Frontend Testing Skill Installer
# Usage: curl -sL https://raw.githubusercontent.com/user/the-frontend-testing-skill/main/install.sh | bash

set -e

SKILL_NAME="frontend-testing"
REPO_URL="https://github.com/user/the-frontend-testing-skill"
BRANCH="${BRANCH:-main}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Installing Frontend Testing Skill...${NC}"

# Determine target directory
if [ -n "$1" ]; then
    TARGET_DIR="$1"
else
    TARGET_DIR="."
fi

CLAUDE_DIR="$TARGET_DIR/.claude"

# Create .claude directory structure if it doesn't exist
mkdir -p "$CLAUDE_DIR/agents"
mkdir -p "$CLAUDE_DIR/commands"
mkdir -p "$CLAUDE_DIR/skills/testing"

# Download and extract the plugin
echo -e "${YELLOW}Downloading skill files...${NC}"

# Create temp directory
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Clone the repo (shallow clone for speed)
git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$TEMP_DIR/repo" 2>/dev/null || {
    echo -e "${RED}Failed to clone repository. Trying alternative method...${NC}"
    # Fallback: download as archive
    curl -sL "$REPO_URL/archive/$BRANCH.tar.gz" | tar xz -C "$TEMP_DIR"
    mv "$TEMP_DIR"/the-frontend-testing-skill-* "$TEMP_DIR/repo"
}

PLUGIN_SRC="$TEMP_DIR/repo/plugin/frontend-testing"

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
if [ -d "$PLUGIN_SRC/skills/testing" ]; then
    cp -r "$PLUGIN_SRC/skills/testing/"* "$CLAUDE_DIR/skills/testing/" 2>/dev/null || true
    echo -e "  ${GREEN}✓${NC} Skill documentation installed"
fi

echo ""
echo -e "${GREEN}✅ Frontend Testing Skill installed successfully!${NC}"
echo ""
echo "Next steps:"
echo "  1. Edit .claude/skills/testing/config.toml to configure your project"
echo "  2. Run /testskill.init in Claude Code to complete setup"
echo "  3. Start writing tests with /testskill.write-test <page-name>"
echo ""

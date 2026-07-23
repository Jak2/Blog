#!/usr/bin/env bash
# Installs deps at an ext4-backed node_modules store instead of this
# NTFS-mounted project dir, then symlinks node_modules to it.
# See NODE_MODULES_NTFS_FIX.md for why. Every step checks first, no-ops
# if already done.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Default store path (Linux/WSL). Override with STORE_DIR for other setups
# (e.g. native Windows: STORE_DIR=/c/Users/you/node_modules-stores/Blog).
STORE_DIR="${STORE_DIR:-/home/asterisk/.local/share/node_modules-stores/Blog}"
STORE_NM="$STORE_DIR/node_modules"

# 1. store dir + its node_modules subdir (name matters: Node's resolver
#    needs an ancestor literally named "node_modules")
if [ ! -d "$STORE_NM" ]; then
  mkdir -p "$STORE_NM"
  echo "Created $STORE_NM"
fi

# 2. copy manifest files, only if changed (avoids needless npm i)
need_install=0
for f in package.json package-lock.json; do
  if ! cmp -s "$SCRIPT_DIR/$f" "$STORE_DIR/$f" 2>/dev/null; then
    cp "$SCRIPT_DIR/$f" "$STORE_DIR/$f"
    need_install=1
  fi
done

# 3. install, only if manifests changed or store has no packages yet
if [ "$need_install" -eq 1 ] || [ -z "$(ls -A "$STORE_NM" 2>/dev/null)" ]; then
  ( cd "$STORE_DIR" && npm i )
else
  echo "Dependencies already up to date in $STORE_DIR"
fi

# 4. approve any pending install scripts (esbuild/sharp native binaries) —
#    no-op if nothing pending
pending="$(cd "$STORE_DIR" && npm approve-scripts --allow-scripts-pending 2>&1 || true)"
if echo "$pending" | grep -q "not yet covered"; then
  echo "$pending" | grep -oE '^  [A-Za-z0-9@/_.-]+' | sed 's/@[^@]*$//' | sort -u | while read -r pkg; do
    ( cd "$STORE_DIR" && npm approve-scripts "$pkg" ) || true
  done
  cp "$STORE_DIR/package.json" "$SCRIPT_DIR/package.json"
  ( cd "$STORE_DIR" && npm i )
fi

# 5. symlink, only if missing or pointing elsewhere
if [ ! -L "$SCRIPT_DIR/node_modules" ] || [ "$(readlink "$SCRIPT_DIR/node_modules")" != "$STORE_NM" ]; then
  rm -rf "$SCRIPT_DIR/node_modules"
  ln -sfn "$STORE_NM" "$SCRIPT_DIR/node_modules"
  echo "Linked node_modules -> $STORE_NM"
else
  echo "node_modules symlink already correct"
fi

echo "Done. node_modules -> $STORE_NM"

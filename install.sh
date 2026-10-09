#!/usr/bin/env bash
set -euo pipefail

repository_url="https://github.com/LeSauvage/oh-my-pi.git"
submodule_path="${1:-.omp}"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  printf 'Run this installer from the target Git repository.\n' >&2
  exit 1
fi

if [ -e "$submodule_path" ]; then
  printf 'Refusing to replace existing path: %s\n' "$submodule_path" >&2
  exit 1
fi

git submodule add "$repository_url" "$submodule_path"

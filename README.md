# Oh My Pi configuration

Reusable project-level configuration for [Oh My Pi](https://github.com/can1357/oh-my-pi): hooks, model roles, and future plugins.

## Install

Run from the root of the Git repository that should use this configuration:

```sh
curl -fsSL https://raw.githubusercontent.com/LeSauvage/oh-my-pi/master/install.sh | bash
```

The installer adds this repository as the `.omp` submodule. Pass a path to install it elsewhere:

```sh
curl -fsSL https://raw.githubusercontent.com/LeSauvage/oh-my-pi/master/install.sh | bash -s -- .oh-my-pi
```

## Contents

| Path | Purpose |
| --- | --- |
| `config.yml` | Hub model-role configuration. |
| `hooks/pre/force-push.ts` | Blocks `git push` commands using `--force`, `--force-with-lease`, or `-f`. |
| `hooks/pre/env-file-mask.ts` | Redacts values and comments from OMP `read` results for `.env` and `.env.*` files. |
| `install.sh` | Installs this repository as a Git submodule. |

OMP discovers the hooks when this repository is installed at `.omp`. Add plugins under `plugins/` and load them with `omp --plugin-dir .omp/plugins`.

## Update

```sh
git submodule update --remote .omp
git add .omp
git commit -m "chore: update Oh My Pi configuration"
```

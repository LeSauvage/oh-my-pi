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

## Use without committing

The submodule installer records its installation in the target repository. To use these hooks locally without staged or committed project changes, clone the configuration once and symlink it into each target repository:

```sh
git clone https://github.com/LeSauvage/oh-my-pi.git ~/.local/share/oh-my-pi

cd /path/to/another-repo
ln -s ~/.local/share/oh-my-pi .omp
printf '/.omp\n' >> .git/info/exclude
```

OMP discovers the hooks through the local `.omp` symlink. `.git/info/exclude` is local Git metadata, so the link is never committed. Update the shared checkout with:

```sh
git -C ~/.local/share/oh-my-pi pull --ff-only
```

For every OMP project, install it at the user-level discovery path instead:

```sh
git clone https://github.com/LeSauvage/oh-my-pi.git ~/.omp/agent
```

For a single OMP invocation without any target-repository filesystem changes:

```sh
omp \
  --hook ~/.local/share/oh-my-pi/hooks/pre/force-push.ts \
  --hook ~/.local/share/oh-my-pi/hooks/pre/env-file-mask.ts
```

If a target repository already has a tracked `.omp/`, do not replace it with the symlink; use the user-level or one-off option.

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

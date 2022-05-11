# Git Commands

## How to sync your fork with original repo

[Syncing a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-from-the-command-line)

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

## How to create a branch

```bash
git checkout -b "<branch-name>"
```

## How to commit the asssignment/activity

```bash
git checkout main
git checkout -b "module-1/activity-1"
git add *
git commit -m "complete activity 1"
git push
```

if `git push` gives you `fatal: The current branch <branch-name> has no upstream branch.`, then run the command suggested in the message. would look like
`git push --set-upstream origin <branch-name>`

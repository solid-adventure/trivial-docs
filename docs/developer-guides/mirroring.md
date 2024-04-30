# Mirroring Repositories

## 1. Mirror the code branch to other repositories

**Setup**

To create an initial remote mirror use:

```
git remote add [ remote name ] [ remote url ]
example: git remote add example git@github.com:example/trivial-api.git
```

**Mirroring a branch**

Ensure you have the latest mirror to rebase onto:
```
git fetch [repo name]
```
Squash all commits into a single commit to mirror:
```
git rebase -i HEAD~N (N = total commits in branch)
```
Rebase the squashed commit onto the correct mirror branch and resolve any conflicts:
```
git rebase --onto [repo name]/develop HEAD~N (N = 1 || number of commits in branch)
```
Push the rebased commit to the mirror repository:
```
git push [repo name] the-branch-you-are-mirroring
```

## 2. Create a Mirror PR, Tag for Review, then Merge when Approved

**Title Formatting:**
- Title the mirror PR with the same name as the branch it mirrors

**Description:**
- Include a link to the original PR in the description for reference <br> `Example: "Mirror of #[PR num]"`

**Important Notes:**
- Add any important notes for local reference, such as specific instructions or considerations for reviewers

**Labels:**
- Label the Mirror PR appropriately based on its purpose or status
- Update the base PRs Labels as needed (e.g., mirrored, not mirrored, etc.) to maintain consistency and clarity

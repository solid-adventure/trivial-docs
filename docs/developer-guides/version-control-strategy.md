---
outline: deep
---

# Version Control Strategy

Maintaining the trivial-api and trivial-ui repositories calls for diligent attention to version control practices. This guide provides an overview of the recommended steps for contributing effectively to these repositories.

## 1. Update main to the latest stable version
```
git pull origin main
```
## 2. Checkout a new branch with a clear name
Branch name schema:
```
[ general code purpose ]/[ specific feature target ] 
```
Ex.
```
git checkout -b fix/invite-email-not-sending
```

## 3. Make your additions and edits 

Make a change, verify the change, then add and commit that change:

```
git add [ file ]
git commit -m 'specific verified change'
```
**Commit Strategy**

- Follow a squashing commit strategy that groups commits by larger ideas as changes are verified. Find a balance of readable commits that group more specific changes into larger ideas

- Avoid mixing whitespace/style and functional changes into a single commit branch. Group all white space changes into a specific commit when they are necessitated

::: warning
COMMIT SQUASHING CANNOT BE REVERTED DO NOT LEAVE TYPO OR FIX COMMITS UNSQUASHED
:::

```
git rebase -i HEAD~N (N = total commits to squash)
```

## 4. Push your changes to the origin repository as needed 
Pushing can be done as necessary to allow for code portability and collaboration

Ex.
```
git push origin feature/contract-function-grouping 
```
However, pushing squashed commits that have previously been pushed will require
force-pushing. Please attempt to minimize this by squashing before pushing commits
```
git push -f origin update/improved-email-templates 
```
## 5. Open a PR titled with the branch name.

- Always provide at least a minimal description of the changes and additions implemented

- Add initial labels for easier parsing

- Leave all PRs as Draft PRs until they are fully finished

- Tag the reviewer and mark PRs when ready for review

## 6. Review the PR 
- All PRs must be reviewed by a non-author reviewer

- Reviews should primarily cover function, edge case precautions, and general code safety

## 7. Implement recommended changes 
Continue to group, reorder, and squash commits from recommended changes

## 8. Make a Final Lint of the reviewed PR 
- Linting should not introduce any functional changes

- Use the recommended linter where applicable

- Ensure that all commits have been properly grouped and squashed

- Aim for a minimal (ideally 1) number of commits which each summerize a functional group of changes

## 9. Make a Final Review of the PR
- This review should be a skim that checks no functional changes were introduced during linting

- Ensure that the PR has a summary description of changes

## 10. Approve and Merge the PR 

## 11. Mirror the code branch to other repositories (optional)

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

## 12. Create a Mirror PR, Tag for Review, then Merge when Approved (optional)

**Title Formatting:**
- Title the mirror PR with the same name as the branch it mirrors

**Description:**
- Include a link to the original PR in the description for reference <br> `Example: "This PR mirrors #[PR num]"`

**Important Notes:**
- Add any important notes for local reference, such as specific instructions or considerations for reviewers

**Labels:**
- Label the Mirror PR appropriately based on its purpose or status
- Update the base PRs Labels as needed (e.g., mirrored, not mirrored, etc.) to maintain consistency and clarity


## Troubleshooting
If you find yourself in a rebase and aborting isn’t sufficient, you can use [reflog](https://stackoverflow.com/a/135614/834094
 ) like an undo.

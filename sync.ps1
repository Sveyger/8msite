param(
  [string]$Message = "chore: sync local changes"
)

$ErrorActionPreference = "Stop"

git add -A

$staged = git diff --cached --name-only
if (-not $staged) {
  Write-Host "No changes to commit."
  exit 0
}

git commit -m $Message
git push origin main

Write-Host "Synced to GitHub."

Write-Host "Staging all files..." -ForegroundColor Cyan
git add .

# Prompt for the commit message
$commitMsg = Read-Host "Enter your commit message"

# Failsafe if you accidentally hit Enter without typing anything
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    Write-Host "[X] Commit message cannot be empty. Aborting." -ForegroundColor Red
    exit
}

Write-Host "Committing changes..." -ForegroundColor Cyan
git commit -m "$commitMsg"

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push

Write-Host "[OK] Code successfully pushed to CampusFix!" -ForegroundColor Green
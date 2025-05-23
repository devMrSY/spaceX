#!/bin/bash

# Define branches
branches=("main" "staging" "development")

# Base branch to commit on
base_branch="${branches[0]}"

# Save original branch
original_branch=$(git symbolic-ref --short HEAD)

# Checkout base branch
git checkout "$base_branch"

# Add and commit changes
git add .
echo "Enter commit message:"
read commit_message
git commit -m "$commit_message"

# Push to base branch
echo "Pushing to $base_branch..."
git push origin "$base_branch"

# Get the last commit hash
last_commit=$(git rev-parse HEAD)

# Apply commit to other branches
for branch in "${branches[@]:1}"
do
  if git rev-parse --verify "$branch" >/dev/null 2>&1; then
    echo "Switching to $branch..."
    git checkout "$branch"

    echo "Attempting cherry-pick..."
    git cherry-pick "$last_commit"

    if [ $? -ne 0 ]; then
      echo "Conflict occurred on branch $branch!"
      echo "Aborting cherry-pick on $branch..."
      git cherry-pick --abort
      echo "You need to manually apply the commit to $branch."
    else
      echo "Cherry-pick successful on $branch."
      echo "Pushing to $branch..."
      git push origin "$branch"
    fi
  else
    echo "Branch $branch does not exist. Skipping."
    continue
  fi
done

# Return to original branch
git checkout "$original_branch"
#
# Wait for user to press enter before closing
echo "Script completed. Press enter to exit..."
read
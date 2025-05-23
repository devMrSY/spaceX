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
      echo "❌ Conflict occurred on branch $branch!"
      echo "📂 Opening VS Code to resolve conflicts..."
      code .

      echo "🛠️ Resolve the conflict in VS Code, then press Enter to continue..."
      read

      echo "Do you want to continue the cherry-pick? (y/n)"
      read continue_cp

      if [ "$continue_cp" = "y" ]; then
        git add .
        git cherry-pick --continue
        echo "✅ Conflict resolved. Cherry-pick continued."
        echo "🔼 Pushing to $branch..."
        git push origin "$branch"
      else
        echo "🚫 Aborting cherry-pick on $branch..."
        git cherry-pick --abort
        echo "‼️ You need to manually apply the commit to $branch later."
      fi
    else
      echo "✅ Cherry-pick successful on $branch."
      echo "🔼 Pushing to $branch..."
      git push origin "$branch"
    fi
  else
    echo "⚠️ Branch $branch does not exist. Skipping."
  fi
done

# Return to original branch
git checkout "$original_branch"

# Wait for user before closing
echo "🎉 Script completed. Press Enter to exit..."
read
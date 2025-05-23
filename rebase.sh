#!/bin/bash

read -p "Enter number of commits to squash into one: " count

if ! [[ "$count" =~ ^[0-9]+$ ]] || [ "$count" -lt 2 ]; then
  echo "Please enter a valid number (2 or more)."
  exit 1
fi

# Get commits oldest to newest (HEAD~count to HEAD)
commits=($(git rev-list --reverse HEAD~$count..HEAD))

if [ ${#commits[@]} -ne $count ]; then
  echo "Could not find the correct number of commits. Exiting."
  exit 1
fi

# Prepare todo file: pick first commit, squash rest
todo_file=$(mktemp)
echo "pick ${commits[0]}" > "$todo_file"
for ((i=1; i<${#commits[@]}; i++)); do
  echo "squash ${commits[i]}" >> "$todo_file"
done

# Run rebase with this todo file non-interactively
GIT_SEQUENCE_EDITOR="cat $todo_file >" git rebase -i HEAD~$count

rm "$todo_file"

# Prompt user for new commit message
echo "Enter new commit message for the combined commit (finish input with Ctrl+D):"
new_message=$(</dev/stdin)

# Amend the commit with the new message
git commit --amend -m "$new_message"

echo "Squash rebase complete with new commit message."

git push --force-with-lease

echo "Force-pushed the changes to the remote repository."

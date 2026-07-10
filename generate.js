const { execSync } = require('child_process');
const fs = require('fs');

// 1. Realistic commit messages
const messages = [
  "Update documentation",
  "Refactor helper functions",
  "Fix typo in comments",
  "Optimize loop performance",
  "Add unit tests for edge cases",
  "Update dependencies",
  "Clean up unused variables",
  "Fix responsive styling issues",
  "Improve error handling",
  "Minor bug fix in data parsing",
  "Merge pull request #42",
  "Update README.md formatting",
  "Fix state management issue"
];

const FILE_TO_MODIFY = 'activity.log';
const NUM_COMMITS = 500;

// Function to get a random date between two dates
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const endDate = new Date(); // Today
const startDate = new Date();
startDate.setFullYear(endDate.getFullYear() - 1); // Spread over the last 1 year

console.log(`Starting to generate ${NUM_COMMITS} commits...`);

for (let i = 0; i < NUM_COMMITS; i++) {
  // 1. Pick a random backdate
  const dateStr = getRandomDate(startDate, endDate).toISOString();
  
  // 2. Modify a file so Git has something to commit
  fs.appendFileSync(FILE_TO_MODIFY, `Activity log entry ${i} - ${dateStr}\n`);
  
  // 3. Stage the file
  execSync(`git add ${FILE_TO_MODIFY}`);
  
  // 4. Pick a random realistic message
  const msg = messages[Math.floor(Math.random() * messages.length)];
  
  // 5. Commit with the forged timestamps
  const env = { ...process.env, GIT_COMMITTER_DATE: dateStr, GIT_AUTHOR_DATE: dateStr };
  
  try {
    execSync(`git commit -m "${msg}" --date="${dateStr}"`, { env });
    console.log(`Created commit ${i + 1}/${NUM_COMMITS} on ${dateStr}`);
  } catch (e) {
    console.error("Failed to commit", e.message);
  }
}

console.log("\nDone! Now run 'git push' to upload these to GitHub.");

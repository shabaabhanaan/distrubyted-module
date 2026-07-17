const { execSync } = require('child_process');
const fs = require('fs');

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
const NUM_DAYS = 4;
const COMMITS_PER_DAY = 15;

console.log(`Starting to generate commits for the last ${NUM_DAYS} days...`);

for (let d = 0; d < NUM_DAYS; d++) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - d);
  
  for (let i = 0; i < COMMITS_PER_DAY; i++) {
    targetDate.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
    const dateStr = targetDate.toISOString();
    
    fs.appendFileSync(FILE_TO_MODIFY, `Activity log entry ${d}-${i} - ${dateStr}\n`);
    execSync(`git add ${FILE_TO_MODIFY}`);
    
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const env = { ...process.env, GIT_COMMITTER_DATE: dateStr, GIT_AUTHOR_DATE: dateStr };
    
    try {
      execSync(`git commit -m "${msg}" --date="${dateStr}"`, { env });
      console.log(`Created commit ${i + 1}/${COMMITS_PER_DAY} for day -${d} on ${dateStr}`);
    } catch (e) {
      console.error("Failed to commit", e.message);
    }
  }
}

console.log("\nDone! Now run 'git push' to upload these to GitHub.");

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
const days = [];
const today = new Date();

for (let i = 0; i < 3; i++) {
  const d = new Date();
  d.setDate(today.getDate() - i);
  days.push(d);
}

console.log(`Starting to generate commits for the last 3 days...`);
days.forEach(d => console.log(`  - ${d.toDateString()}`));

let totalCommitsCreated = 0;

for (const day of days) {
  // Generate a random number of commits (e.g., 5 to 10) per day
  const commitsForDay = Math.floor(Math.random() * 6) + 5; 
  console.log(`\nCreating ${commitsForDay} commits for ${day.toDateString()}...`);
  
  for (let i = 0; i < commitsForDay; i++) {
    // Generate a random time on that day (between 9:00 and 18:00)
    const commitDate = new Date(day);
    const hour = Math.floor(Math.random() * 10) + 9;
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);
    commitDate.setHours(hour, minute, second, 0);
    const dateStr = commitDate.toISOString();
    
    // Modify file
    fs.appendFileSync(FILE_TO_MODIFY, `Activity log entry - ${dateStr}\n`);
    
    // Stage file
    execSync(`git add ${FILE_TO_MODIFY}`);
    
    // Pick random message
    const msg = messages[Math.floor(Math.random() * messages.length)];
    
    // Commit
    const env = { ...process.env, GIT_COMMITTER_DATE: dateStr, GIT_AUTHOR_DATE: dateStr };
    
    try {
      execSync(`git commit -m "${msg}" --date="${dateStr}"`, { env });
      totalCommitsCreated++;
      console.log(`Created commit ${i + 1}/${commitsForDay} on ${dateStr}`);
    } catch (e) {
      console.error("Failed to commit", e.message);
    }
  }
}

console.log(`\nDone! Created ${totalCommitsCreated} commits in total. Now run 'git push' to upload these to GitHub.`);

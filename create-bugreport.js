const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');

const logFilePath = path.join(__dirname, 'npm-error.log');
const bugReportFilePath = path.join(__dirname, 'bugreport.txt');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = 'zarfld';
const repo = 'linuxcnc-vscode-extension';

function createBugReport() {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading log file:', err);
      return;
    }

    const bugReportContent = `
      Bug Report
      ==========
      Date: ${new Date().toISOString()}
      Log Content:
      ------------
      ${data}
    `;

    fs.writeFile(bugReportFilePath, bugReportContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing bug report file:', err);
        return;
      }
      console.log('Bug report created successfully.');

      createGitHubIssue(bugReportContent);
    });
  });
}

function createGitHubIssue(content) {
  octokit.issues.create({
    owner,
    repo,
    title: 'CI Pipeline Error Report',
    body: content,
  }).then((issue) => {
    console.log('GitHub issue created successfully.');
    attachLogFileToIssue(issue.data.number);
  }).catch((err) => {
    console.error('Error creating GitHub issue:', err);
  });
}

function attachLogFileToIssue(issueNumber) {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading log file for attachment:', err);
      return;
    }

    octokit.issues.createComment({
      owner,
      repo,
      issue_number: issueNumber,
      body: `Attaching npm error log file:\n\n\`\`\`\n${data}\n\`\`\``,
    }).then(() => {
      console.log('Log file attached to GitHub issue successfully.');
    }).catch((err) => {
      console.error('Error attaching log file to GitHub issue:', err);
    });
  });
}

createBugReport();

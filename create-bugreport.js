const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'npm-error.log');
const bugReportFilePath = path.join(__dirname, 'bugreport.txt');

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
    });
  });
}

createBugReport();

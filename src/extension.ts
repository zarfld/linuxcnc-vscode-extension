import * as vscode from 'vscode';
import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.compileComp', compileComp),
        vscode.commands.registerCommand('extension.debugComp', debugComp)
    );
}

async function compileComp() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found.');
        return;
    }

    const document = editor.document;
    if (document.languageId !== 'comp') {
        vscode.window.showErrorMessage('The active file is not a .comp file.');
        return;
    }

    const filePath = document.fileName;
    const terminal = vscode.window.createTerminal('halcompile');
    terminal.show();
    terminal.sendText(`halcompile --install ${filePath}`);
}

async function debugComp() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found.');
        return;
    }

    const document = editor.document;
    if (document.languageId !== 'comp') {
        vscode.window.showErrorMessage('The active file is not a .comp file.');
        return;
    }

    const filePath = document.fileName;
    const soFilePath = filePath.replace('.comp', '.so');
    const terminal = vscode.window.createTerminal('halrun');
    terminal.show();
    terminal.sendText(`halrun -I`);
    terminal.sendText(`loadrt ${soFilePath}`);
    terminal.sendText(`start`);
}

export function deactivate() {}

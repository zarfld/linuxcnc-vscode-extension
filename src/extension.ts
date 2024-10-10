import * as vscode from 'vscode';
import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.compileComp', compileComp),
        vscode.commands.registerCommand('extension.debugComp', debugComp),
        vscode.commands.registerCommand('extension.enhancedDebugging', enhancedDebugging),
        vscode.commands.registerCommand('extension.runtimeMonitoring', runtimeMonitoring)
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

    const installOrCompile = await vscode.window.showQuickPick(['--install', '--compile'], {
        placeHolder: 'Choose whether to install or compile the component'
    });

    if (!installOrCompile) {
        vscode.window.showErrorMessage('No option selected.');
        return;
    }

    const realTimeOrUserSpace = await vscode.window.showQuickPick(['--realtime', '--userspace'], {
        placeHolder: 'Choose whether to compile for real-time or userspace'
    });

    if (!realTimeOrUserSpace) {
        vscode.window.showErrorMessage('No option selected.');
        return;
    }

    const terminal = vscode.window.createTerminal('halcompile');
    terminal.show();
    terminal.sendText(`halcompile ${installOrCompile} ${realTimeOrUserSpace} ${filePath}`);

    // Predefined templates for common components
    const templates = {
        basic: `component my_component "A basic HAL component";
pin in bit my_input_pin "An input pin";
pin out bit my_output_pin "An output pin";
function _ "Main function";
license "GPL";
`,
        advanced: `component my_advanced_component "An advanced HAL component";
pin in float my_input_pin "An input pin";
pin out float my_output_pin "An output pin";
param rw float my_param "A parameter";
function _ "Main function";
license "GPL";
`
    };

    const templateChoice = await vscode.window.showQuickPick(Object.keys(templates), {
        placeHolder: 'Choose a template for your component'
    });

    if (templateChoice) {
        const template = templates[templateChoice];
        const edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, new vscode.Position(0, 0), template);
        await vscode.workspace.applyEdit(edit);
    }

    // Syntax validation and error highlighting
    const diagnostics: vscode.Diagnostic[] = [];
    const text = document.getText();
    const lines = text.split('\n');

    lines.forEach((line, i) => {
        if (line.includes('pin') && !line.match(/pin (in|out) (bit|float|s32|u32) \w+/)) {
            diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, line.length)),
                'Invalid pin definition',
                vscode.DiagnosticSeverity.Error
            ));
        }
        if (line.includes('param') && !line.match(/param (rw|ro) (bit|float|s32|u32) \w+/)) {
            diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, line.length)),
                'Invalid parameter definition',
                vscode.DiagnosticSeverity.Error
            ));
        }
        if (line.includes('option') && !line.match(/option (userspace|no_auto_bind)/)) {
            diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, line.length)),
                'Invalid option directive',
                vscode.DiagnosticSeverity.Error
            ));
        }
        if (line.includes('#ifdef') || line.includes('#ifndef')) {
            if (!line.match(/#ifdef \w+/) && !line.match(/#ifndef \w+/)) {
                diagnostics.push(new vscode.Diagnostic(
                    new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, line.length)),
                    'Invalid conditional compilation directive',
                    vscode.DiagnosticSeverity.Error
                ));
            }
        }
    });

    const diagnosticCollection = vscode.languages.createDiagnosticCollection('comp');
    diagnosticCollection.set(document.uri, diagnostics);
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

async function enhancedDebugging() {
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

    // Add enhanced debugging commands here
}

async function runtimeMonitoring() {
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

    // Add runtime monitoring commands here
}

export function deactivate() {}

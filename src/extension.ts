import * as vscode from 'vscode';
import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.compileComp', compileComp),
        vscode.commands.registerCommand('extension.debugComp', debugComp),
        vscode.commands.registerCommand('extension.enhancedDebugging', enhancedDebugging),
        vscode.commands.registerCommand('extension.runtimeMonitoring', runtimeMonitoring),
        vscode.commands.registerCommand('extension.signalInspector', signalInspector),
        vscode.commands.registerCommand('extension.realTimeUpdates', realTimeUpdates),
        vscode.commands.registerCommand('extension.graphicalRepresentation', graphicalRepresentation),
        vscode.commands.registerCommand('extension.enhancedSignalManagement', enhancedSignalManagement),
        vscode.commands.registerCommand('extension.HALArchitectureGuidance', HALArchitectureGuidance),
        vscode.commands.registerCommand('extension.threadManagementTools', threadManagementTools),
        vscode.commands.registerCommand('extension.customFunctionSupport', customFunctionSupport),
        vscode.commands.registerCommand('extension.versionSpecificAssistance', versionSpecificAssistance),
        vscode.commands.registerCommand('extension.realTimeDebugging', realTimeDebugging),
        vscode.commands.registerCommand('extension.logging', logging),
        vscode.commands.registerCommand('extension.unitTesting', unitTesting),
        vscode.commands.registerCommand('extension.buildProcessIntegration', buildProcessIntegration),
        vscode.commands.registerCommand('extension.environmentSetupWizards', environmentSetupWizards),
        vscode.commands.registerCommand('extension.versionSpecificBuildConfigurations', versionSpecificBuildConfigurations),
        vscode.commands.registerCommand('extension.advancedDebuggingTools', advancedDebuggingTools),
        vscode.commands.registerCommand('extension.backtraceGeneration', backtraceGeneration),
        vscode.commands.registerCommand('extension.HALComponentTestingFramework', HALComponentTestingFramework),
        vscode.commands.registerCommand('extension.autoDocumentation', autoDocumentation),
        vscode.commands.registerCommand('extension.interactiveHALTesting', interactiveHALTesting),
        vscode.commands.registerCommand('extension.contextualDocumentation', contextualDocumentation),
        vscode.commands.registerCommand('extension.HALAPIAutocompletion', HALAPIAutocompletion),
        vscode.commands.registerCommand('extension.exampleProjects', exampleProjects),
        vscode.commands.registerCommand('extension.GitIntegration', GitIntegration),
        vscode.commands.registerCommand('extension.GitHooks', GitHooks)
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
`,
        step_generator: `component stepgen "A step generator component";
pin in float velocity-cmd "Velocity command";
pin out float position-fb "Position feedback";
pin out bit enable "Enable signal";
function _ "Main function";
license "GPL";
`,
        encoder: `component encoder "An encoder component";
pin out float position-fb "Position feedback";
pin in float scale "Scale factor";
function _ "Main function";
license "GPL";
`,
        pwm_generator: `component pwmgen "A PWM generator component";
pin in float value "PWM value";
pin out bit enable "Enable signal";
function _ "Main function";
license "GPL";
`,
        dac: `component dac "A DAC component";
pin in float value "DAC value";
pin out bit enable "Enable signal";
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

async function signalInspector() {
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

    // Add signal inspector commands here
}

async function realTimeUpdates() {
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

    // Add real-time updates commands here
}

async function graphicalRepresentation() {
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

    // Add graphical representation commands here
}

async function enhancedSignalManagement() {
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

    // Add enhanced signal management commands here
}

async function HALArchitectureGuidance() {
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

    // Add HAL architecture guidance commands here
}

async function threadManagementTools() {
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

    // Add thread management tools commands here
}

async function customFunctionSupport() {
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

    // Add custom function support commands here
}

async function versionSpecificAssistance() {
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

    // Add version-specific assistance commands here
}

async function realTimeDebugging() {
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
    const terminal = vscode.window.createTerminal('gdb');
    terminal.show();
    terminal.sendText(`gdb ${soFilePath}`);
    terminal.sendText(`target remote | sudo gdbserver --attach :1234 $(pgrep -f ${soFilePath})`);
}

async function logging() {
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
    terminal.sendText(`show pin`);
    terminal.sendText(`show param`);
}

async function unitTesting() {
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
    terminal.sendText(`show pin`);
    terminal.sendText(`show param`);
    terminal.sendText(`show function`);
}

async function buildProcessIntegration() {
    const terminal = vscode.window.createTerminal('buildProcessIntegration');
    terminal.show();
    terminal.sendText(`./autogen.sh`);
    terminal.sendText(`./configure`);
    terminal.sendText(`make`);
    terminal.sendText(`sudo make install`);
}

async function environmentSetupWizards() {
    const terminal = vscode.window.createTerminal('environmentSetupWizards');
    terminal.show();
    terminal.sendText(`sudo apt-get install build-essential`);
    terminal.sendText(`sudo apt-get install linux-headers-$(uname -r)`);
    terminal.sendText(`sudo apt-get install git`);
    terminal.sendText(`git clone https://github.com/LinuxCNC/linuxcnc.git`);
    terminal.sendText(`cd linuxcnc`);
    terminal.sendText(`./autogen.sh`);
    terminal.sendText(`./configure`);
    terminal.sendText(`make`);
    terminal.sendText(`sudo make install`);
}

async function versionSpecificBuildConfigurations() {
    const terminal = vscode.window.createTerminal('versionSpecificBuildConfigurations');
    terminal.show();
    terminal.sendText(`./configure --with-realtime=uspace`);
    terminal.sendText(`make`);
    terminal.sendText(`sudo make install`);
}

async function advancedDebuggingTools() {
    const terminal = vscode.window.createTerminal('advancedDebuggingTools');
    terminal.show();
    terminal.sendText(`sudo apt-get install gdb`);
    terminal.sendText(`sudo apt-get install valgrind`);
}

async function backtraceGeneration() {
    const terminal = vscode.window.createTerminal('backtraceGeneration');
    terminal.show();
    terminal.sendText(`gdb -ex "set pagination 0" -ex "thread apply all bt" -ex "quit" /path/to/your/executable`);
}

async function HALComponentTestingFramework() {
    const terminal = vscode.window.createTerminal('HALComponentTestingFramework');
    terminal.show();
    terminal.sendText(`sudo apt-get install check`);
    terminal.sendText(`make check`);
}

async function autoDocumentation() {
    const terminal = vscode.window.createTerminal('autoDocumentation');
    terminal.show();
    terminal.sendText(`doxygen Doxyfile`);
}

async function interactiveHALTesting() {
    const terminal = vscode.window.createTerminal('interactiveHALTesting');
    terminal.show();
    terminal.sendText(`halrun -I`);
    terminal.sendText(`loadrt halcmd`);
    terminal.sendText(`show pin`);
    terminal.sendText(`show param`);
}

async function contextualDocumentation() {
    const terminal = vscode.window.createTerminal('contextualDocumentation');
    terminal.show();
    terminal.sendText(`xdg-open https://linuxcnc.org/docs/devel/html/`);
}

async function HALAPIAutocompletion() {
    const terminal = vscode.window.createTerminal('HALAPIAutocompletion');
    terminal.show();
    terminal.sendText(`sudo apt-get install clang`);
    terminal.sendText(`clangd`);
}

async function exampleProjects() {
    const terminal = vscode.window.createTerminal('exampleProjects');
    terminal.show();
    terminal.sendText(`git clone https://github.com/LinuxCNC/linuxcnc.git`);
    terminal.sendText(`cd linuxcnc/src/hal/components`);
}

async function GitIntegration() {
    const terminal = vscode.window.createTerminal('GitIntegration');
    terminal.show();
    terminal.sendText(`git init`);
    terminal.sendText(`git add .`);
    terminal.sendText(`git commit -m "Initial commit"`);
}

async function GitHooks() {
    const terminal = vscode.window.createTerminal('GitHooks');
    terminal.show();
    terminal.sendText(`echo '#!/bin/sh' > .git/hooks/pre-commit`);
    terminal.sendText(`echo 'make check' >> .git/hooks/pre-commit`);
    terminal.sendText(`chmod +x .git/hooks/pre-commit`);
}

export function deactivate() {}

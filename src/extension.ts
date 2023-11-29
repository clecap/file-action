// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { readdirSync, statSync } from "fs";
import { resolve, normalize, extname, dirname } from "path";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('file-action.fileAction', function (uri: vscode.Uri) {

    let wf = vscode.workspace.getWorkspaceFolder(uri);
		if (!wf) {
			vscode.window.showWarningMessage('Workspace for this file not found!');
			return;
		}
		let files = readdirSync(resolve(wf.uri.fsPath));
		let faRE = /^file-action[.].*$/;
		let file = files.find(file => file.match(faRE));
		let cmd = '';
		if (!file) {
      let target = normalize(uri.fsPath);
			vscode.window.showWarningMessage('target is: ' + target);
			// return;

			// via npm
			cmd = `npm run file-action "${normalize(uri.fsPath)}"`;
		} else {
			// via file-action.*
			let extName = extname(file);
			if (extName === '.js') {
				cmd = `node ${resolve(wf.uri.fsPath, file)}`;
			} else {
				cmd = `${resolve(wf.uri.fsPath, file)}`;
			}
		}
		
		let t = vscode.window.createTerminal({
			// cwd: statSync(uri.fsPath).isDirectory() ? uri.fsPath : dirname(uri.fsPath),
			cwd: wf.uri.fsPath,
		});
		t.sendText(cmd);
		t.show();
		

		// t.sendText('exit');  // uncomment, if we want to dispose of the terminal
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

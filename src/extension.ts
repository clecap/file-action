// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { readdirSync, statSync, readFileSync } from "fs";
import { resolve, normalize, extname, dirname, join } from "path";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  

  let disposable = vscode.commands.registerCommand('file-action.fileAction', async function (uri: vscode.Uri) {

    let rightClick = normalize(uri.fsPath);
     vscode.window.showWarningMessage('rightClick target is: ' + rightClick);
    let wf = vscode.workspace.getWorkspaceFolder(uri);
    if (!wf) {
      vscode.window.showWarningMessage('Workspace for this file not found!');
      return;
    }
    
    const vscodeFolderPath = join(wf.uri.fsPath, '.vscode', 'rightclick-action.json');
    const vscodeFolderUri = vscode.Uri.file(vscodeFolderPath);


try {
                const document = await vscode.workspace.openTextDocument(vscodeFolderUri);
                await vscode.window.showTextDocument(document);
            } catch (error) {
                vscode.window.showErrorMessage(`Could not open the file: ${error}`);
            }

  //  let vsCodeName = path.join(workspaceFolders[0].uri.fsPath, '.vscode', 'yourfile.txt')
   // let vsCodeName = join (resolve(wf.uri.fsPath), ".vscode", "rightclick-action.json");
/*
    vscode.window.showWarningMessage('will now read ' + vsCodeName);
    let fileString = null;
    try {
      fileString = readFileSync (vsCodeName,'utf8');
    } catch (err: any) {
       vscode.window.showWarningMessage("Problems reading file .vscode/rightclick-action.json code=" + err.message + "  " + err.code);
    }
 */
/*
   vscode.window.showWarningMessage('after read ');
    if (fileString) {
      vscode.window.showWarningMessage('Workspace: ' + fileString);
    let obj = JSON.parse(fileString);
    }
    else {  vscode.window.showWarningMessage("Did not find file .vscode/rightlick-action.json");}  
*/
/*
   let term = vscode.window.createTerminal({
      // cwd: statSync(uri.fsPath).isDirectory() ? uri.fsPath : dirname(uri.fsPath),
      cwd: wf.uri.fsPath,
    });
    term.sendText(cmd);
    term.show();
*/

    return;

/*
    let files = readdirSync(resolve(wf.uri.fsPath));
    vscode.window.showWarningMessage("path " + wf.uri.fsPath);
    let faRE = /^file-action$/;
    // files.forEach (file => vscode.window.showWarningMessage( file ));
    let file = files.find(file => file.match(faRE));
    let cmd = '';
    if (!file) {
      let target = normalize(uri.fsPath);
      vscode.window.showWarningMessage('file-action.js not found, current target is: ' + target);
      // return;

      // via npm
      cmd = `npm run file-action "${normalize(uri.fsPath)}"`;
    } else {
      // via file-action.*
      vscode.window.showWarningMessage('no target found, using file.action.js');
      let extName = extname(file);
      if (extName === '.js') {
        vscode.window.showWarningMessage('target found: ' + resolve(wf.uri.fsPath, file));
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
    */

    // t.sendText('exit');  // uncomment, if we want to dispose of the terminal
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

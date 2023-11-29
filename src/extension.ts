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
    

/*
    const vscodeFolderPath = join(wf.uri.fsPath, '.vscode', 'rightclick-action.json');
    const vscodeFolderUri = vscode.Uri.file(vscodeFolderPath);


try {
                const document = await vscode.workspace.openTextDocument(vscodeFolderUri);
                await vscode.window.showTextDocument(document);
            } catch (error) {
                vscode.window.showErrorMessage(`Could not open the file: ${error}`);
            }
*/

    let vsCodeName = join(wf.uri.fsPath, '.vscode', 'rightclick-action.json')
    //vscode.window.showWarningMessage('will now read ' + vsCodeName);
    let fileString = null;
    try {
      fileString = readFileSync (vsCodeName,'utf8');
    } catch (err: any) {
       vscode.window.showWarningMessage("Problems reading file .vscode/rightclick-action.json code=" + err.message + "  " + err.code);
    }
 
 vscode.window.showWarningMessage("File content is" + fileString);

    if (fileString) {
      vscode.window.showWarningMessage('Workspace: ' + fileString);
     let obj;
     try {obj = JSON.parse(fileString);} catch (err: any) {vscode.window.showWarningMessage("Problems JSON-parsing .vscode/rightclick-action.json  code=" + err.message + "  " + err.code);}
    
    if (obj) {
      let cmd = null;
      for (const property in obj) {
        if (rightClick.endsWith (property)) {  
           cmd = obj[property]; break;
        }
      }

      let term = vscode.window.createTerminal({
        // cwd: statSync(uri.fsPath).isDirectory() ? uri.fsPath : dirname(uri.fsPath),
        cwd: wf.uri.fsPath,
      });
      term.sendText(cmd);
      term.show();


    }
    else {  vscode.window.showWarningMessage("Json-parsed object is falsish"); }

    }
    else {  vscode.window.showWarningMessage("empty contens in file .vscode/rightclick-action.json");}  

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

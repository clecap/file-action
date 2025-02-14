
import * as vscode from 'vscode';
import { readdirSync, statSync, readFileSync } from "fs";
import { resolve, normalize, extname, dirname, join } from "path";



export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands.registerCommand('file-action.fileAction', makeRegistrationFunction ("file-action.json") );
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand('file-action.dockerAction', makeRegistrationFunction ("docker-action.json") );
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand('file-action.composeUpAction', makeRegistrationFunction ("compose-up-action.json") );
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand('file-action.composeDownAction', makeRegistrationFunction ("compose-down-action.json") );
  context.subscriptions.push(disposable);

} // function activate

// this method is called when your extension is deactivated
export function deactivate() { }

//  jsonName    name of the json file in .vscode
//  returns the registration function for a context-menu type 
function makeRegistrationFunction (jsonName: string) {

let func = async function (uri:any ) {
    let rightClick = normalize(uri.fsPath);
    // vscode.window.showWarningMessage('rightClick target is: ' + rightClick);
    let wf = vscode.workspace.getWorkspaceFolder(uri);
    if (!wf) { vscode.window.showWarningMessage('Workspace for this file not found!');
      return;
    }
    let vsCodeName = join(wf.uri.fsPath, '.vscode', jsonName)
    //vscode.window.showWarningMessage('will now read ' + vsCodeName);
    let fileString = null;
    try { fileString = readFileSync (vsCodeName,'utf8'); } catch (err: any) { vscode.window.showWarningMessage("Problems reading file .vscode/" + jsonName + " code=" + err.message + "  " + err.code); }
    // vscode.window.showWarningMessage("File content is" + fileString);
    if (fileString) {
      vscode.window.showWarningMessage('Workspace: ' + fileString);
     let obj;
     try {obj = JSON.parse(fileString);} catch (err: any) {vscode.window.showWarningMessage("Problems JSON-parsing .vscode/" + jsonName + " code=" + err.message + "  " + err.code);}
    if (obj) {
      let cmd = null;
      for (const property in obj) { if (rightClick.endsWith (property)) { cmd = obj[property]; break; } }

      let term = vscode.window.createTerminal({
        // cwd: statSync(uri.fsPath).isDirectory() ? uri.fsPath : dirname(uri.fsPath),
        cwd: wf.uri.fsPath,
      });
      term.sendText(cmd);
      term.show();
    }
    else {  vscode.window.showWarningMessage("Json-parsed object is falsish"); }

    }
    else {  vscode.window.showWarningMessage("empty contents in file .vscode/"  + jsonName);}  
  }; 

  return func;

}






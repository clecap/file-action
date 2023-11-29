# rightclick-action Visual Studio Codium Extension

This VS Codium extension provides right-click (context menu)  actions which can be fully configured.

For configuring we prepare a JSON file in .vscode, which maps strings to commands.

When right-clicking on a file name the extension checks if the filename ends with a key in the JSON file
and then executes the string that key is mapped to as a command in the JSON file.

file-action.json           applies to all files

docker-action.json         applies only to Dockerfiles,  
compose-up-action.json     applies only to Docker compose yaml files
compose-down-action.json   applies only to Docker compose yaml files

## Development

* Run npm install
* Run .vscode task compile
* Press F5 to open test scenario
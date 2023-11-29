# file-action README



> Define your file action and call it when right-click item in explorer


## Features

Define `File Action` handler freely.


## Requirements

1. Write excutable file such as `file-action.js` in your workspace OR define npm scripts `{"file-action": "YOUR_CUSTOM_COMMAND"}`
2. Just right-click item in explorer and choice `File Action`.

```js
// Example handler of `file-action.js`

const path = require('path');

let args = process.argv || [];
console.log(path.normalize(args[args.length - 1]));
// generate, clean dist, start app, ... via judge current file
```

## Changelog


### 0.0.3

Forked by Clemens Cap
Removed terminal exit on execute, since we need to see error messages and more.
Made title more prominent for context / right-click menu.
Changed place in package.json to navigation
TODO: changed generic place of action file to .vscode
TODO: added vsce to packag.json
TODO: included vsce run into npm scripts
TODO: improved documentation
TODO: removed nonenglish documentation portion
TODO: made github package / release
TODO: published on marketplace in new version

### 0.0.2

Exit terminal on excuted

### 0.0.1

Initial of `File Action`

## Development

* Run npm install
* Run vscode task compile
* Press F5 to open test scenario
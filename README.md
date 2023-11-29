# file-action README




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

* Forked by Clemens Cap
* Removed terminal exit on execute, since we need to see error messages and more.
* Made title more prominent for context / right-click menu.
* Changed place in package.json to navigation
* Changed generic place of action file to .vscode
* Modified action principle
* added vsce to package.json
* included vsce run into npm scripts
* improved documentation
* removed nonenglish documentation portion
* made github package / release
TODO: published on marketplace in new version

### 0.0.2

Exit terminal on excuted

### 0.0.1

Initial of `File Action`

## Development

* Run npm install
* Run .vscode task compile
* Press F5 to open test scenario
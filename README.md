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

### 0.0.1

Initial of `File Action`

### 0.0.2

Exit terminal on excuted

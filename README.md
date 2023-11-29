# file-action README



> Define your file action and call it when right-click item in explorer
> 自定义文件动作处理脚本，并在资源文件树上右键单击某个文件或文件夹时并点击`File Action`时调用

## Features

Define `File Action` handler freely.
自由定制文件处理脚本

## Requirements

1. Write excutable file such as `file-action.js` in your workspace OR define npm scripts `{"file-action": "YOUR_CUSTOM_COMMAND"}`
2. Just right-click item in explorer and choice `File Action`.

```js
// Example handler of `file-action.js`
// 示例处理程序
const path = require('path');

let args = process.argv || [];
console.log(path.normalize(args[args.length - 1]));
// generate, clean dist, start app, ... via judge current file
// 通过判断当前文件 生成、清理、启动App、...
```

## Changelog

### 0.0.1

Initial of `File Action`

### 0.0.2

Exit terminal on excuted

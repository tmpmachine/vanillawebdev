Utility code: [wait.js](/utils/wait.js).

## Usage
Check `compoMain` every second and timeout after 5 seconds.
```js
let waitDelay = 1000; // 1 seconds
let timeout = 5000; // 5 seconds

await wait.until(() => {
  console.log('Waiting for main component ...');
  return typeof(compoMain) != 'undefined';
}, waitDelay, timeout);
```

## Parameters
- check function, return true to resolve.
- waitDelay (optional), in milliseconds, default 100ms.
- timeout (optional), in milliseconds: auto resolve after timeout.

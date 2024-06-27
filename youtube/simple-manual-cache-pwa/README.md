# Simple Manual Cache PWA

This is minimal setup to build a PWA where the user manually cache the application data to enable offline access.

`manifest-cache.json` contains a list of files you want to cache. The key is mean for grouping files to keep things neat, so the name is up to you.
```js
{
    "js": [
        // ...
    ],
    "libraries": [
        // ...
    ],
    "etc": [
        // ...
    ],
    "root": [
        "./",
        "index.html",
        "manifest.json",
        "pwa-cacher.js"
    ]
}
```

If you're trying this on an online service, e.g. GitHub Codespace or Google IDX, you need to specify `crossorigin="use-credentials"` for the manifest to get away with CORS issue.
```
<!-- pwa manifest -->
<link rel="manifest" href="manifest.json" crossorigin="use-credentials"/>
```

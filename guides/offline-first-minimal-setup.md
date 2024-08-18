# Offline-First Minimal Setup

Video: https://youtu.be/yFS-doMHLz0

`index.html`
```html
<script>
    if (typeof(navigator) !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function(swo) {
            console.error('Service worker registered.')
        }).catch(function(e) {
            console.error('Something went wrong.')
        });
    }
</script>
```

`sw.js`
```js
self.addEventListener('message', function(e) {
    if (e.data.action == 'skipWaiting') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(resp) {
        if (resp) return resp;
        
        return fetch(e.request).then(function(r) {
            return r;
        }).catch(function() {
            console.error('Check connection.');
        });
        })
    );
});
```

Caching Files
-------------

There's no need to cache the service worker file as it is available after the the initial registration.
```js
let cacheName = 'example-cache-v1';
let cacheURLs = [
    'https://example.com/',
];

window.caches.open(cacheName)
.then(function(cache) {
    return Promise.all(
        cacheURLs.map(function(url) {
        return cache.add(url).catch(function(error) {
            console.error('Failed to cache URL:', url, error);
        });
        })
    );
})
.then(function() {
    console.log('Done! Reload to take effect.');
})
.catch(function(error) {
    console.log('Failed. Check console.');
});
```
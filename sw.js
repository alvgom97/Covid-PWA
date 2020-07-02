caches.open("my-cache").then(function (cache) {
    return cache.addAll([
        './',
        './index.html',
        './index.js',
        './style.css',
        './manifest.webmanifest',
        'icons/covid-192.png'
    ]);
})

self.addEventListener('fetch', function (event) {

    event.respondWith(
        fetch(event.request)
            .then(async response => {
                if (event.request.method === 'GET') {
                    caches.open("my-cache").then(cache => cache.add(event.request));
                }

                if(!response) throw response;
                return response;
            })
            .catch(() => caches.match(event.request)),
    );
});
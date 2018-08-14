//To cache our pages
const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    'css/style.css',
    'js/main.js'
];

//To call the install event
self.addEventListener('install', e=>{
    //console.log('Service Worker: Installed');
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache =>{
            //console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});


//To call the Activate event
self.addEventListener('activate', e=>{
    //console.log('Service Worker: activate');
    //To remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all (
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        //console.log('Service Worker Clearing old cache');
                        return caches.delete(cache);

                    }
                })
            );
        })
    );
});

//To call Fetch Event

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fectching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
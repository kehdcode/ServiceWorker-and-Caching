//To cache our pages
const cacheName = 'v2';


//To call the install event
self.addEventListener('install', e=>{
    //console.log('Service Worker: Installed');
    
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
    e.respondWith(
        fetch(e.request)
        .then(res => {
            //Make a copy of our response
            const resClone = res.clone();
            //Open Cache
            caches
            .open(cacheName)
            .then(cache => {
                //Add response to cache
                cache.put(e.request, resClone);
            });
            return res; 
        }).catch(err => caches.match(e.request).then(res => res))
    );
});
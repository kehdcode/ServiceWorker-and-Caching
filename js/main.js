//To register service Worker
//To check if service worker is enabled
if ( 'serviceWorker' in navigator) {
    //console.log('service worker supported');
    window.addEventListener('load', ()=>{
        navigator.serviceWorker.register
        ('../sw_cached_pages.js')
        .then(reg => console.log('Service worker: registered'))
        .catch(err =>console.log ('Service Worker: Error: ${err}'));
    });
}
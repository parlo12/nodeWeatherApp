const casheName = 'v2';

const cacheAssets = [
    
    '/templates/views/index.hbs',
    '/templates/views/help.hbs',
    '/templates/views/about.hbs',
    '/templates/views/404.hbs',
    '/templates/partials/footer.hbs',
    '/templates/partials/head.hbs',
    '/templates/partials/header.hbs',
    '/public/css/style.css',
    '/public/img/parlo.jpg',
    '/public/img/weather.pgn',
    '/public/js/app.js',
    '/public/js/sw.js'

]


// call install Event
self.addEventListener('install', (e)=>{
    console.log('Service worker: installed')

    e.waitUntil(
        caches.open(casheName).then( cache =>{
            console.log('Service work: caching files');
            cache.addAll(cacheAssets);
        })
        .then(()=> self.skipWaiting())
    );
})

// activate event

self.addEventListener('activate', (e) =>{
    console.log('Service worker: activated')

    //remove unwanted caches

    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== casheName){
                        console.log('Service worker: clearing old Cache')
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})

// call fetch event

self.addEventListener('fetch', e =>{
    console.log('Service worker: fetching');

    e.respondWith(
        fetch(e.request).catch(()=> caches.match(e.request))
    )
})
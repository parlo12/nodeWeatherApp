const casheName = 'v1';


// call install Event
self.addEventListener('install', (e)=>{
    console.log('Service worker: installed')
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
        fetch(e.request).then(res =>{
            //make copy/clone of response

            const resClone = res.clone();
            // open Cache

            caches.open(casheName).then(cache => {
                //add response to cache
                cache.put(e.request, resClone)
                
            })
            return res;
        }).catch(err => caches.match(e.request).then(res => res)) 
    )
})
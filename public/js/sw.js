if('serviceWorker' in navigator){
    window.addEventListener('load',() =>{
        navigator.serviceWorker.register('../sw_cached_site.js').then(reg => console.log('Service worker: register')).catch(err => console.log(`Service worker: Error ${err}`))
    })

}else{
    console.log('Service workers are not supported. ')
}
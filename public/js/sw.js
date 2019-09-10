if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js', {scope:'./'}).then((registration) => {
          console.log('Service Worker registration successful', registration)
      }, (err) =>{
          console.log('Registration Failed :', err)
      })
  })

}else{
    console.log('Service workers are not supported. ')
}
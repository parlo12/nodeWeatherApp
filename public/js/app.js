const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');
const messageFive = document.querySelector('#message-5');
const messageSix = document.querySelector('#message-6')
const messageSeven = document.querySelector('#message-7')
 
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    messageThree.textContent ='';
    messageFour.textContent ='';
    messageFive.textContent = '';
    messageSix.textContent = '';
    messageSeven.textContent= '';
    console.log('test')
    fetch(`/weather?address=${location}`).then((response)=>{

        response.json().then((data)=>{
            
            if(data.error){
                messageOne.textContent = data.error +' loading Your last search :';
                messageSix.textContent = localStorage.getItem('location');
                messageTwo.textContent = localStorage.getItem('Summary');
                messageThree.textContent = 'last check temp is ' + localStorage.getItem('temperature');
                messageFour.textContent = 'last uv index was at ' + localStorage.getItem('uvindex');
                messageFive.textContent = 'last visibility level was at ' +localStorage.getItem('visibility');
                messageSeven.textContent = 'Last wind Speed was at :' + localStorage.getItem('windSpeed');

            } else{
                
                if(localStorage) {

                // storing data fetch from weather API in localStorage 

                    localStorage.setItem('location', data.location)
                    localStorage.setItem('Summary', data.forCastData.summary)
                    localStorage.setItem('temperature', data.forCastData.temperature);
                    localStorage.setItem('uvindex', data.forCastData.uvIndex)
                    localStorage.setItem('visibility', data.forCastData.visibility)
                    localStorage.setItem('windSpeed', data.forCastData.windSpeed )

                } else{
                    console.log('local Storage not available ')
                    messageOne.textContent = data.error
                }
                    messageOne.textContent = data.location 
                    messageTwo.textContent = data.forCastData.summary
                    messageThree.textContent = 'Temperature Currently at :' +data.forCastData.temperature
                    messageFour.textContent = 'Current UV index is :'+ data.forCastData.uvIndex
                    messageFive.textContent = 'A visibility of ' + data.forCastData.visibility 
                    messageSeven.textContent = 'Wind speed is currently at :' + data.forCastData.windSpeed + 'MPH'
            }
        })
    })

})

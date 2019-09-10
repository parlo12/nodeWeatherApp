const request = require('request')
 const forCast = (latitude, longitude, callBack)=>{

    const url = `https://api.darksky.net/forecast/e5d9644c713433c52f1ead4fa481b249/${longitude},${latitude}`;

    request({url, json:true},(error, {body})=>{

        //check for low level errors like network connection 

        if(error){
            callBack('No network available', undefined)
            // check for user error 
        }else if (body.error){
            callBack('Please enter a valid search', undefined)
        } else{

            const {temperature, uvIndex, visibility, summary, windSpeed} = body.currently

            callBack(undefined,{ summary, temperature,uvIndex,visibility, windSpeed})
        }
    })
}

module.exports = forCast;
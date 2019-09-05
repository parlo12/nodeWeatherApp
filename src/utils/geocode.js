const request = require('request');

const geoCode = (address, callBack)=>{

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoicm9sZjEyIiwiYSI6ImNqenVheDBteDBjcnEzaHBmZHFsbG9ybnUifQ.lI38tQBFmC6DlN7CAxPREA&limit=1`;

    // calling request function 

    request({url, json:true}, (error, {body} = {}) =>{
        // check for low level error like server is down no network connection 
        if(error){
            callBack('Cant connect to Network!',undefined)
            // checking for user error 
        } else if( body.features.length === 0) {
            callBack('Please enter a valid Search',undefined);

            // display response to user meaning data 
        } else{

            const {center, place_name:location} = body.features[0]

        callBack(undefined, { 
            
            longitude:center[1], 
            latitude:center[0],
            location,
        })
        }
    })

}

module.exports = geoCode;
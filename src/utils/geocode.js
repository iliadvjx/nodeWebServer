const request = require('request')
const geoCode = (address , callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaWxpYXNhbmQiLCJhIjoiY2p5Y3kzdWUyMG4wbDNtbno5bjBnZTV1MiJ9.AR90NJxHImNTH4yiVlQn5g`

    request({url , json:true}, (error , response) => {
        if(error) callback("Unable To Connect" , undefined)
        else if(response.body.features.length === 0) callback('Unable TO Find The Location!' , undefined)
        else{
            callback(undefined , {
                latitude: response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })   
}

module.exports = geoCode
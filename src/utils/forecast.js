const request = require('request')

const forecast = (lat , long , callback) => {
    const url = `https://api.darksky.net/forecast/cd89a82f62a94584e732a9a0726804c1/${lat},${long}?units=si`;

    request({url , json:true},(error , response)=>{
        if(error) callback('Unable To Connect Weather Service!',undefined)
        else if(response.body.error) callback("Cannot Find The Place!" , undefined)
        else
            callback(undefined , response.body.daily.data[0].summary + ' It is currently ' +
             response.body.currently.temperature + ' degress out. There is a ' + 
             response.body.currently.precipProbability + '% chance of rain.\n' + 'WindSpeed is about: ' + response.body.currently.windSpeed +
             'KM/s and humidity is about '+ response.body.currently.humidity)  
    })
}


module.exports = forecast
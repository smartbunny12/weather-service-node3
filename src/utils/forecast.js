const request = require('request');

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=199e7dd696347127bd1698d4cda98ef4&query=" + lat + "," + long + "&units=f"
    request({ url: url, json: true }, (error, response) =>{
        if (error) {
            callback('Unable to conenct to location services', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is ' + response.body.current.temperature + ' degree, and it is feels like ' + response.body.current.feelslike + ' degree')
        }
    })

    
}
module.exports = forecast
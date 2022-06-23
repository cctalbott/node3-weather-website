const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1ec2880c27a548b388d1edac24688c01&query=' + 
        latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) { 
            callback('Unable to find location')
        } else {
            const {current} = body
            callback(undefined, 
                current.weather_descriptions[0] + 
                '. It is currently ' + 
                current.temperature + 
                ' degrees out. It feels like ' + 
                current.feelslike + 
                ' degrees out.' +
                ' There is a ' + current.wind_speed + 'mph breeze.')
        }
    })
}

module.exports = forecast
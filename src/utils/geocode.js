const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
        encodeURIComponent(address) + 
        '.json?access_token=pk.eyJ1IjoiY2N0YWxib3R0IiwiYSI6ImNsMnAzYWdkaDJoYm8zanNibGt2ejQ4NHoifQ.72KJ6LYqatuMfVhU5162Qw&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            const feature = body.features[0];
            const lat = feature.center[1]
            const lon = feature.center[0]
            callback(undefined, {
                latitude: lat,
                longitude: lon,
                location: feature.place_name
            })
        }
    })
}

module.exports = geocode
const request = require('request');



const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=46415e4fa6461ccbc3e7e51c5b44fe79&query='+ latitude +','+ longitude +'&units=f';

    request({url: url, json: true},(error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }else if (body.error) {
            callback('Unable to find location', undefined);
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out. The humidity is "+body.current.humidity+"%.");
        }
    });
}

module.exports = forecast;

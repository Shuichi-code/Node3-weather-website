const geocode = require('./geocode.js');
const forecast = require('./forecast.js');

const address = process.argv[2];

if (!address) {
    console.log('Please provide an address');
} else {
    geocode(address, (error, { latitude, longitude, location }) => {
        if (error) {
            return console.log(error);
        }

        forecast(longitude, latitude, (error, forecastData) => {

                if (error) {
                    return console.log(error);
                }

                console.log(location);
                console.log(forecastData);
            });
    });
}




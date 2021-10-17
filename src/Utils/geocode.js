const request = require('request');

const geocode = (address, callback) => {
    const url =
        'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZW1pc29sZXMiLCJhIjoiY2t1dDRzOHo0MHloejJvcTk5Y3NoMHA4dyJ9.By-NwF_smA_YX1iJjVdybg&limit=1';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined,
                {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                });
        }
    });
};

module.exports = geocode;
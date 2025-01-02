const request = require('request');

const temperature = (latitude,longitude,callback) => {
    const url = `https://api.weatherstack.com/current?access_key=f65d262a7f000fd006ff513262cf2f02&query=${latitude},${longitude}`;

    request({url:url, json: true}, (error, {body} ={}) => {
        if(error) callback(error);
        else if(body.error) callback('Unable to find location');

        else{
            const data = body.current;
            callback(undefined,`It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees.`)
        }
    })

}

module.exports = temperature;
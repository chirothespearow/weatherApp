const request = require('request');

const geocode = (address,callback)=>{
    const mapUrl = `http://api.positionstack.com/v1/forward?access_key=b7a5ee6dbf30a80a467d7386e16888aa&query=${address}`;
    request({url : mapUrl, json: true}, (error,{body}={}) => {
        if(error) callback(error);
        else if(body.error || body.data.length === 0) callback("Unable to find location");
    // console.log(response)
        else {
            // const data;
            const {latitude,longitude,name} = body.data[0];//{latitude: response.body.data[0].latitude, longitude: response.body.data[0].longitude, name: response.body.data[0].name}
            const data = {latitude,longitude,name};
            // console.log(`Latitude: ${response.body.data[0].latitude}\nLongitude: ${response.body.data[0].longitude}\nName: ${response.body.data[0].name}`)
            callback(undefined,data);
        }
    })
}

module.exports = geocode;
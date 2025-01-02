const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geolocator = require('./utils/geolocator.js');
const temperature = require('./utils/temperature.js');

const app = express();
const port = process.env.PORT || 3000;
const webpagePath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

app.use(express.static(webpagePath))


app.set('view engine','hbs');
app.set('views',viewsPath);

hbs.registerPartials(partialsPath);

app.get('', (req,res) => {
    res.render("index",{
        text:"Use this site to get the weather!",
        title:"Home"
    });
})


app.get('/help', (req,res) => {
    res.render("help",{
        text:"HEALTHa ME",
        title:"Help"
    })
})

app.get('/about', (req,res) => {
    res.render("about",{
        text:"ABOOT ME?",
        title:"About"
    })
})

// app.get('/about', (req,res) => {
//     res.send("<h1>ABout</h1>");
// })

app.get('/weather', (req,res) => {
    // console.log(req.query.location);
    if(!req.query.location){
        return res.send({
            error:"Location must be provided"
        })
    }

    geolocator(req.query.location,(error,{latitude,longitude,name}={}) => {
        if(error) return res.send({
            error : error
        })

        temperature(latitude,longitude,(error,forecast = '') => {
            if(error) return res.send({
                error : error
            })

            else res.send({
                Location: name,
                Forecast: forecast
            })
        })

    })

})

app.get('/help/*',(req,res) => {
    res.render('notfound',{
        error:"Help article not found"
    })
})

app.get('*',(req,res) => {
    res.render('notfound',{
        error: "Page not Found"
    })
})

app.listen(port, () => {
    console.log("Server started on port " + port);
})
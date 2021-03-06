"use strict"
const path = require('path');
const express = require('express');
const hbs = require('hbs')
 
const app = express();
const port = process.env.PORT || 3000;

const geocode = require('./Utils/geocode.js');
const forecast = require('./Utils/forecast.js');
const { Console } = require('console');


const publidDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publidDirectoryPath));

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Andrew Mead'
    });
});

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Erick Vanjoeff Misoles'
    });
});
app.get('/help', (req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Erick Vanjoeff Misoles',
        message: 'Helping you!'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided.'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error});
        }

        forecast(longitude, latitude, (error, forecastData) => {

            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });
    });
});



app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.search);

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'404',
        name: 'Erick Vanjoeff Misoles',
        errorMessage: 'Help article not found.'
    })
});

app.get('*', (req, res)=>{
    res.render('404',{
        title:'404',
        name: 'Erick Vanjoeff Misoles',
        errorMessage: 'Page not Found.'
    })
});

app.listen(port, ()=>{
    console.log('Server is up on port '+port+'.');
});
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public')) 

const app = express()

// define paths for express config
const publicDirectionPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs') // get handlebar set up
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectionPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Fanqi Xue'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Fanqi Xue'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is help info',
        title: 'Weather App',
        name: 'Fanqi Xue'
    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'Address need to be provided!'
        }) 
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error: error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData, 
                location,
                address: req.query.address
            })
        })
    })

})



app.get('/products',(req, res)=>{
    //console.log(req.query): fetch all info after  ../products
    if (!req.query.search) { // fetch ../products?search=
        return res.send({
            error: 'You must provide a search term'
        }) 
    
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

// set 404 page for wrong url
app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: '404',
        name: 'Fanqi Xue',
        errorMessage: 'Page not found.'
    })
})
// listen to the 3000 port, click: control + C exit
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forCast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// setting up paths to files 
const publicDirectoryPath  = path.join(__dirname, '../public');
const PathViews = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//seting the view engine 
app.set('view engine','hbs')
app.set('views', PathViews)
hbs.registerPartials(partialsPath)

//static directory contain js files and css files 
app.use(express.static(publicDirectoryPath))
//routs
app.get('',(req, res) => {

    res.render('index',{
        title: 'Weahter App',
        name: 'Parlo'
    })
})

app.get('/about',(req, res) => {

    res.render('about',{
        title: 'About Page',
        header: 'About Me',
        name: 'Parlo Louisdor'
    })
})

app.get('/help',(req, res) => {

    res.render('help',{
        title: 'help',
        textMessage: 'This message is coming from teh Help Page',
        name: 'Parlo Louisdor'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address){

        return res.send({
            error:'Please enter an address!'
           
        })
    }

    // call geocode function to get longiture and latitude encoding 

    geoCode(req.query.address,(error, {longitude, latitude, location} ={})=>{
        if(error){
            
             return res.send({
                  error
             })
        }

        forCast(latitude,longitude,(err,forCastData)=>{
            if(error){
                 return res.send({
                     err
                })
            }
            res.send({
                location,
                forCastData
            })
        })  
    })
})

app.get('/help/*',(req, res)=>{

    res.render('404', {
        textMessage:'Help article not found ',
        name:'Parlo Louisdor',
        title:'404 Article!'
    })
})

app.get('*',(req, res)=>{
    res.render('404', {
        textMessage:'Page not found',
        name:'Parlo Louisdor',
        title:'404 Page!'
    })
})

app.listen(port, () =>{
    console.log('Server started on port ' + port)
})
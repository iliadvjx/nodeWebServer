const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const os = require('os')
console.log(__dirname)
console.log(path.join(__dirname , '../public'));

let publicPath = path.join(__dirname , '../public');
let viewPath = path.join(__dirname , '../template/views')
let partialsPath = path.join(__dirname , '../template/partials')

app.set('view engine' , 'hbs')
app.set('views',viewPath)
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)

app.get('',(req , res)=>{
    res.render('index' , {
        title: 'Weather',
        name: 'iliA'
    })
    console.dir(req.ip)
    console.log(os.cpus()[0].model, os.cpus()[0].speed / 1000 , os.platform() , os.arch(),os.uptime(),process.env.PORT)
    // res.status(400).send('Bad Request')

})

app.get('/help', (req , res) =>{
    res.render('help' , {
        title: 'Help',
        name: 'iliA'
    })
})

app.get('/about', (req , res) =>{
    res.render("about", {
        title:'About',
        name:'iliA'
    })
})
app.get('/weather',(req,res)=>{
    if( !req.query.address){
        return res.send({error:'Please Provide the address!'})
    }

    geocode(req.query.address , (error , {latitude , longitude , location}={})=>{
        if(error) return res.send({error})
        
        forecast(latitude , longitude , (error , data)=>{
            if(error) return res.send({error})
            res.send({
                forcast: data,
                location,
                address:req.query.address
            })
        })
    })


    // res.send({
    //     address: req.query.address
    // })
    // console.log(req.ip,req.hostname)
    
})
app.get('/pr',(req,res)=>{
    console.log(req.query.key)
})




app.get('/help/*',(req ,res)=>{
    res.render("404",{
        title:'404!',
        errorM:"No Help Article!",
        name:'iliA'
    })
})
app.get('*',(req,res)=>{
    res.render("404",{
        title:'404!',
        errorM:"Page You Want Not Found!",
        name:'iliA'
    })
})
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log('server is on port: ',port )})

const express = require('express')
const path= require('path')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const ejs = require('ejs')
mongoose.connect("mongodb://localhost:27017/test" ,{useNewUrlParser: true} )
const db = mongoose.connection
db.on('error', console.error.bind("ERROR Found: "))
db.once('open', ()=>{console.log("Database Actived!")})
const {Schema} = mongoose


const app = express()
app.set('views engine', "ejs")
app.use(express.static('html_files'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

const fillSchema = new Schema({
    radio: String,
    name: String,
    halls: String,
    room :String,
    gender: String
})

const filldata = mongoose.model("filldata", fillSchema)

app.get('/home', (req, res)=>{
    res.sendFile( path.join(__dirname + "/html_files/home.html"))
})

app.post('/changes', (req, res)=>{
    res.sendFile(__dirname + '/html_files/hall.html')
})
app.post('/upload', (req,res)=>{
    const newData = new filldata(req.body)
    newData.save().then(data=>{
        res.sendFile(__dirname+ '/html_files/middleman.html')
    }
        
    )
})

app.get('/data', (req, res)=>{
    filldata.find({}, function(err, data){
        res.render("database.ejs", {data: data})
    })
})


app.listen(3000, ()=>{
    console.log("http://localhost:3000")
})

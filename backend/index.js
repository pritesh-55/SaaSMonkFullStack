const express = require('express')
const server = express()
const port = process.env.PORT || 5000

const cors = require("cors");  
const corsOptions = {
  origin : true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials : true
}
server.use(cors(corsOptions));
server.use(express.json())   
server.use(express.urlencoded({extended:false})) 

require("./database/connection")   // Database Connection

const addRoute = require("./routes/addRoute")


// server.use('/', home)
server.use('/', addRoute)

const server_start = async ()=>{
    try{
        server.listen(port, ()=>{
            console.log(`The Server is listening on port no. ${port}`)
        })
    }
    catch(err){
        console.log(`Server cannot listen due to error ${err}`)
    }
}
server_start()
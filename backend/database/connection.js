const mongoose = require('mongoose')
const atlasUrl= "mongodb+srv://priteshsrv:Prikha1303@priteshapi.kwiwdof.mongodb.net/PriteshAPI?retryWrites=true&w=majority"
mongoose.connect(`${atlasUrl}` ,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{ 
    console.log("Connection to Database Successfull")})
.catch((err)=>{ 
    console.log(`Error due to ${err}`)})
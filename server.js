var express = require('express')

const app=express()

app.get('/',(req,res) => res.send("Helloooooooo!!!"))

app.listen(3000, function(){
    console.log("Server Listening on Port 3000")
})
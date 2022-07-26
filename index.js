
require("dotenv").config()
const express = require('express'),
    app = express(),
    port = process.env.PORT||3005;

const router=require('./Routes');



app.use(express.json()) 
app.use(require('cors')())


app.use("/api", router); //IS EQUIVALENT TO app.use("/api", require('./Routes'));


// function loger(req, res, next){
//     res.send("not found my"); //if this path doesn';t exist
//     // console.log("log");
//     // next();
// }

// app.use(loger);


app.listen(port, () => console.log(`server is running => ${port}`))
require('./DL/db').connect();


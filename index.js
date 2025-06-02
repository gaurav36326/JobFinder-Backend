require('dotenv').config();

const express = require('express');
const app = express();
const dbConnect = require('./db/dbConnect');
const cookieParser = require('cookie-parser');
const cors = require('cors');


app.use(express.json());
app. use(express.urlencoded ({extended: true}));
app.use(cookieParser());
app.use(cors)

const corsOptions = {
    origin : "",
    credential :true
}


app.get("/",(req,res)=>{
    
    res.json({
        message : "home route"
    })
})



app.listen(3000,async (req,res)=>{
    await dbConnect()
    console.log("listening on port 3000");
})
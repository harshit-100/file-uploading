const express = require('express');
const app = express();
const { connectDB } = require('./config/db');

connectDB();

//middlewares
app.use(express.json());
app.use(express.static("content"));
app.use(express.urlencoded({extended:false}));


const PORT = 1338 ;
app.listen(PORT,()=>{
    console.log('app is running on port:',PORT);
    connectDB();
})
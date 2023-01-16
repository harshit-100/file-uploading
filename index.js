const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(express.static("content"));


const PORT = 1338 ;
app.listen(PORT,()=>{
    console.log('app is running on port:',PORT);
})
require('dotenv').config();
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const user = require('./routes/users');

const app = express();
const URL_DB = process.env.DB;
const port = process.env.PORT || 5000;

app.use( '/static' ,express.static(path.join(__dirname, '../../dist'), { index: false }));

app.get('/', (req, res) => {
    res.status(200).sendFile( path.join(__dirname,'../../dist' , 'index.html'));
})

app.listen(port,()=>{
    console.log( ` server listening on ${port}` );
});

//database configuration 
const mysql = require('mysql2'); // module written to get node and sql to interact easier
const dotenv = require('dotenv'); //initializes dotenv file
const express= require('express');
const app = express();

dotenv.config();

//database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});


//tutorial code

connection.connect((error)=>{
  if(error){
    console.log(error)
  } else {
    console.log('mysql connected')
  }
})









// console.log(connection.password);


  module.exports= connection;
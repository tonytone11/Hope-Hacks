const express= require('express');
const app =express();
const PORT = process.env.PORT || 3002;
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connection =require('./db');
const bcrypt = require('bcryptjs');
const path = require('path');




dotenv.config();
//create post request for register route

app.use(express.static((path.join(__dirname, 'registration'))))
app.use(bodyParser.json())

app.post('/register',async (req,res)=> {
    console.log(req.body.firstName);
    const {username, email, password, firstName, lastName} = req.body;
    const hashedpassword = await bcrypt.hash(password,10)
  
    connection 
.promise() 

.query(
    'INSERT INTO users (username, email, password, firstName, lastName) VALUES (?, ?, ?, ?, ?)',
    [username, email, hashedpassword, firstName, lastName]

);
});

  /*app.post('api/login', (req, res) => {
      const {email, password } = req.body
     const loggedInfirstName = await connection
        .promise()
        .query(`SELECT firstName from signup where email = ? AND password = ?`,
        [email, password])

        res.send(loggedInfirstName)

    }) */





// Route to serve the index.html file (default for root route)
// app.get('/', (req, res) => {
//     res.send(path.join(__dirname, 'HomePage', 'index.html')); // Serves index.html
//   });
  
  // Route to serve the login.html file in the homepage folder
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'registration', 'login.html')); // Serves login.html
  });




app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});

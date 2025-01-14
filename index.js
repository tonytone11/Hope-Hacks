const express= require('express');
const app =express();
const PORT = process.env.PORT || 3003;
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connection =require('./db');
const bcrypt = require('bcryptjs');
const path = require('path');
const { error } = require('console');
const endcoder = bodyParser.urlencoded();




const publicDirectory = path.join(__dirname, './')
dotenv.config();
//create post request for register route
app.use(bodyParser.json())

app.use(express.static((path.join(__dirname,'FrontEnd'))))
app.use(express.urlencoded({ extended: false }));


app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
   

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database (use consistent table name)
    const [results] = await connection
      .promise()
      .query(
        'INSERT INTO signup (firstName, lastName, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, email, phoneNumber, hashedPassword]
      );
      console.log(results);

    // Send a success response
    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error(error);

    // Check for duplicate email error (MySQL error code 1062)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    // Send a generic error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ////////////////////////////////////////////////////////////////////////////////
//login route


app.post('/login', endcoder, async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('before', email);

    // Query the database to find the user by email
     connection.query('SELECT * FROM signup WHERE email = ?',  [email], async (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        // Handle the error (e.g., return an error response or log the error)
        
      }
    
      // Use the results
      console.log('Query results:', results);

        // Check if a user with the provided email exists
    if (results.length > 0) {
      const hashedPassword = results[0].password; // Hashed password from the database
      const name = results[0].firstName; // User's name from the database
      const lastName = results[0].lastName;
      const email = results[0].email;
      const phoneNumber = results[0].phoneNumber;


      // Compare the submitted password with the hashed password
      const isMatch = await bcrypt.compare(password, hashedPassword);

      if (isMatch) {
        console.log('ismatch', password, hashedPassword);

        // saving name in session storage
        res.send({message: `Welcome ${name}!`,lastName : lastName, firstName: name,  email: email, phoneNumber : phoneNumber});
       
      } else {
        // Passwords do not match
        res.send({error :'Invalid email or password'});
      }
    } else {
      // No user found with the provided email
      res.send('Invalid email or password');
    }
    });
    

  
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});






// Route to serve the index.html file (default for root route)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'FrontEnd','HomePage', 'index.html')); // Serves index.html
  });
  
//do routes for each page
  // Route to serve the login.html file in the homepage folder
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'FrontEnd','registration', 'login.html')); // Serves login.html
  });
  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname,'FrontEnd','registration', 'signup.html')); // Serves login.html
  });


  app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,'FrontEnd', 'AboutUs', 'about.html')); // Serves login.html
  });

  app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'FrontEnd','Datapage', 'data.html')); // Serves data.html
  });


  app.get('/welcome', (req,res)=>{
    res.sendFile(path.join(__dirname, 'FrontEnd','registration','welcome.html'));
  })
  app.get('/profile', (req,res)=>{
    res.sendFile(path.join(__dirname, 'FrontEnd','registration','profile.html'));
  })


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});


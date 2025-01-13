document.addEventListener('DOMContentLoaded', () => {

  const registerForm = document.querySelector('.s-popup');
  const loginForm = document.querySelector('#login-form');
  const registerSubmitButton = document.querySelector('.registerbutton')
  const loginSubmitButton = document.querySelector('.loginbtn')
  const dashboardSection = document.querySelector('.dashboard-section'); 
  const registerMessage = document.querySelector('#register-message');
  const loginMessage = document.querySelector('#loginMessage'); 
  const welcomeMessage = document.querySelector('.welcome-message'); 
  const logoutButton = document.querySelector('#logout-button'); 
  const profile = document.querySelector('.profileitems');
  const goToProfile = document.querySelector('.goToProfile');
  
  
  // Base API URL
  const API_URL = '/';
  
  // Handle Registration
  if (registerForm) {
  registerForm.addEventListener('submit', async e => {
    e.preventDefault();
    const firstName = document.querySelector('#firstname').value;
    const lastName = document.querySelector('#lastname').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const phoneNumber = document.querySelector('#phone').value;
  console.log({firstName, lastName, email, phoneNumber, password});
    try {
      const response = await fetch(`${API_URL}register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email,phoneNumber, password }),
      });
  
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        registerMessage.textContent = 'Registration successful!';
        registerMessage.style.color = 'green';
        window.location.href = '/login';
  
      } else {
        registerMessage.textContent = data.error || 'Registration failed.';
        registerMessage.style.color = 'red';
      }
    } catch (error) {
      registerMessage.textContent = 'An error occurred.';
      registerMessage.style.color = 'red';
    }
  });
  }
  
  
  
  
  ///////////////////////////////////////////////////////////////////////////////////
  // Handle Login
  if (loginForm) {
  loginForm.addEventListener('submit', async e => {
    //event listener for asynch function
    e.preventDefault(); //preventing form auto action
    const email = document.querySelector('#loginemail').value;
    const password = document.querySelector('#loginpassword').value;
    
    console.log('hotdog');
  
    try {
      const response = await fetch(`${API_URL}login`, {
            // Make a POST request to the server's `/login` endpoint using the `fetch` API.
        method: 'POST', //http method for request
        headers: { 'Content-Type': 'application/json' }, //specifiying req.body type
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json(); //make sure serever response is valid json to avoid errors
     
      if (response.ok) { //error handling
        sessionStorage.setItem('message', data.message);
        sessionStorage.setItem('Firstname', data.firstName);
        sessionStorage.setItem('lastName', data.lastName);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('phoneNumber',data.phoneNumber)
  
  
        //redirecting to the welcome page
        window.location.href = '/welcome';
        //saving authentification token with localstorage in browser
        loginMessage.textContent = data.message;
        loginForm.reset(); //clearing form input
       
      } else {
        loginMessage.textContent = data.error || 'Login failed.';
        loginMessage.style.color = 'red';
      }
    } catch (error) {
      console.log(error);
      loginMessage.textContent = 'An error occurred.';
      loginMessage.style.color = 'red';
  
    }
  });
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
 
  
  
  
  
  
  });
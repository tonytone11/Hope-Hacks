const stored =sessionStorage.getItem('message');
const welcomeMessage = document.querySelector(".welcomeMessage");

welcomeMessage.textContent = stored;


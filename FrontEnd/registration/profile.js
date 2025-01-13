document.addEventListener('DOMContentLoaded', () => {
    const firstname = sessionStorage.getItem('Firstname');
    const email = sessionStorage.getItem('email');
    const lastName = sessionStorage.getItem('lastName');
    const phoneNumber = sessionStorage.getItem('phoneNumber');

    const profileitem1 = document.querySelector(".profileitem1");
    const profileitem2 = document.querySelector(".profileitem2");
    const profileitem3 = document.querySelector(".profileitem3");
    const profileitem4 = document.querySelector(".profileitem4");

    profileitem1.textContent = firstname || "First Name Not Found";
    profileitem2.textContent = lastName || "Last Name Not Found";
    profileitem3.textContent = email || "Email Not Found";
    profileitem4.textContent = phoneNumber || "Phone Number Not Found";
});

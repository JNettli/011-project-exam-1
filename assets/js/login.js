const loginRequest = 'https://v2.api.noroff.dev/auth/login';
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

loginButton.addEventListener("click", function() {
    fetch(loginRequest, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: 
        JSON.stringify({
            "email": `${username.value}`, 
            "password": `${password.value}`
        }),
    })
    .then(response => response.json())
    .then(result => localStorage.setItem("AuthToken", result.data.accessToken))
    .then(() => localStorage.setItem("LoggedIn", true))
    .then(() => localStorage.setItem("User", username.value))
    .then(() => location.reload())
});

function loggedInCheck() {
    if (localStorage.getItem("LoggedIn") === "true") {
        logoutButton.classList.remove("hidden");
        console.log("Logged in!");
        document.querySelector(".loginContainer").style.display = "none";
        document.querySelector(".loggedIn").classList.remove("hidden");
        document.getElementById("loggedInUser").innerText = localStorage.getItem("User");
    } else {
        logoutButton.classList.add("hidden");
        console.log("Not logged in!");
    }
}

loggedInCheck();

const loginRequest = 'https://v2.api.noroff.dev/auth/login';
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginButton = document.getElementById("loginNow");
const logoutButton = document.getElementById("logoutButton");
const burger = document.getElementById("burgerIcon");
const closeButton = document.getElementById("closeButton");
const burgerMenu = document.getElementById("burgerMenu");

burger.addEventListener("click", function() {
    burgerMenu.classList.remove("hidden");
    closeButton.classList.remove("hidden");
});

closeButton.addEventListener("click", function() {
    burgerMenu.classList.add("hidden");
    closeButton.classList.add("hidden");
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
    .then(result => {
        localStorage.setItem("AuthToken", result.data.accessToken);
        localStorage.setItem("authorName", result.data.name);
        localStorage.setItem("LoggedIn", true);
        localStorage.setItem("User", username.value);
        location.reload();
    });
});

function loggedInCheck() {
    if (localStorage.getItem("LoggedIn") === "true") {
        logoutButton.classList.remove("hidden");
        console.log("Logged in!");
        document.querySelector(".loginContainer").style.display = "none";
        document.querySelector(".loggedIn").classList.remove("hidden");
        document.getElementById("loggedInUser").innerText = localStorage.getItem("User");
    } else {
        loginButton.classList.remove("hidden");
        logoutButton.classList.add("hidden");
        console.log("Not logged in!");
    }
}

loggedInCheck();

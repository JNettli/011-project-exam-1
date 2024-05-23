const allPosts = 'https://v2.api.noroff.dev/blog/posts/jnettli';
const loginRequest = 'https://v2.api.noroff.dev/auth/login';
const userName = document.getElementById("username");
const password = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logout");
const postTitle = document.querySelector(".postTitle");
const postText = document.querySelector(".postText");
const postImage = document.querySelector(".postImage");
const postButton = document.querySelector(".postButton");


function makePostRequest() {
    const postTitle = document.getElementById("postTitle");
    const postText = document.getElementById("postText");
    const postImage = document.getElementById("postImage");

    fetch(allPosts,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + `${localStorage.getItem('Auth Token: ')}`
            },
            body: 
            JSON.stringify({
                "title": `${postTitle.value}`, 
                "body": `${postText.value}`,
                "media": {
                    "url": `${postImage.value}`
                }
            }),
        })
        .then(response => response.json())
        .then(result => console.log(result))
        .then(() => location.reload())
        .catch(error => console.log("There was an error: " + error));
}

function loginModalTime() {
    const loginScreen = document.querySelector(".loginScreen");
    loginScreen.classList.toggle("show");
}

logoutButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

function deletePost() {
    console.log("Delete post!");
}

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
    .then(result => localStorage.setItem("Auth Token: ", result.data.accessToken))
    .then(() => localStorage.setItem("Logged In: ", true))
    .then(() => localStorage.setItem("User: ", username.value))
    .then(() => location.reload())
});

function loggedInCheck() {
    if (localStorage.getItem("Logged In: ") === "true") {
        const postCreator = document.getElementById("postCreator");
        const newPostAnchor = document.querySelector(".newPostAnchor");
        postCreator.style.display = "flex";
        logoutButton.style.display = "block";
        console.log("Logged in!")
    } else {
        newPostAnchor.style.display = "none";
        loginButton.style.display = "block";
        logoutButton.style.display = "none";
        console.log("Not logged in!")
    }
}

loggedInCheck();

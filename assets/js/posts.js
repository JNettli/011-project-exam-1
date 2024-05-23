function loggedInCheck() {
    if (localStorage.getItem("Logged In: ") === "true") {
        const postCreator = document.getElementById("postCreator");
        const newPostAnchor = document.querySelector(".newPostAnchor");
        newPostAnchor.style.display = "block";
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
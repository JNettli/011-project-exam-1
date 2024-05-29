const loginButton = document.getElementById("loginNow");
const logoutButton = document.getElementById("logoutButton");
const getPostId = new URLSearchParams(window.location.search).get('id');
const getAuthorName = new URLSearchParams(window.location.search).get('author');
const postUrl = `https://v2.api.noroff.dev/blog/posts/${getAuthorName}/${getPostId}`;
const content = document.getElementById("postContent");
const editButton = document.getElementById("edit");
const deleteButton = document.getElementById("delete");
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

logoutButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

function displayPost() {
    fetch(postUrl)
    .then(response => response.json())
    .then(data => {
        document.title = `${data.data.title} - The Bob Loblaw Law Blog`;
        const upperDiv = document.createElement("div");
        const mainImage = document.createElement("img");
        const mainText = document.createElement("div");
        upperDiv.classList.add("upperDiv");
        mainText.classList.add("mainText");
        mainImage.src = data.data.media.url;
        mainImage.classList.add("mainImage");
        content.appendChild(upperDiv);
        upperDiv.appendChild(mainImage);
        content.appendChild(mainText);
        
        const postTitle = document.createElement("h1");
        postTitle.innerText = data.data.title;
        postTitle.classList.add("postTitle");
        mainText.appendChild(postTitle);

        const postAuthor = document.createElement("div");
        postAuthor.classList.add("postAuthor");
        postAuthor.innerText = "Author: " + data.data.author.name;
        mainText.appendChild(postAuthor);

        const postText = document.createElement("p");
        postText.innerText = data.data.body;
        mainText.appendChild(postText);

    })
    .catch(error => {
        console.error("Error: ", error);
    });
}

editButton.addEventListener("click", function() {
    location.href = `/post/edit.html?id=${getPostId}&author=${getAuthorName}`;
});

deleteButton.addEventListener("click", function() {
    if(confirm("Are you sure you want to delete this post?") === true) {
        fetch(postUrl, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + `${localStorage.getItem('AuthToken')}`
            }
        })
        .then(() => location.href = "/index.html")
        .then(() => alert("Post was deleted."))
        .catch(error => {
            console.error("Error: ", error);
        });
    } else {
        alert("Post was not deleted.");
    }
});

displayPost();

function loggedInCheck() {
    if (localStorage.getItem("LoggedIn") === "true") {
        loginButton.classList.add("hidden");
        logoutButton.classList.remove("hidden");
        editButton.classList.remove("hidden");
        deleteButton.classList.remove("hidden");
        console.log("Logged in!");
    } else {
        loginButton.classList.remove("hidden");
        logoutButton.classList.add("hidden");
        editButton.classList.add("hidden");
        deleteButton.classList.add("hidden");
        console.log("Not logged in!");
    }
}

loggedInCheck();

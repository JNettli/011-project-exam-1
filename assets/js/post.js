const loginButton = document.getElementById("loginButtonLink");
const getPostId = new URLSearchParams(window.location.search).get('id');
const getAuthorName = new URLSearchParams(window.location.search).get('author');
const postUrl = `https://v2.api.noroff.dev/blog/posts/${getAuthorName}/${getPostId}`;
const content = document.getElementById("postContent");
const deleteButton = document.getElementById("delete");

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

/*deleteButton.addEventListener("click", function() {
    fetch(postUrl, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + `${localStorage.getItem('AuthToken')}`
        }
    })
    .then(() => location.href = "/index.html")
    .catch(error => {
        console.error("Error: ", error);
    });
});*/

displayPost();

function loggedInCheck() {
    if (localStorage.getItem("LoggedIn") === "true") {
        loginButton.classList.add("hidden");
        logoutButton.classList.remove("hidden");
        console.log("Logged in!");
    } else {
        loginButton.classList.remove("hidden");
        logoutButton.classList.add("hidden");
        console.log("Not logged in!");
    }
}

loggedInCheck();

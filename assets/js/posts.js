const allPosts = 'https://v2.api.noroff.dev/blog/posts/jnettli';
const postTitle = document.querySelector(".postTitle");
const postText = document.querySelector(".postText");
const postImage = document.querySelector(".postImage");
const postButton = document.querySelector(".postButton");
const newPostAnchor = document.querySelector(".newPostAnchor");
const loginButton = document.getElementById("loginButtonLink");
let page = 1;
const postsPerPage = 12;

async function getData() {
    const skip = (page - 1) * postsPerPage;
    const allPosts = `https://v2.api.noroff.dev/blog/posts/jnettli?limit=${postsPerPage}&skip=${skip}`;
    try {
        const res = await fetch(allPosts);
        if (!res.ok) {
            throw new Error("Could not fetch resource!");
        }
        const data = await res.json();
        console.log('Success: ', data.data);
        for (let i = 0; i < data.data.length; i++) {
            displayPosts(data.data[i]);
        }
    } catch (error) {
        console.error('There was an error: ', error);
    }
}

function displayPosts(post) {
    const titleOfPost = document.createElement("div");
    titleOfPost.classList.add("titleOfPost");
    titleOfPost.innerText = post.title;
    
    const postDiv = document.createElement("div");
    postDiv.classList.add("postDiv");
    
    const postContent = document.createElement("div");
    postContent.innerText = post.body;
    postContent.classList.add("postContent");

    const deletePost = document.createElement("button");
    deletePost.innerHTML = `Delete post!`;
    deletePost.title = `Delete post!`;
    deletePost.classList.add("deletePost");
    deletePost.id = post.id;
    deletePost.addEventListener("click", function deletePost(){
        const deletePost = document.querySelector(".deletePost");
            console.log(post.id)
            fetch(allPosts + "/" + deletePost.id,
                {
                    method: 'DELETE',
                    headers: {
                        "Authorization": "Bearer " + `${localStorage.getItem('Auth Token: ')}`
                    }
                })
                .then(() => location.reload())
    });

    const editPost = document.createElement("button");
    editPost.innerHTML = `Edit!`;
    editPost.title = `Edit post!`;
    editPost.classList.add("editPost");
    editPost.id = post.id;
    editPost.addEventListener("click", function editPost(){
        const editPost = document.querySelector(".editPost");
        console.log(post.id)
        fetch(allPosts + "/" + editPost.id,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + `${localStorage.getItem('Auth Token: ')}`,
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
    });

    const postAuthor = document.createElement("div");
    postAuthor.classList.add("postAuthor");
    postAuthor.innerText = `${post.author.name}, ${post.author.email}`;
    
    const postDate = document.createElement("div");
    postDate.innerText = post.created;
    postDate.classList.add("postDate");
    
    const postImg = document.createElement("img");
    postImg.alt = `${post.media.alt}`;
    postImg.classList.add("postImg");
    if(post.media && post.media.url) {
        postImg.src = `${post.media.url}`;
    } else {
        postImg.src = `https://via.placeholder.com/150`;
    }

    const headerDiv = document.createElement("div");
    headerDiv.classList.add("headerDiv");
    const customizeDiv = document.createElement("div");
    customizeDiv.classList.add("customizeDiv");
    
    postDiv.appendChild(headerDiv);
    headerDiv.appendChild(titleOfPost);
    headerDiv.appendChild(customizeDiv);
    customizeDiv.appendChild(deletePost);
    customizeDiv.appendChild(editPost);
    postDiv.appendChild(postContent);
    postDiv.appendChild(postAuthor);
    postDiv.appendChild(postImg);
    postDiv.appendChild(postDate);
    
    const postContainer = document.getElementById("content");
    postContainer.appendChild(postDiv);
}

getData();

logoutButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

function loggedInCheck() {
    if (localStorage.getItem("LoggedIn") === "true") {
        const newPostAnchor = document.querySelector(".newPostAnchor");
        newPostAnchor.style.display = "block";
        loginButton.classList.add("hidden");
        logoutButton.classList.remove("hidden");
        console.log("Logged in!")
    } else {
        newPostAnchor.style.display = "none";
        loginButton.classList.remove("hidden");
        logoutButton.classList.add("hidden");
        console.log("Not logged in!")
    }
}

loggedInCheck();
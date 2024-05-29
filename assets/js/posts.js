const allPosts = 'https://v2.api.noroff.dev/blog/posts/jnettli';
const postTitle = document.querySelector(".postTitle");
const postText = document.querySelector(".postText");
const postImage = document.querySelector(".postImage");
const postButton = document.querySelector(".postButton");
const newPostAnchor = document.querySelector(".newPostAnchor");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const deletePost = document.querySelector(".deletePost");
const newest = document.getElementById("filterNewest");
const oldest = document.getElementById("filterOldest");
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

let allPostsData = [];

async function fetchAllPosts() {
    try {
        const res = await fetch(allPosts);
        if (!res.ok) {
            throw new Error("Could not fetch resource!");
        }
        const data = await res.json();
        allPostsData = data.data;
        return data.data;
    } catch (error) {
        console.error('There was an error: ', error);
    }
}

function displayPosts(post) {
    const titleOfPost = document.createElement("div");
    titleOfPost.classList.add("titleOfPost");
    titleOfPost.innerText = post.title;
    
    const postDiv = document.createElement("a");
    postDiv.classList.add("postDivPublic");
    postDiv.href = `/post/post.html?id=${post.id}/&author=${post.author.name}`;
    
    const postContent = document.createElement("div");
    postContent.innerText = post.body;
    postContent.classList.add("postContent");

    const postAuthor = document.createElement("div");
    postAuthor.classList.add("postAuthor");
    postAuthor.innerText = `${post.author.name}`;
    
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
    
    postDiv.appendChild(postImg);
    postDiv.appendChild(headerDiv);
    headerDiv.appendChild(titleOfPost);
    postDiv.appendChild(postAuthor);
    postDiv.appendChild(postDate);
    
    const postContainer = document.getElementById("content");
    postContainer.appendChild(postDiv);
}

function displayLimitedPosts(page = 1, postsPerPage = 12) {
    const skip = (page - 1) * postsPerPage;
    const limitedPosts = allPostsData.slice(skip, skip + postsPerPage);
    for (let i = 0; i < limitedPosts.length; i++) {
        displayPosts(limitedPosts[i]);
    }
    createPagination(allPostsData.length, postsPerPage);
}

newest.addEventListener("click", function() {
    filterNewestOldest("newest");
});

oldest.addEventListener("click", function() {
    filterNewestOldest("oldest");
});

async function filterNewestOldest(timeCreated, page = 1, postsPerPage = 12) {
    let filteredResults = [];

    if (timeCreated === "newest") {
        filteredResults = allPostsData.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else if (timeCreated === "oldest") {
        filteredResults = allPostsData.sort((a, b) => new Date(a.created) - new Date(b.created));
    }

    const skip = (page - 1) * postsPerPage;
    const limitedPosts = filteredResults.slice(skip, skip + postsPerPage);

    content.innerHTML = "";
    for (const post of limitedPosts) {
        displayPosts(post);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    fetchAllPosts().then(() => {
        displayLimitedPosts();
    });
});

function createPagination(totalPosts, postsPerPage) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.addEventListener("click", function() {
            content.innerHTML = "";
            displayLimitedPosts(i);
        });
        pagination.appendChild(pageButton);
    }
}

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
    } else {
        newPostAnchor.style.display = "none";
        loginButton.classList.remove("hidden");
        logoutButton.classList.add("hidden");
    }
}

loggedInCheck();
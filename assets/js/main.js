const allPosts = 'https://v2.api.noroff.dev/blog/posts/jnettli';
const postTitle = document.querySelector(".postTitle");
const postText = document.querySelector(".postText");
const postImage = document.querySelector(".postImage");
const postButton = document.querySelector(".postButton");

async function getData() {
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

    const postAuthor = document.createElement("div");
    postAuthor.classList.add("postAuthor");
    
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
    postDiv.appendChild(postContent);
    postDiv.appendChild(postAuthor);
    postDiv.appendChild(postImg);
    postDiv.appendChild(postDate);
    
    const postContainer = document.getElementById("content");
    postContainer.appendChild(postDiv);
}

getData();

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

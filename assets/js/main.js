const allPosts = 'https://v2.api.noroff.dev/blog/posts/jnettli';
const loginRequest = 'https://v2.api.noroff.dev/auth/login';

getData();

async function getData() {
    try {
        const res = await fetch(allPosts);
        if (!res.ok) {
            throw new Error("Could not fetch resource!");
        }
    const data = await res.json();
    console.log('Success: ', data.data);
    console.log(data.data[0].title)
    } catch (error) {
        console.error('There was an error: ', error);
    }
}

function sendPost() {
    console.log("Hello! :)");
}

function displayPosts(data) {
    const postTitle = document.createElement("div");
    postTitle.classList.add("postTitle");
    const postDiv = document.createElement("div");
    postTitle.innerText = data.data.title;
    postDiv.classList.add("postDiv");
    const postContent = document.createElement("div");
    postContent.innerText = data.data.body;
    postContent.classList.add("postContent");
    const postAuthor = document.createElement("div");
    postAuthor.classList.add("postAuthor");
    const postDate = document.createElement("div");
    postDate.innerText = data.data.created;
    postDate.classList.add("postDate");
    const postImage = document.createElement("img");
    postImage.src = `${data.data.media.url}`;
    postImage.alt = `Beautiful post image!`;
    postImage.classList.add("postImage");

}

function makeLoginRequest() {
    fetch(loginRequest,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: 
            {
                "email": "jonnet01270@stud.noroff.no", 
                "password": "password"
            }
        })
        .then(response => response.json());
    }
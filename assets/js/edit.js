const getPostId = new URLSearchParams(window.location.search).get("id");
const getAuthorName = new URLSearchParams(window.location.search).get("author");
const authorNameLocalStorage = localStorage.getItem("authorName");
const postUrl = `https://v2.api.noroff.dev/blog/posts/${getAuthorName}/${getPostId}`;
const generalPost = `https://v2.api.noroff.dev/blog/posts/${authorNameLocalStorage}`;
const saveButton = document.getElementById("overrideButton");
const editButton = document.getElementById("editButton");
const check = new URLSearchParams(window.location.search).get("id") === null;

if (new URLSearchParams(window.location.search).get("id") === null) {
    document.title = "Create a New Post - The Bob Loblaw Law Blog";
    editButton.classList.remove("hidden");
    document.getElementById("edit").classList.add("hidden");
    document.getElementById("delete").classList.add("hidden");
    editButton.addEventListener("click", function(event) {
        event.preventDefault();
        const postTitle = document.getElementById("title");
        const postText = document.getElementById("content");
        const postImage = document.getElementById("img");
        fetch(generalPost,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + `${localStorage.getItem('AuthToken')}`
                },
                body: JSON.stringify({
                    title: `${postTitle.value}`, 
                    body: `${postText.value}`,
                    media: {
                        url: `${postImage.value}`
                    }
                }),
            })
            .then(() => location.href = "/index.html")
            .then(() => alert("Post created!"))
            .catch(error => console.log("There was an error: " + error));
    });
} else {
    async function getData() {
        try {
            const res = await fetch(postUrl);
            if (!res.ok) {
                throw new Error("Could not fetch resource!");
            }
            const data = await res.json();
            document.title = `${data.data.title} - The Bob Loblaw Law Blog`;

            const postTitleField = document.getElementById("title");
            const postContentField = document.getElementById("content");
            const postImageField = document.getElementById("img");

            postTitleField.value = data.data.title;
            postContentField.value = data.data.body;
            postImageField.value = data.data.media.url;

                saveButton.classList.remove("hidden");

                saveButton.addEventListener("click", async function(event) {
                event.preventDefault();
                
                const postTitle = postTitleField.value;
                const postContent = postContentField.value;
                const postImage = postImageField.value;
                try {
                    const response = await fetch(postUrl, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + `${localStorage.getItem('AuthToken')}`,
                        },
                        body: JSON.stringify({
                            "title": postTitle,
                            "body": postContent,
                            "media": {
                                "url": postImage
                            }
                        }),
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    } else {
                        location.href = `/post/post.html?id=${getPostId}&author=${getAuthorName}`;
                        alert("Post updated!");
                    }
                } catch (error) {
                    console.error("There was an error: ", error);
                }
            });
        } catch (error) {
            console.error("There was an error: ", error);
        }
    }
    getData();
}


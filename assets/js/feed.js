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
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

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

async function getImages() {
    try {
        const res = await fetch(allPosts);
        if (!res.ok) {
            throw new Error("Could not fetch resource!");
        }
        const data = await res.json();
        const firstImg = data.data[0].media.url;
        const secondImg = data.data[1].media.url;
        const thirdImg = data.data[2].media.url;

        const track = document.querySelector(".slides");
        const slide1 = document.createElement("li");
        const img1 = document.createElement("img");
        img1.classList.add("carouselImage");
        slide1.classList.add("carouselSlide");
        slide1.classList.add("currentSlide");
        img1.src = firstImg;
        track.appendChild(slide1);
        slide1.appendChild(img1);
        
        const slide2 = document.createElement("li");
        const img2 = document.createElement("img");
        img2.classList.add("carouselImage");
        slide2.classList.add("carouselSlide");
        img2.src = secondImg;
        track.appendChild(slide2);
        slide2.appendChild(img2);
        
        const slide3 = document.createElement("li");
        const img3 = document.createElement("img");
        img3.classList.add("carouselImage");
        slide3.classList.add("carouselSlide");
        img3.src = thirdImg;
        track.appendChild(slide3);
        slide3.appendChild(img3);

        // https://www.youtube.com/watch?v=gBzsE0oieio for help with carousel

        const dotsNav = document.querySelector(".carouselNav");
        const dots = Array.from(dotsNav.children);
        const slides = Array.from(track.children);
        const slideWidth = slides[0].getBoundingClientRect().width;

        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + "px";
        }

        slides.forEach(setSlidePosition);

        const moveToSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = "translateX(-" + targetSlide.style.left + ")";
            currentSlide.classList.remove("currentSlide");
            targetSlide.classList.add("currentSlide");
        }

        const updateDots = (currentDot, targetDot) => {
            currentDot.classList.remove("currentSlide");
            targetDot.classList.add("currentSlide");
        }

        const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
            if (targetIndex === 0) {
                prevButton.classList.add("hidden");
                nextButton.classList.remove("hidden");
            } else if (targetIndex === slides.length - 1) {
                prevButton.classList.remove("hidden");
                nextButton.classList.add("hidden");
            } else {
                prevButton.classList.remove("hidden");
                nextButton.classList.remove("hidden");
            }
        }

        prevButton.addEventListener("click", e => {
            const currentSlide = track.querySelector(".currentSlide");
            const prevSlide = currentSlide.previousElementSibling;
            const currentDot = dotsNav.querySelector(".currentSlide");
            const prevDot = currentDot.previousElementSibling;
            const prevIndex = slides.findIndex(slide => slide === prevSlide);

            moveToSlide(track, currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
            hideShowArrows(slides, prevButton, nextButton, prevIndex);
        });

        nextButton.addEventListener("click", e => {
            const currentSlide = track.querySelector(".currentSlide");
            const nextSlide = currentSlide.nextElementSibling;
            const currentDot = dotsNav.querySelector(".currentSlide");
            const nextDot = currentDot.nextElementSibling;
            const nextIndex = slides.findIndex(slide => slide === nextSlide);

            moveToSlide(track, currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
            hideShowArrows(slides, prevButton, nextButton, nextIndex);
        });

        dotsNav.addEventListener("click", e => {
            const targetDot = e.target.closest("button");

            if (!targetDot) return;

            const currentSlide = track.querySelector(".currentSlide");
            const currentDot = dotsNav.querySelector(".currentSlide");
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIndex];

            moveToSlide(track, currentSlide, targetSlide);
            updateDots(currentDot, targetDot);
            hideShowArrows(slides, prevButton, nextButton, targetIndex);
        });

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

getImages();
getData();

function loggedInCheck() {
    if (localStorage.getItem("Logged In: ") === "true") {
        logoutButton.style.display = "block";
        console.log("Logged in!")
    } else {
        loginButton.style.display = "block";
        logoutButton.style.display = "none";
        console.log("Not logged in!")
    }
}

loggedInCheck();
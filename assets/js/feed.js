const postTitle = document.querySelector(".postTitle");
const postText = document.querySelector(".postText");
const postImage = document.querySelector(".postImage");
const postButton = document.querySelector(".postButton");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
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

async function imageCarousel() {
    const postImages = `https://v2.api.noroff.dev/blog/posts/jnettli`;
    try {
        const res = await fetch(postImages);
        if (!res.ok) {
            throw new Error("Could not fetch resource!");
        }
        const data = await res.json();
        const firstImg = data.data[0].media.url;
        const secondImg = data.data[1].media.url;
        const thirdImg = data.data[2].media.url;

        const track = document.querySelector(".slides");
        const slide1 = document.createElement("li");
        const imgLink1 = document.createElement("a");
        const img1 = document.createElement("img");
        img1.classList.add("carouselImage");
        slide1.classList.add("carouselSlide");
        slide1.classList.add("currentSlide");
        imgLink1.href = "/post/post.html?id=" + data.data[0].id + "&author=" + data.data[0].author.name;
        img1.src = firstImg;
        track.appendChild(slide1);
        slide1.appendChild(imgLink1);
        imgLink1.appendChild(img1);
        
        const slide2 = document.createElement("li");
        const imgLink2 = document.createElement("a");
        const img2 = document.createElement("img");
        img2.classList.add("carouselImage");
        slide2.classList.add("carouselSlide");
        img2.src = secondImg;
        imgLink2.href = "/post/post.html?id=" + data.data[1].id + "&author=" + data.data[1].author.name;
        track.appendChild(slide2);
        slide2.appendChild(imgLink2);
        imgLink2.appendChild(img2);
        
        const slide3 = document.createElement("li");
        const imgLink3 = document.createElement("a");
        const img3 = document.createElement("img");
        img3.classList.add("carouselImage");
        slide3.classList.add("carouselSlide");
        img3.src = thirdImg;
        imgLink3.href = "/post/post.html?id=" + data.data[2].id + "&author=" + data.data[2].author.name;
        track.appendChild(slide3);
        slide3.appendChild(imgLink3);
        imgLink3.appendChild(img3);

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
    const postDiv = document.createElement("a");
    postDiv.classList.add("postDiv");
    postDiv.href = `/post/post.html?id=${post.id}/&author=${post.author.name}`;


    const postTitle = document.createElement("div");
    postTitle.classList.add("postTitle");
    postTitle.innerText = post.title;
    
    const postImg = document.createElement("img");
    postImg.alt = `${post.media.alt}`;
    postImg.classList.add("postImg");
    if(post.media && post.media.url) {
        postImg.src = `${post.media.url}`;
    } else {
        postImg.src = "../assets/images/martin.png";
    }
    postDiv.appendChild(postTitle);
    postDiv.appendChild(postImg);
    
    const postContainer = document.getElementById("content");
    postContainer.appendChild(postDiv);
}

imageCarousel();
getData();

logoutButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

function loggedInCheck() {
    if (localStorage.getItem("LoggedIn") === "true") {
        logoutButton.classList.remove("hidden");
        console.log("Logged in!");
    } else {
        logoutButton.classList.add("hidden");
        document.getElementById("loginButtonLink").classList.remove("hidden");
        console.log("Not logged in!");
    }
}

loggedInCheck();

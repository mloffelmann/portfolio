// UI VARIABLES
const carousel = document.getElementById("carousel");
const slides = document.querySelectorAll(".slide");
const labels = document.querySelectorAll(".label");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
const backToTopButton = document.getElementById("back-to-top");
const overlay = document.querySelector(".overlay");
const labelCoding = document.getElementById("label-coding");
const labelUxUi = document.getElementById("label-ux-ui");
const labelWebDesign = document.getElementById("label-web-design");
const labelPrint = document.getElementById("label-print");
const buttonCoding = document.getElementById("button-coding");
const buttonUxUi = document.getElementById("button-ux-ui");
const buttonWebDesign = document.getElementById("button-web-design");
const buttonPrint = document.getElementById("button-print");

// EVENT LISTENERS
arrowRight.addEventListener("click", () => { carouselSkip(true); pause = true; });
arrowLeft.addEventListener("click", () => { carouselSkip(false); pause = true; });
carousel.addEventListener("mouseleave", () => { pause = false; });
backToTopButton.addEventListener("click", backToTop);
labelCoding.addEventListener("click", gitHubProfile);
labelUxUi.addEventListener("click", () => { showcase("gallery-ux-ui"); });
labelWebDesign.addEventListener("click", () => { showcase("gallery-web-design"); });
labelPrint.addEventListener("click", () => { showcase("gallery-print"); });
buttonCoding.addEventListener("click", gitHubProfile);
buttonUxUi.addEventListener("click", () => { showcase("gallery-ux-ui"); });
buttonWebDesign.addEventListener("click", () => { showcase("gallery-web-design"); });
buttonPrint.addEventListener("click", () => { showcase("gallery-print"); });

// GLOBAL VARIABLES
let progressStatus = 0;
let slideIndex = 0;
let activeSlide = slides[slideIndex];
let activeLabel = labels[slideIndex];
let progressInterval = setInterval(carouselEngine, 100); // 180
let pause = false;

// FUNCTIONS

// Carousel
function carouselSkip(direction) {
    // compensate for animation duration
    progressStatus = -5;
    // reset progress bar
    activeLabel.querySelector(".progress-bar-fill").style.width = 0;
    document.querySelector(".progress-bar-mobile .progress-bar-fill").style.width = 0;
    // make slide and label passive
    carouselItemsState(false);
    // if direction is forward
    if (direction === true) {
        // increment slideIndex
        slideIndex++;
        // if it's on the last slide
        if (slideIndex === labels.length) {
            // reset slideIndex to first slide
            slideIndex = 0;
        }
        // if direction is back
    } else if (direction === false) {
        // if it's on the first slide
        if (slideIndex === 0) {
            // reset slideIndex to last slide
            slideIndex = labels.length - 1;
        } else {
            // decrement slideIndex
            slideIndex--;
        }
    }
    // set both label and slide to new value
    activeLabel = labels[slideIndex];
    activeSlide = slides[slideIndex];
    // make slide and label active
    carouselItemsState(true);
}
function carouselItemsState(state) {
    if (state === true) {
        // make slide active
        activeSlide.classList.add("active");
        activeSlide.classList.remove("passive");
        // make label active
        activeLabel.classList.add("active");
    } else if (state === false) {
        // make slide passive
        activeSlide.classList.add("passive");
        activeSlide.classList.remove("active");
        // make label passive
        activeLabel.classList.remove("active");
    }
}
function carouselProgress() {
    // increment progress
    progressStatus++;
    // set bar fill
    activeLabel.querySelector(".progress-bar-fill").style.width = `${progressStatus}%`;
    document.querySelector(".progress-bar-mobile .progress-bar-fill").style.width = `${progressStatus}%`;
}
function carouselPause() {
    if (pause === false) {
        pause = true;
    }
}
function carouselEngine() {
    // if progress complete
    if (progressStatus === 100) {
        carouselSkip(true);
    } else {
        if (pause === true) {
            // pause
        } else {
            carouselProgress();
        }
    }
}

// Showcase
function showcase(gallery) {
    // display gallery
    document.getElementById(`${gallery}`).style.display = "flex";
    // pause carousel progress
    setTimeout(carouselPause, 100);
    // gather thumbnails into set
    const thumbnails = document.querySelectorAll(`.${gallery}-thumbnail`);
    // iterate
    thumbnails.forEach(thumbnail => {
        // add event listener
        thumbnail.addEventListener("click", () => { document.getElementById(`${gallery}-preview`).src = thumbnail.src });
    });
    // close gallery
    const closeButtons = document.querySelectorAll(".close-gallery");
    closeButtons.forEach(closeButton => {
        closeButton.addEventListener("click", () => { document.getElementById(`${gallery}`).style.display = "none"; pause = false; });
    });
}

function gitHubProfile() {
    window.open("https://github.com/octofoo", "_blank");
}

// Back to top
function backToTop() {
    // let empty variable
    let scrollUp;
    // if body or html elements are not top
    if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) {
        // scroll 50 px up
        window.scrollBy(0, -50);
        // set scrollUp to run this function in 10 ms
        scrollUp = setTimeout(backToTop, 10);
    } else {
        // stop running
        clearTimeout(scrollUp);
    }
}


// Home

document.addEventListener("DOMContentLoaded", function () {
    var checkbox = document.getElementById("nav_check");
    var navLinks = document.querySelectorAll(".nav-links");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
             // Prevent the default behavior
            checkbox.checked = false; // Close the mobile navigation
        });
    });
});

// Scrolling 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});



const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


// Hunger Free
function updateCounts() {
    // Retrieve counts from local storage or initialize to specified values
    let count1 = parseInt(localStorage.getItem('count1')) || 152;
    let count2 = parseInt(localStorage.getItem('count2')) || 36500;

    // Update counts
    count1 += 1;
    count2 += 250;

    // Update HTML
    document.getElementById('count1').textContent = `${count1} Days`;
    document.getElementById('count2').textContent = `${count2}`;

    // Store counts in local storage
    localStorage.setItem('count1', count1);
    localStorage.setItem('count2', count2);
}

// Check if counts are already in local storage before updating
if (!localStorage.getItem('count1') || !localStorage.getItem('count2')) {
    // Initial update only if counts are not present in local storage
    updateCounts();
}

// Set interval to update counts every 24 hours (in milliseconds)
const updateInterval = 24 * 60 * 60 * 1000;
setInterval(updateCounts, updateInterval);


// Dismiss Block

let dismissBlock = document.getElementById('dismissBlock');

function dismissClose() {
    dismissBlock.style.display = "none";
}


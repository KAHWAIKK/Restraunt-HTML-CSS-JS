'use strict'

/*  preload 
 loading will end after document is loaded
*/

const preloader = document.querySelector("[data-preload]")

window.addEventListener("load", function(){
    preloader.classList.add("loaded")
    this.document.body.classList.add("loaded")
} )

/* add event on multiple elements */


//It loops through all elements and attaches the event listener to each one.
const addEventOnElements = function(elements, eventType, callback){
    for(let i = 0, len = elements.length; i < len ; i++){
        elements[i].addEventListener(eventType,callback)
    }
}

// NAVBAR

//
const navbar = document.querySelector("[data-navbar]")

const navTogglers = document.querySelectorAll("[data-nav-toggler]")

const overlay = document.querySelector("[data-overlay]")

const toggleNavbar = function(){
    navbar.classList.toggle("active")//Shows/hides the navbar
    overlay.classList.toggle("active")//Shows/hides the background overlay
    document.body.classList.toggle("nav-active")// Can be used in CSS to prevent scrolling or apply a dim effect
}

addEventOnElements(navTogglers, "click",toggleNavbar)
//to add the same event listener (toggleNavbar) to multiple elements stored in navTogglers.

/*  HEADER */

const header = document.querySelector("[data-header]")

let lastScrollPos = 0;


const hideHeader = function () {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if(isScrollBottom){
        header.classList.add("hide");
    } else {
        header.classList.remove("hide")
    }
lastScrollPos = window.scrollY
//a variable that tracks the previous scroll position 

    
}
//hideHeader function is a great pattern for hiding the header on scroll down and showing it again on scroll up — commonly used in modern, minimal UIs (e.g., mobile navbars that hide while reading).

/* window.scrollY: the current vertical scroll.

Compares the two:

If you're scrolling down, it adds hide class.

If scrolling up, it removes hide, showing the header again.

Finally, it updates lastScrollPos with the current scroll position. */

window.addEventListener("scroll" , function () {
    if(window.scrollY >= 50){
        header.classList.add("active");
        hideHeader();
    }else{
        header.classList.remove("active")
    }
})
/* window.scrollY: Tells how far the page is scrolled vertically.

>= 50: When the page is scrolled down 50 pixels or more…

header.classList.add("active"): Adds the class active to the header (usually to apply a different style).

else: Removes it again when back to the top. */

/* == HERO SLIDER=== */

const heroSlider = document.querySelector("[data-hero-slider]")
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]")
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]")
const heroSliderNextBtn = document.querySelector("[data-prev-btn]")

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0]

const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active")
    heroSliderItems[currentSlidePos].classList.add("active")
    lastActiveSliderItem=heroSliderItems[currentSlidePos]
}

const slideNext = function () {
    if(currentSlidePos >= heroSliderItems.length -1){
        currentSlidePos = 0
    } else {
        currentSlidePos++;
    }

    updateSliderPos()
}
/* 
1. Checks if the current slide is the last one.
2.If yes, resets to the first slide.
3.If not, increments the slide position.
4.Then calls updateSliderPos() to reflect the change in the UI.
5.The slideNext function is bound to a "next" button click.
*/

heroSliderNextBtn.addEventListener("click", slideNext)

/* 
1.Adds an event listener to the heroSliderNextBtn DOM element.
2.On a "click" event, it calls the slideNext function.
3.
*/

const slidePrev = function () {
    if (currentSlidePos <= 0){
        currentSlidePos = heroSliderItems.length - 1
    }else {
        currentSlidePos--;
    }

    updateSliderPos()
}
/* 
1.Checks if the current slide is the first one (i.e., index 0 or less).
2.If yes, it wraps around to the last slide.

heroSliderItems.length - 1 gives you the index of the last item in the slider.
3.If you’re not on the first slide, just go to the previous slide by decrementing currentSlidePos.
*/

heroSliderPrevBtn.addEventListener("click", slidePrev)
/* 
1.Adds an event listener to the heroSliderNextBtn DOM element.
2.On a "click" event, it calls the slideNext function.
3.
*/

/* == AUTO-SLIDE */

let autoSlideInterval;
//Declares a global variable autoSlideInterval to hold the interval ID.
const autoSlide = function() {
    autoSlideInterval = setInterval(function () {
        slideNext();
    },7000)
}
/* Defines autoSlide as a function that starts a repeating call to slideNext() every 7000 milliseconds (7 seconds). */

addEventOnElements([heroSliderNextBtn,heroSliderPrevBtn], "mouseover" , function(){
    clearInterval(autoSlideInterval)
})

/* 
1.addEventOnElements(...) — likely a custom helper function you've defined to add event listeners to multiple elements at once. to add the same event listener (toggleNavbar) to multiple elements stored in navTogglers.
2.[heroSliderNextBtn, heroSliderPrevBtn] — an array of DOM elements (your navigation buttons).
3."mouseover" — the event you're listening for (when the mouse hovers over these buttons).
4.function() { clearInterval(autoSlideInterval); } — stops the automatic sliding when the user hovers over either button.
*/

addEventOnElements([heroSliderNextBtn,heroSliderPrevBtn], "mouseout" , autoSlide)
/* 
1.When the user moves their mouse out of either button, it calls autoSlide(), which (presumably) restarts the setInterval.
*/

window.addEventListener("load" , autoSlide)

/* 
is correct and ensures that the autoSlide function starts only after the entire page has fully loaded, including all styles, images, and other resources.


*/
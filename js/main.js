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
"use strict"

let burgerBtn = document.querySelector('.burger-link');
let burgerIcon = document.querySelector('.burger-icon');
let navigationMenu = document.querySelector('.navigation');
let sectionIntro = document.querySelector('.intro');
let mainHeader = document.querySelector('.main-header');
let navigationItem = document.getElementsByClassName('navigation__item');

let sectionMenu = document.querySelector('.menu');
let menuAccordion__item = document.querySelectorAll('.menu-accordion__item');

burgerBtn.addEventListener("click", function(event){
    event.preventDefault();

    mainHeader.classList.toggle('main-header_active')
    burgerIcon.classList.toggle('burger-icon_active')
    navigationMenu.classList.toggle('navigation_active')
    sectionIntro.classList.toggle('intro_active')
});

// navigationItem.addEventListener("click", function(event) {
    
//     if (navigationItem) {
//         navigationMenu.classList.remove('navigation_active');
//         burgerIcon.classList.remove('burger-icon_active');
//     }

// });

sectionMenu.addEventListener("click", function(event){
    console.log(event.target.tagName.toLowerCase());
    event.preventDefault();
    let eventName = event.target.tagName.toLowerCase()

    if (eventName === "a" || eventName === "span") {
        for (let y = 0; y < menuAccordion__item.length; y++) {
            menuAccordion__item[y].classList.remove("menu-accordion__item_active")
        };
        let target = event.target.closest(".menu-accordion__item")
        console.log(target);
        target.classList.add("menu-accordion__item_active")
    } 

})
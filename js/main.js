"use strict"

let burgerBtn = document.querySelector('.burger-link');
let burgerIcon = document.querySelector('.burger-icon');
let navigationMenu = document.querySelector('.navigation');
let sectionIntro = document.querySelector('.intro');
let mainHeader = document.querySelector('.main-header');
let navigationItem = document.querySelector('navigation__item');



burgerBtn.addEventListener("click", function(event){
    event.preventDefault();
    mainHeader.classList.toggle('main-header_active')
    burgerIcon.classList.toggle('burger-icon_active')
    navigationMenu.classList.toggle('navigation_active')
    sectionIntro.classList.toggle('intro_active')
});

navigationItem.addEventListener("click", function(event) {
    navigationMenu.classList.remove('navigation_active');
    burgerIcon.classList.remove('burger-icon_active');
});
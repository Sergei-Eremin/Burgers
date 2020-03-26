"use strict"

let burgerBtn = document.querySelector('.burger-link');
let burgerIcon = document.querySelector('.burger-icon');
let navigationMenu = document.querySelector('.navigation');
let sectionIntro = document.querySelector('.intro');
let mainHeader = document.querySelector('.main-header');
// 
let navigationItems = document.querySelector('.navigation__items');


// header
burgerBtn.addEventListener("click", function(event){
    event.preventDefault();

    mainHeader.classList.toggle('main-header_active')
    burgerIcon.classList.toggle('burger-icon_active')
    navigationMenu.classList.toggle('navigation_active')
    sectionIntro.classList.toggle('intro_active')
});

navigationItems.addEventListener("click", function(event) {
    let eventName = event.target.tagName.toLowerCase()
    
    if ((eventName === "a" && window.innerWidth <= 768) || (eventName === "li" && window.innerWidth <= 768)) {
        navigationMenu.classList.remove('navigation_active');
        burgerIcon.classList.remove('burger-icon_active');
        console.log("событие работает");
    }

});
// header end

// 
let sectionMenu = document.querySelector('.menu');
sectionMenu.addEventListener("click", function(event){
    event.preventDefault();
    let menuAccordion__item = document.querySelectorAll('.menu-accordion__item');
    let eventClick = event.target.tagName.toLowerCase()

    if (eventClick === "a" || eventClick === "span") {
        for (let y = 0; y < menuAccordion__item.length; y++) {
            menuAccordion__item[y].classList.remove("menu-accordion__item_active")
        };
        let clickTarget = event.target.closest(".menu-accordion__item")
        // console.log(target);
        clickTarget.classList.add("menu-accordion__item_active")
    } 

})

// 
let teamPeople__wrapper = document.querySelector(".team-people__wrapper");

teamPeople__wrapper.addEventListener('click', function(event){
    event.preventDefault();

    let teamMember = document.getElementsByClassName('team-member');

    let eventClick = event.target.tagName.toLowerCase();

    if (eventClick === 'li' || eventClick === 'a') {
        
        for (let i = 0; i < teamMember.length; i++) {
            teamMember[i].lastElementChild.style.maxHeight = "0px"
            teamMember[i].classList.remove("team-member_active")
        }

        let containerHeight = event.target.closest('.team-member').lastElementChild.firstElementChild.clientHeight;
        
        event.target.closest('.team-member').lastElementChild.style.maxHeight = containerHeight + 'px';
        
        let clickTarget = event.target.closest('.team-member');
        clickTarget.classList.add('team-member_active');


        // БЕЗ АДАПТИВА
        // for (let i = 0; i < teamMember.length; i++) {
        //     teamMember[i].classList.remove("team-member_active")
        //     console.log(teamMember.length);
        // };

        // let clickTarget = event.target.closest('.team-member');
        // clickTarget.classList.add('team-member_active')

    }
})



// slider


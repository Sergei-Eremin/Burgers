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
        let clickTarget = event.target.closest(".menu-accordion__item")

        if (!event.target.closest("li").classList.contains("menu-accordion__item_active")) {
            for (let y = 0; y < menuAccordion__item.length; y++) {
                menuAccordion__item[y].classList.remove("menu-accordion__item_active")
            };
            // console.log(target);
            clickTarget.classList.add("menu-accordion__item_active")
        } else {
            clickTarget.classList.remove("menu-accordion__item_active")
        }
    } 

})

// accordion
let teamPeople__wrapper = document.querySelector(".team-people__wrapper");

teamPeople__wrapper.addEventListener('click', function(event){
    event.preventDefault();

    let teamMember = document.getElementsByClassName('team-member');

    let eventClick = event.target.tagName.toLowerCase();

    // адаптивный по высоте
    if (eventClick === 'li' || eventClick === 'a') {
        for (let i = 0; i < teamMember.length; i++) {
            teamMember[i].lastElementChild.style.maxHeight = "0px"
            teamMember[i].classList.remove("team-member_active")
        }

        let containerHeight = event.target.closest('.team-member').lastElementChild.firstElementChild.clientHeight;
        
        event.target.closest('.team-member').lastElementChild.style.maxHeight = containerHeight + 'px';
        
        let clickTarget = event.target.closest('.team-member');
        clickTarget.classList.add('team-member_active');
    }
})

// slider

function Slider (selector, settings){

    this.target = document.querySelector(selector);

    let sliderItems = this.target.querySelector("ul");

    this.amountSlides = sliderItems.children.length;

    this.currentIndexSlide = 0;
    console.log(this);
    
    if(settings){

        if(settings.animate) {
            sliderItems.style.transitionTimingFunction = settings.animate;
        }

        if(settings.duration) {
            sliderItems.style.transitionDuration = settings.duration + "s";
        }
    };

    this.target.addEventListener("click",(event) => {
        console.log(event.target.closest('[data-vector]'));
        let arrowLink = event.target.closest('[data-vector]');
        event.preventDefault();

        if(arrowLink) {
            let vector = arrowLink.dataset.vector;
            this[vector]();
        }
    });

    this.next = function(){
        if(this.currentIndexSlide < this.amountSlides -1){
            console.log("next slide")
            this.currentIndexSlide++
        } else {
            this.currentIndexSlide = 0;
        };
        translateSlider(this.currentIndexSlide)
    };

    this.back = function(){
        if(this.currentIndexSlide > 0){
            console.log("back slide")
            this.currentIndexSlide--
            translateSlider(this.currentIndexSlide)
        };
    };
    
    function translateSlider(index) {
        sliderItems.style.transform = `translateX(${-(index * 100)}%)`
    };

};

const SLIDER_1 = new Slider("#dark-burger-slider",{
    animate: "cubic-bezier(.52,.66,.65,.72)",
    duration: .2
});

console.log(SLIDER_1);

// delivery

let deliveryForm = document.querySelector('.delivery-form');
let deliverySubmitBtn = document.querySelector('.delivery-form__btn_submit');


deliveryForm.addEventListener('submit', function(event){
    event.preventDefault();
    
    const xhr = new XMLHttpRequest();
    if(validateForm(deliveryForm)){
        let formData = new FormData();
        formData.append("name", `${deliveryForm.clientName.value}`);
        formData.append("phone", `${deliveryForm.clientPhone.value}`);
        formData.append("comment", `${deliveryForm.clientComment.value}`);
        formData.append("to", `gaga@mail.ru`);
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(formData);
    }

    xhr.addEventListener('load', function(){
        if(this.readyState == 4 && this.status >= 200){
            console.log(`status code ${xhr.status}`);
        }
    })
});

function validateForm(form) {
    let valid = true;
    
    if(!validateField(form.elements.clientName)){
        valid = false;
    }

    if(!validateField(form.elements.clientPhone)){
        valid = false;
    }

    if(!validateField(form.elements.clientComment)){
        valid = false;
    }

    return valid;
};

function validateField(field){
    if(!field.checkValidity()){
        return false;
    } else {
        return true;
    }
};
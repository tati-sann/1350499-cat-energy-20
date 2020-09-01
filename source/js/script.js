/*Меню-->*/
let toggleMenu = document.querySelector(".page-header__toggle-menu");
let mainMenu = document.querySelector(".main-nav");
/*<--Меню*/
/*Слайдер-->*/
let rangeControls = document.querySelector(".slider__range-controls");
let butAfter = rangeControls.querySelector(".slider__button--after");
let butBefore = rangeControls.querySelector(".slider__button--before");
let sliderBar = rangeControls.querySelector(".slider__bar");
let sliderTog = rangeControls.querySelector (".slider__toggle");
let img = document.querySelector(".slider__item");
let imgBefore = document.querySelector(".slider__item--before");
let imgAfter = document.querySelector(".slider__item--after");
/*<--Слайдер*/

/*Меню -->*/
toggleMenu.classList.remove("page-header__toggle-menu--nojs");
toggleMenu.classList.add("page-header__toggle-menu--closed");

mainMenu.classList.remove("main-nav--nojs");
mainMenu.classList.add("main-nav--closed");

toggleMenu.addEventListener("click", function(evt) {
  evt.preventDefault();
  toggleMenu.classList.toggle("page-header__toggle-menu--closed");
  toggleMenu.classList.toggle("page-header__toggle-menu--opened");
  mainMenu.classList.toggle("main-nav--closed");
});
/*<--Меню*/
/*Слайдер-->*/
if (document.documentElement.clientWidth < 767) {
  imgBefore.style.width = "100%";
  imgAfter.style.width = "100%";

  butBefore.addEventListener("click", function(evt) {
    evt.preventDefault();
    sliderBar.classList.add("slider__bar--before");
    imgAfter.classList.remove("slider__item--active");
    imgBefore.classList.add("slider__item--active");
  });

  butAfter.addEventListener("click", function(evt) {
    evt.preventDefault();
    sliderBar.classList.remove("slider__bar--before");
    imgBefore.classList.remove("slider__item--active");
    imgAfter.classList.add("slider__item--active");
  });
} else {
  butBefore.addEventListener("click", function(evt) {
    evt.preventDefault();
    imgBefore.style.width = "100%";
    imgAfter.style.width = "0%";
    sliderTog.style.left = "0%";
  });

  butAfter.addEventListener("click", function(evt) {
    evt.preventDefault();
    imgAfter.style.width = "100%";
    imgBefore.style.width = "0%";
    sliderTog.style.left = "100%";
  });
}
/*<--Слайдер*/

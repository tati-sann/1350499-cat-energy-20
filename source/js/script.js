/*Меню-бургер-->*/
let toggleMenu = document.querySelector(".page-header__toggle-menu");
let mainMenu = document.querySelector(".main-nav");

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
/*<--Меню-бургер*/

/*Карта-->*/
ymaps.ready(function () {
  const viewportWidth = window.innerWidth;
  var myMap = new ymaps.Map(document.querySelector(".contacts__map"), {
          center: [59.93863106, 30.3230545],
          zoom: 17,
          controls: ["zoomControl"]
      }, {
          searchControlProvider: "yandex#search"
      }),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: "Cat Energy",
          balloonContent: "Санкт-Петербург, Большая Конюшенная 18/9"
      }, {
          iconLayout: "default#image",
          iconImageHref: "img/map-pin.png",
          iconImageSize: viewportWidth > 767 ? [124, 106] : [62, 53],
          iconImageOffset: viewportWidth > 767 ? [-64, -100] : [-32, -55]
      });

  myMap.geoObjects.add(myPlacemark);
});
/*<--Карта*/

/*Слайдер-->*/
function slider() {
  let slider = document.querySelector(".slider");
  let btnBefore = slider.querySelector(".slider__button--before");
  let btnAfter = slider.querySelector(".slider__button--after");
  let img = slider.querySelector(".slider__item");
  let imgBefore = slider.querySelector(".slider__item--before");
  let imgAfter = slider.querySelector(".slider__item--after");
  let bar = slider.querySelector(".slider__bar");
  let range = slider.querySelector(".slider__range");

  if (document.documentElement.clientWidth < 767) {
    imgBefore.style.width = "100%";
    imgAfter.style.width = "100%";

    btnBefore.addEventListener("click", function (evt) {
      evt.preventDefault();
      bar.classList.remove("slider__bar--after");
      imgAfter.classList.remove("slider__item--active");
      imgBefore.classList.add("slider__item--active");
    });

    btnAfter.addEventListener("click", function (evt) {
      evt.preventDefault();
      bar.classList.add("slider__bar--after");
      imgBefore.classList.remove("slider__item--active");
      imgAfter.classList.add("slider__item--active");
    });
  } else {
    btnBefore.addEventListener("click", function (evt) {
      evt.preventDefault();
      range.value = 0;
      imgBefore.style.width = "100%";
      imgAfter.style.width = "0%";
    });

    btnAfter.addEventListener("click", function (evt) {
      range.value = 100;
      imgAfter.style.width = "100%";
      imgBefore.style.width = "0%";
    });

    range.addEventListener("input", function() {
      imgBefore.style.width = (100 - range.value) + "%";
      imgAfter.style.width = range.value + "%";
    });
  }
}

if (document.querySelector(".slider")) {
  slider();

  window.onresize = function(evt) {
    slider();
  }
};
/*<--Слайдер*/

import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

const swiper = new Swiper('.swiper', {
  slidesPerView: 4,
  loop: true,
  spaceBetween: 12,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})

const secondSwiper = new Swiper('.swiper-2', {
  slidesPerView: 4,
  loop: true,
  spaceBetween: 12,
  allowTouchMove: false,
})

const thirdSwiper = new Swiper('.swiper-3', {
  slidesPerView: 4,
  loop: true,
  spaceBetween: 12,
  allowTouchMove: false,
})

const fourthSwiper = new Swiper('.swiper-4', {
  slidesPerView: 4,
  loop: true,
  spaceBetween: 12,
  allowTouchMove: false,
})

const fifthSwiper = new Swiper('.swiper-5', {
  slidesPerView: 4,
  loop: true,
  spaceBetween: 12,
  allowTouchMove: false,
})

const sixthSwiper = new Swiper('.swiper-6', {
  slidesPerView: 4,
  loop: true,
  spaceBetween: 12,
  allowTouchMove: false,
})

const seventhSwiper = new Swiper('.swiper-7', {
  slidesPerView: 4,
  loop: true,
  spaceBetween: 12,
  allowTouchMove: false,
})

const eighthSwiper = new Swiper('.swiper-8', {
  slidesPerView: 4,
  loop: true,
  spaceBetween: 12,
  allowTouchMove: false,
})

swiper.controller.control = [
  secondSwiper,
  thirdSwiper,
  fourthSwiper,
  fifthSwiper,
  sixthSwiper,
  seventhSwiper,
  eighthSwiper,
]

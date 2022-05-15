// new Swiper(선택자, 옵션)
export default new Swiper(".swiper-container", {
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드
  loop: true,
  autoplay: {
    // 자동재생
    delay: 3000,
  },
  pagination: {
    el: ".swiper-container .swiper-pagination", // 페이지 번호 요소 선택자
    clickable: true, // 사용자의 페이지 번호 클릭 요소 제어
  },
  navigator: {
    prevEL: ".swiper-container .swiper-prev", // 이전  슬라이드 버튼
    nextEl: ".swiper-container .swiper-next",
  },
});

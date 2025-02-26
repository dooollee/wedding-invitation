//<디데이 계산기>

// 목표 날짜 설정 (2025년 5월 31일)
const targetDate = new Date("2025-05-31T12:30:00");

// 카운트다운을 갱신하는 함수
function updateCountdown() {
  const now = new Date();
  const timeRemaining = targetDate - now;

  if (timeRemaining <= 0) {
    document.getElementById("countdown").innerHTML = "D-Day!";
    return;
  }

  // 남은 시간 계산
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // HTML에 결과 업데이트
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// 1초마다 카운트다운을 갱신
setInterval(updateCountdown, 1000);

// 페이지 로드 시 카운트다운 초기화
updateCountdown();

//------------------------------------------------------------//

//<사진 슬라이더>

let currentIndex = 0;
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const totalSlides = images.length;

const currentSlideElement = document.getElementById("currentSlide");
const totalSlidesElement = document.getElementById("totalSlides");

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlidePosition();
  updateCounter();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
  updateCounter();
}

function updateSlidePosition() {
  const offset = -currentIndex * 100; // 100%를 기준으로 이동
  slides.style.transform = `translateX(${offset}%)`;
}

function updateCounter() {
  currentSlideElement.textContent = currentIndex + 1; // 현재 슬라이드 번호 (1부터 시작)
}

// 초기 카운터 설정
totalSlidesElement.textContent = totalSlides;
updateCounter();
//-----------------------------------------------------------------------//

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".show");

  function checkScroll() {
    sections.forEach((section) => {
      // 요소의 위치 계산
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // 요소가 화면에 보이는지 확인 (화면 아래쪽에서 나타나도록)
      if (sectionTop < windowHeight * 0.85) {
        section.classList.add("fade-in");
      }
    });
  }

  // 초기 로드 시 체크
  checkScroll();

  // 스크롤 이벤트에 체크 함수 연결
  window.addEventListener("scroll", checkScroll);
});

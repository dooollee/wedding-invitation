document.addEventListener("DOMContentLoaded", function () {
  // 요소들 가져오기
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const loadMoreContainer = document.getElementById("loadMoreContainer");
  const galleryMore1 = document.getElementById("gallery-more1");
  const galleryMore2 = document.getElementById("gallery-more2");

  // 더보기 버튼 클릭 이벤트
  loadMoreBtn.addEventListener("click", function () {
    // 현재 단계 확인
    const currentStep = parseInt(loadMoreBtn.getAttribute("data-step"));

    if (currentStep === 1) {
      // 첫 번째 클릭: 첫 번째 추가 이미지 그룹 표시
      galleryMore1.classList.remove("hidden");

      // 현재 단계 업데이트
      loadMoreBtn.setAttribute("data-step", "2");

      // 페이지 레이아웃 재조정 (브라우저 리플로우 강제)
      void galleryMore1.offsetHeight;
    } else if (currentStep === 2) {
      // 두 번째 클릭: 두 번째 추가 이미지 그룹 표시
      galleryMore2.classList.remove("hidden");

      // 더보기 버튼 컨테이너 숨기기 (모든 이미지가 표시됨)
      loadMoreContainer.classList.add("hidden");

      // 페이지 레이아웃 재조정
      void galleryMore2.offsetHeight;
    }

    // 페이지를 부드럽게 스크롤하여 새로 추가된 콘텐츠가 보이도록 함
    if (currentStep === 1) {
      const newContent = galleryMore1.firstElementChild;
      if (newContent) {
        const rect = newContent.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (!isVisible) {
          setTimeout(() => {
            window.scrollBy({
              top: rect.height / 2,
              behavior: "smooth",
            });
          }, 100);
        }
      }
    }
  });
});

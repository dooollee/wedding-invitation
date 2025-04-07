document.addEventListener("DOMContentLoaded", function () {
  // 더보기 버튼 요소 가져오기
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  // 더 보여줄 갤러리 요소 가져오기
  const galleryMore = document.getElementById("gallery-more");

  // 더보기 버튼 클릭 이벤트 리스너
  loadMoreBtn.addEventListener("click", function () {
    // 숨겨진 갤러리를 보이게 함
    galleryMore.classList.remove("hidden");
    // 갤러리를 보이게 한 후 버튼은 숨김
    loadMoreBtn.classList.add("hidden");

    // 화면 스크롤을 부드럽게 아래로 이동
    window.scrollBy({
      top: 100,
      behavior: "smooth",
    });
  });
});

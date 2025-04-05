document.addEventListener("DOMContentLoaded", function () {
  const showMoreBtn = document.getElementById("show-more-btn");
  const hiddenGallery = document.getElementById("hidden-gallery");

  showMoreBtn.addEventListener("click", function () {
    // 숨겨진 갤러리를 표시
    hiddenGallery.style.display = "contents";
    // 버튼 숨기기 (또는 필요시 다른 동작으로 변경)
    showMoreBtn.style.display = "none";
  });
});

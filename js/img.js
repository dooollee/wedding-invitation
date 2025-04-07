document.addEventListener("DOMContentLoaded", function () {
  // 이미지 데이터 배열 (실제로는 서버에서 가져올 수 있습니다)
  const images = Array.from({ length: 27 }, (_, i) => ({
    id: i + 1,
    src: `./src/file/${i + 1}.webp`, // 다양한 크기의 이미지
    alt: `이미지 ${i + 1}`,
  }));
  // DOM 요소
  const galleryGrid = document.getElementById("gallery-grid");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  const indicators = document.getElementById("indicators");
  const currentPageElement = document.getElementById("current-page");
  const totalPagesElement = document.getElementById("total-pages");

  // 설정
  const imagesPerPage = 9;
  let currentPage = 0;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  // 이미지 모달 인스턴스 생성
  // createImageModal 함수가 window 객체에 등록되어 있는지 확인
  let imageModal;
  if (typeof window.createImageModal === "function") {
    imageModal = window.createImageModal();
  } else {
    console.error("modal.js가 올바르게 로드되지 않았습니다.");
    // 모달 없이도 갤러리는 작동하도록 함
  }

  // 총 페이지 수 표시
  totalPagesElement.textContent = totalPages;

  // 이미지 표시 함수
  function displayImages() {
    // 갤러리 초기화
    galleryGrid.innerHTML = "";

    // 현재 페이지에 표시할 이미지 계산
    const startIndex = currentPage * imagesPerPage;
    const endIndex = Math.min(startIndex + imagesPerPage, images.length);

    // 이미지 추가
    for (let i = startIndex; i < endIndex; i++) {
      const image = images[i];
      const item = document.createElement("div");
      item.className = "gallery-item";

      const img = document.createElement("img");
      img.src = image.src;
      img.alt = image.alt;

      // 이미지 클릭 이벤트 - 모달 열기
      img.addEventListener("click", function () {
        const clickedIndex = i;
        if (imageModal) {
          imageModal.open(images, clickedIndex - startIndex);
        }
      });

      item.appendChild(img);
      galleryGrid.appendChild(item);
    }

    // 현재 페이지 업데이트
    currentPageElement.textContent = currentPage + 1;

    // 인디케이터 업데이트
    updateIndicators();
  }

  // 인디케이터 생성
  function createIndicators() {
    indicators.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {
      const indicator = document.createElement("div");
      indicator.className = "indicator";
      if (i === currentPage) {
        indicator.classList.add("active");
      }

      indicator.addEventListener("click", () => {
        currentPage = i;
        displayImages();
      });

      indicators.appendChild(indicator);
    }
  }

  // 인디케이터 업데이트
  function updateIndicators() {
    const indicatorElements = indicators.querySelectorAll(".indicator");
    indicatorElements.forEach((indicator, index) => {
      if (index === currentPage) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  // 이전 페이지로 이동
  function goToPrevPage() {
    currentPage = currentPage > 0 ? currentPage - 1 : totalPages - 1;
    displayImages();
  }

  // 다음 페이지로 이동
  function goToNextPage() {
    currentPage = currentPage < totalPages - 1 ? currentPage + 1 : 0;
    displayImages();
  }

  // 이벤트 리스너 설정
  prevButton.addEventListener("click", goToPrevPage);
  nextButton.addEventListener("click", goToNextPage);

  // 초기화
  createIndicators();
  displayImages();
});

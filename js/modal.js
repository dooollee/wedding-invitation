document.addEventListener("DOMContentLoaded", function () {
  // 이미지 데이터
  const galleryImages = [
    { src: "https://picsum.photos/id/10/800/600", caption: "자연 풍경 1" },
    { src: "https://picsum.photos/id/11/800/600", caption: "자연 풍경 2" },
    { src: "https://picsum.photos/id/12/800/600", caption: "자연 풍경 3" },
    { src: "https://picsum.photos/id/13/800/600", caption: "자연 풍경 4" },
    { src: "https://picsum.photos/id/14/800/600", caption: "자연 풍경 5" },
    { src: "https://picsum.photos/id/15/800/600", caption: "자연 풍경 6" },
    { src: "https://picsum.photos/id/16/800/600", caption: "자연 풍경 7" },
    { src: "https://picsum.photos/id/17/800/600", caption: "자연 풍경 8" },
    { src: "https://picsum.photos/id/18/800/600", caption: "자연 풍경 9" },
  ];

  // DOM 요소
  const galleryGrid = document.getElementById("gallery-grid");
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const closeModal = document.getElementById("closeModal");
  const modalPrev = document.getElementById("modalPrev");
  const modalNext = document.getElementById("modalNext");
  const currentImageNum = document.getElementById("currentImageNum");
  const totalImages = document.getElementById("totalImages");

  // 현재 이미지 인덱스
  let currentImageIndex = 0;

  // 이미지 갤러리 생성 (간단한 예시)
  function createGallery() {
    galleryImages.forEach((image, index) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item";

      // 이미지 요소 생성
      const img = document.createElement("img");
      img.src = image.src;
      img.alt = image.caption;
      galleryItem.appendChild(img);

      // 클릭 이벤트를 직접 추가
      galleryItem.onclick = function () {
        console.log("이미지 클릭됨: ", index);
        openModal(index);
      };

      galleryGrid.appendChild(galleryItem);
    });

    // 총 이미지 수 업데이트
    totalImages.textContent = galleryImages.length;

    console.log("갤러리 생성 완료, 이미지 수: ", galleryImages.length);
  }

  // 모달 열기
  function openModal(imageIndex) {
    console.log("모달 열기 시도: 인덱스 ", imageIndex);
    currentImageIndex = imageIndex;

    const image = galleryImages[currentImageIndex];
    modalImage.src = image.src;
    modalCaption.textContent = image.caption;
    currentImageNum.textContent = currentImageIndex + 1;

    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // 배경 스크롤 방지
    console.log("모달 열림");
  }

  // 이전 이미지
  function showPreviousImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      updateModalImage();
    }
  }

  // 다음 이미지
  function showNextImage() {
    if (currentImageIndex < galleryImages.length - 1) {
      currentImageIndex++;
      updateModalImage();
    }
  }

  // 모달 이미지 업데이트
  function updateModalImage() {
    const image = galleryImages[currentImageIndex];
    modalImage.src = image.src;
    modalCaption.textContent = image.caption;
    currentImageNum.textContent = currentImageIndex + 1;
  }

  // 모달 닫기
  function closeModalWindow() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // 배경 스크롤 허용
  }

  // 이벤트 리스너
  closeModal.addEventListener("click", closeModalWindow);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalWindow();
    }
  });

  modalPrev.addEventListener("click", showPreviousImage);
  modalNext.addEventListener("click", showNextImage);

  // 키보드 이벤트
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
      if (e.key === "Escape") {
        closeModalWindow();
      } else if (e.key === "ArrowLeft") {
        showPreviousImage();
      } else if (e.key === "ArrowRight") {
        showNextImage();
      }
    }
  });

  // 갤러리 초기화
  createGallery();
  console.log("스크립트 로딩 완료");
});

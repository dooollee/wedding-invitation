document.addEventListener("DOMContentLoaded", function () {
  // 갤러리 설정
  const imagesPerPage = 9;
  const totalImages = 17;
  const totalPages = Math.ceil(totalImages / imagesPerPage);

  // 이미지 경로 (썸네일과 고화질 이미지)
  const images = [];

  // 이미지 데이터 초기화
  for (let i = 1; i <= totalImages; i++) {
    images.push({
      thumbnail: `../src/thumbnail/${i}.webp`, // 저화질 썸네일 경로
      highRes: `../src/photo/${i}.webp`, // 고화질 이미지 경로
    });
  }

  // DOM 요소
  const galleryGrid = document.getElementById("gallery-grid");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const pageIndicator = document.getElementById("page-indicator");
  const modal = document.getElementById("photo-modal");
  const modalImage = document.getElementById("modal-image");
  const closeBtn = document.querySelector(".close-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const currentImageElement = document.getElementById("current-image");
  const totalImagesElement = document.getElementById("total-images");

  // 현재 페이지와 선택된 이미지 인덱스
  let currentPage = 1;
  let currentImageIndex = 0;

  // 페이지 표시기 업데이트
  function updatePageIndicator() {
    pageIndicator.textContent = `${currentPage} / ${totalPages}`;
  }

  // 갤러리 그리드 렌더링
  function renderGallery() {
    // 그리드 초기화
    galleryGrid.innerHTML = "";

    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = Math.min(startIndex + imagesPerPage, totalImages);

    for (let i = startIndex; i < endIndex; i++) {
      const imageData = images[i];

      // 갤러리 아이템 생성
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item";
      galleryItem.dataset.index = i;

      // 썸네일 이미지 생성
      const img = document.createElement("img");
      img.src = imageData.thumbnail;
      img.alt = `이미지 ${i + 1}`;
      img.loading = "lazy"; // 이미지 로딩 최적화

      // 클릭 이벤트 추가
      galleryItem.addEventListener("click", function () {
        openModal(i);
      });

      galleryItem.appendChild(img);
      galleryGrid.appendChild(galleryItem);
    }

    updatePageIndicator();
  }

  // 모달 열기
  function openModal(index) {
    currentImageIndex = index;
    updateModalImage();
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // 스크롤 방지
  }

  // 모달 닫기
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // 스크롤 복원
  }

  // 모달 이미지 업데이트
  function updateModalImage() {
    modalImage.src = images[currentImageIndex].highRes;
    currentImageElement.textContent = currentImageIndex + 1;
    totalImagesElement.textContent = totalImages;
  }

  // 이전 이미지로 이동
  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    updateModalImage();
  }

  // 다음 이미지로 이동
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    updateModalImage();
  }

  // 이전 페이지로 이동
  function goToPrevPage() {
    if (currentPage > 1) {
      currentPage--;
      renderGallery();
    }
  }

  // 다음 페이지로 이동
  function goToNextPage() {
    if (currentPage < totalPages) {
      currentPage++;
      renderGallery();
    }
  }

  // 이벤트 리스너 등록
  prevPageBtn.addEventListener("click", goToPrevPage);
  nextPageBtn.addEventListener("click", goToNextPage);
  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", prevImage);
  nextBtn.addEventListener("click", nextImage);

  // ESC 키로 모달 닫기
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      prevImage();
    } else if (e.key === "ArrowRight") {
      nextImage();
    }
  });

  // 모달 외부 클릭 시 닫기
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // 초기 갤러리 렌더링
  renderGallery();
});

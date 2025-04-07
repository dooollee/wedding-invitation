// 모달 관련 기능을 담당하는 JavaScript 파일

class ImageModal {
  constructor() {
    // 모달 요소 생성
    this.modal = document.createElement("div");
    this.modal.className = "modal";
    this.modal.style.display = "none";

    // 모달 컨텐츠 컨테이너
    this.modalContent = document.createElement("div");
    this.modalContent.className = "modal-content";

    // 닫기 버튼
    this.closeBtn = document.createElement("span");
    this.closeBtn.className = "close-button";
    this.closeBtn.innerHTML = "&times;";

    // 이미지 컨테이너
    this.imageContainer = document.createElement("div");
    this.imageContainer.className = "modal-image-container";

    // 메인 이미지
    this.modalImage = document.createElement("img");
    this.modalImage.className = "modal-image";

    // 이미지 카운터
    this.imageCounter = document.createElement("div");
    this.imageCounter.className = "image-counter";

    // 네비게이션 버튼
    this.prevBtn = document.createElement("button");
    this.prevBtn.className = "modal-nav-button modal-prev-button";
    this.prevBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>`;

    this.nextBtn = document.createElement("button");
    this.nextBtn.className = "modal-nav-button modal-next-button";
    this.nextBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>`;

    // 요소 조립
    this.imageContainer.appendChild(this.modalImage);
    this.modalContent.appendChild(this.closeBtn);
    this.modalContent.appendChild(this.prevBtn);
    this.modalContent.appendChild(this.imageContainer);
    this.modalContent.appendChild(this.nextBtn);
    this.modalContent.appendChild(this.imageCounter);
    this.modal.appendChild(this.modalContent);

    // body에 모달 추가
    document.body.appendChild(this.modal);

    // 이벤트 리스너 바인딩
    this.closeBtn.addEventListener("click", this.close.bind(this));
    this.modal.addEventListener("click", this.handleOutsideClick.bind(this));
    this.prevBtn.addEventListener("click", this.showPrevImage.bind(this));
    this.nextBtn.addEventListener("click", this.showNextImage.bind(this));

    // 키보드 이벤트 리스너
    document.addEventListener("keydown", this.handleKeyPress.bind(this));

    // 상태 변수
    this.images = [];
    this.currentIndex = 0;
  }

  // 모달 열기
  open(images, startIndex = 0) {
    this.images = images;
    this.currentIndex = startIndex;
    this.updateImage();
    this.modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // 스크롤 방지
  }

  // 모달 닫기
  close() {
    this.modal.style.display = "none";
    document.body.style.overflow = "auto"; // 스크롤 복원
  }

  // 외부 클릭 처리
  handleOutsideClick(e) {
    if (e.target === this.modal) {
      this.close();
    }
  }

  // 이전 이미지 표시
  showPrevImage() {
    this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
    this.updateImage();
  }

  // 다음 이미지 표시
  showNextImage() {
    this.currentIndex =
      this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
    this.updateImage();
  }

  // 이미지 업데이트
  updateImage() {
    const currentImage = this.images[this.currentIndex];
    this.modalImage.src = currentImage.src;
    this.modalImage.alt = currentImage.alt;
    this.imageCounter.textContent = `${this.currentIndex + 1} / ${
      this.images.length
    }`;
  }

  // 키보드 이벤트 처리
  handleKeyPress(e) {
    if (this.modal.style.display === "none") return;

    switch (e.key) {
      case "ArrowLeft":
        this.showPrevImage();
        break;
      case "ArrowRight":
        this.showNextImage();
        break;
      case "Escape":
        this.close();
        break;
    }
  }
}

// 전역으로 사용할 수 있도록 윈도우 객체에 함수 추가
window.createImageModal = function () {
  return new ImageModal();
};

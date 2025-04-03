// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Modal elements
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const imageCounter = document.getElementById("imageCounter");

  // All gallery images
  const galleryItems = document.querySelectorAll(".gallery-item img");
  let currentImageIndex = 0;
  let totalImages = galleryItems.length;

  // Add click event to each image
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      modal.style.display = "flex";
      modalImg.src = this.src;
      currentImageIndex = index;
      updateCounter();
    });
  });

  // Make the functions accessible in the global scope for onclick attributes
  window.changeImage = function (direction) {
    currentImageIndex =
      (currentImageIndex + direction + totalImages) % totalImages;
    modalImg.src = galleryItems[currentImageIndex].src;
    updateCounter();
  };

  window.closeModal = function () {
    modal.style.display = "none";
  };

  function updateCounter() {
    imageCounter.textContent = `${currentImageIndex + 1} / ${totalImages}`;
  }

  // Close modal when clicking outside
  window.onclick = function (event) {
    if (event.target === modal) {
      closeModal();
    }
  };

  // Keyboard navigation
  document.addEventListener("keydown", function (event) {
    if (modal.style.display === "flex") {
      if (event.key === "ArrowLeft") {
        changeImage(-1);
      } else if (event.key === "ArrowRight") {
        changeImage(1);
      } else if (event.key === "Escape") {
        closeModal();
      }
    }
  });
});

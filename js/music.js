document.addEventListener("DOMContentLoaded", function () {
  const musicButton = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  const playIcon = document.querySelector(".play-icon");
  const pauseIcon = document.querySelector(".pause-icon");
  const autoplayMessage = document.getElementById("autoplayMessage");

  // 자동 재생 시도
  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {
    playPromise
      .then((_) => {
        // 자동 재생 성공
        console.log("자동 재생 성공");
        pauseIcon.classList.add("active");
        playIcon.classList.remove("active");
      })
      .catch((error) => {
        // 자동 재생 실패 (대부분의 브라우저에서는 사용자 상호작용이 필요)
        console.log("자동 재생 실패:", error);
        playIcon.classList.add("active");
        pauseIcon.classList.remove("active");

        // 사용자에게 안내 메시지 표시
        autoplayMessage.classList.add("show");

        // 클릭 이벤트로 음악 활성화
        const enableAutoplay = () => {
          bgMusic.play().then(() => {
            pauseIcon.classList.add("active");
            playIcon.classList.remove("active");
            autoplayMessage.classList.remove("show");
            document.removeEventListener("click", enableAutoplay);
          });
        };

        document.addEventListener("click", enableAutoplay);

        // 10초 후 메시지 제거
        setTimeout(() => {
          autoplayMessage.classList.remove("show");
        }, 10000);
      });
  }

  // 음악 버튼 클릭 이벤트
  musicButton.addEventListener("click", function (e) {
    // 이벤트 버블링 방지
    e.stopPropagation();

    if (bgMusic.paused) {
      // 음악 재생
      bgMusic.play();
      playIcon.classList.remove("active");
      pauseIcon.classList.add("active");
    } else {
      // 음악 일시정지
      bgMusic.pause();
      pauseIcon.classList.remove("active");
      playIcon.classList.add("active");
    }
  });

  // 사용자 설정 저장 (localStorage 사용)
  window.addEventListener("beforeunload", function () {
    localStorage.setItem("bgMusicState", bgMusic.paused ? "paused" : "playing");
  });

  // 이전 설정 불러오기
  const savedState = localStorage.getItem("bgMusicState");
  if (savedState === "paused") {
    bgMusic.pause();
    pauseIcon.classList.remove("active");
    playIcon.classList.add("active");
  }
});

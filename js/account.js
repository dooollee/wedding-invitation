function toggleAccounts(id, btn) {
  const accountDetails = document.getElementById(id);
  const arrowIcon = btn.querySelector(".rotate-icon");
  const accountItems = accountDetails.querySelectorAll(".account-item");

  if (accountDetails.style.height && accountDetails.style.height !== "0px") {
    // 닫기
    accountItems.forEach((item) => {
      item.classList.remove("show");
    });

    // 애니메이션을 위해 현재 높이로 설정했다가 0으로 변경
    const height = accountDetails.scrollHeight;
    accountDetails.style.height = height + "px";

    setTimeout(() => {
      accountDetails.style.height = "0px";
      arrowIcon.classList.remove("open");
    }, 10);
  } else {
    // 열기
    const height = accountDetails.scrollHeight;
    accountDetails.style.height = height + "px";
    arrowIcon.classList.add("open");

    // 순차적으로 아이템 표시
    accountItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("show");
      }, 200 + index * 100);
    });
  }
}

function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(
    function () {
      const originalText = btn.textContent;
      btn.textContent = "복사됨!";

      setTimeout(function () {
        btn.textContent = originalText;
      }, 1500);
    },
    function (err) {
      alert("복사에 실패했습니다. 직접 선택하여 복사해주세요.");
    }
  );
}

// 페이지 로드 시 계좌 높이 초기화
window.onload = function () {
  document.querySelectorAll(".account-details").forEach((detail) => {
    detail.style.height = "0px";
  });
};

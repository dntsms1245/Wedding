const galleryImages = document.querySelectorAll(".gallery img");

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeButton = document.querySelector(".modal-close");


galleryImages.forEach(function(image) {
  image.addEventListener("contextmenu", function(event) {
    event.preventDefault();
  });
  image.setAttribute("draggable", "false");
});


modalImage.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});

modalImage.setAttribute("draggable", "false");
let visibleGalleryImages = [];
let currentGalleryIndex = 0;
let isGalleryModal = false;

galleryImages.forEach(function(image) {
  image.addEventListener("click", function() {
    // 현재 화면에 보이는 사진만 가져오기
    visibleGalleryImages = Array.from(galleryImages).filter(function(img) {
      return img.offsetParent !== null;
    });
  
    currentGalleryIndex = visibleGalleryImages.indexOf(image);
    isGalleryModal = true;
    modalImage.src = image.src;
    modal.style.display = "flex";
  });
});


closeButton.addEventListener("click", function() {
  modal.style.display = "none";
});


modal.addEventListener("click", function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});



const copyButtons = document.querySelectorAll(".copy-button");
copyButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    const accountNumber = button.dataset.account;
    navigator.clipboard.writeText(accountNumber);
    button.textContent = "복사완료 ✓";
    setTimeout(function() {
      button.innerHTML = "계좌번호<br>복사";
    }, 1500);
  });
});



const mapContainer = document.getElementById("map");

const mapOptions = {
  center: new kakao.maps.LatLng(37.5665, 126.9780),
  level: 3
};

const map = new kakao.maps.Map(mapContainer, mapOptions);

const geocoder = new kakao.maps.services.Geocoder();

geocoder.addressSearch(
  "서울특별시 강남구 영동대로 737",
  function(result, status) {

    if (status === kakao.maps.services.Status.OK) {

      const coords = new kakao.maps.LatLng(
        result[0].y,
        result[0].x
      );

      const marker = new kakao.maps.Marker({
        map: map,
        position: coords
      });

      const infowindow = new kakao.maps.InfoWindow({
  content: '<div style="width:65px;padding:6px 8px;font-size:13px;white-space:nowrap;text-align:center;">리베라 호텔</div>'
});
          infowindow.open(map, marker);

      map.setCenter(coords);
    }
  }
);


const galleryMoreButton = document.querySelector(".gallery-more-button");
const galleryExtraImages = document.querySelectorAll(".gallery-extra");

galleryMoreButton.addEventListener("click", function() {

  const isOpen = galleryExtraImages[0].classList.contains("show");

  if (isOpen) {

    galleryExtraImages.forEach(function(image) {
      image.classList.remove("show");
    });

    galleryMoreButton.textContent = "사진 더보기 +";

  } else {

    galleryExtraImages.forEach(function(image) {
      image.classList.add("show");
    });

    galleryMoreButton.textContent = "🤯사진 접기 −";
  }
});



const paperButton = document.querySelector(".paper-button");

paperButton.addEventListener("click", function() {
  const paperImage = paperButton.dataset.image;

  modalImage.src = paperImage;
  modal.style.display = "flex";
});





let touchStartX = 0;
let touchCurrentX = 0;
let isAnimating = false;
modalImage.addEventListener("touchstart", function(event) {
  if (!isGalleryModal || isAnimating) return;
  touchStartX = event.touches[0].clientX;
  touchCurrentX = touchStartX;
  // 손가락으로 움직이는 동안에는 애니메이션 끄기
  modalImage.style.transition = "none";
});
modalImage.addEventListener("touchmove", function(event) {
  if (!isGalleryModal || isAnimating) return;
  touchCurrentX = event.touches[0].clientX;
  const moveX = touchCurrentX - touchStartX;
  // 사진이 손가락을 따라 좌우로 움직임
  modalImage.style.transform = `translateX(${moveX}px)`;
});
modalImage.addEventListener("touchend", function() {
  if (!isGalleryModal || isAnimating) return;
  const moveX = touchCurrentX - touchStartX;
  // 50px 이하로 움직였으면 원래 자리로 돌아오기
  if (Math.abs(moveX) < 50) {
    modalImage.style.transition = "transform 0.2s ease";
    modalImage.style.transform = "translateX(0)";
    return;
  }
  isAnimating = true;
  const nextPhoto = moveX < 0;
  // 기존 사진이 옆으로 빠져나감
  modalImage.style.transition =
    "transform 0.22s ease, opacity 0.22s ease";

  modalImage.style.transform =
    nextPhoto
      ? "translateX(-120%)"
      : "translateX(120%)";
  modalImage.style.opacity = "0";
  setTimeout(function() {
    // 다음 / 이전 사진 번호 계산
    if (nextPhoto) {
      currentGalleryIndex++;
      if (currentGalleryIndex >= visibleGalleryImages.length) {
        currentGalleryIndex = 0;
      }
    } else {
      currentGalleryIndex--;
      if (currentGalleryIndex < 0) {
        currentGalleryIndex = visibleGalleryImages.length - 1;
      }
    }
    // 새로운 사진으로 교체
    modalImage.src =
      visibleGalleryImages[currentGalleryIndex].src;
    // 새 사진을 반대편에서 살짝 대기
    modalImage.style.transition = "none";
    modalImage.style.transform =
      nextPhoto
        ? "translateX(60px)"
        : "translateX(-60px)";
    modalImage.style.opacity = "0";
    // 가운데로 부드럽게 등장
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        modalImage.style.transition =
          "transform 0.22s ease, opacity 0.22s ease";
        modalImage.style.transform = "translateX(0)";
        modalImage.style.opacity = "1";
        isAnimating = false;
      });
    });
  }, 220);
});

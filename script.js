const galleryImages = document.querySelectorAll(".gallery img");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeButton = document.querySelector(".modal-close");

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
  content: '<div style="padding:6px 10px;font-size:13px;white-space:nowrap;text-align:center;">리베라 호텔</div>'
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
let touchEndX = 0;

modalImage.addEventListener("touchstart", function(event) {
  if (!isGalleryModal) return;
  touchStartX = event.changedTouches[0].screenX;
});

modalImage.addEventListener("touchend", function(event) {
  if (!isGalleryModal) return;
  touchEndX = event.changedTouches[0].screenX;
  const swipeDistance = touchEndX - touchStartX;
  // 너무 조금 움직인 것은 스와이프로 판단하지 않음
  if (Math.abs(swipeDistance) < 50) return;

  // 왼쪽으로 밀기 → 다음 사진
  if (swipeDistance < 0) {
    currentGalleryIndex++;
    if (currentGalleryIndex >= visibleGalleryImages.length) {
      currentGalleryIndex = 0;
    }
  }

  // 오른쪽으로 밀기 → 이전 사진
  else {
    currentGalleryIndex--;
    if (currentGalleryIndex < 0) {
      currentGalleryIndex = visibleGalleryImages.length - 1;
    }
  }

  modalImage.src = visibleGalleryImages[currentGalleryIndex].src;
});

const galleryImages = document.querySelectorAll(".gallery img");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeButton = document.querySelector(".modal-close");

galleryImages.forEach(function(image) {
  image.addEventListener("click", function() {
    modal.style.display = "flex";
    modalImage.src = image.src;
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

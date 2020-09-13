import gallery from "./gallery-items.js";

// добавляю массив картинок в галерею

document.addEventListener("DOMContentLoaded", () => {
  let galleryRef = document.querySelector(".gallery");
  const galleryHtml = gallery.map((img, idx) => {
    return (img = `<li class="gallery__item">
    <a class="gallery__link" href="${img.original}">
    <img
      class="gallery__image"
      src="${img.preview}"
      data-source="${img.original}"
      data-index="${idx}"
      alt="${img.description}"/>
    </a>
    </li>`);
  });
  galleryRef.insertAdjacentHTML("beforeEnd", galleryHtml.join(""));

  const imgRef = document.querySelector(".gallery__image");
  const imgRefs = document.querySelectorAll(".gallery__image");
  const lightboxRef = document.querySelector(".lightbox");
  const buttonRef = lightboxRef.querySelector(".lightbox__button");
  const lightboxImg = lightboxRef.querySelector(".lightbox__image");

  const lightboxOverlay = lightboxRef.querySelector(".lightbox__overlay");
  // let myTarget = 0;
  let activeSlide;
  const openModal = (event) => {
    if (event.target.classList.contains("gallery__image")) {
      event.preventDefault();
      lightboxImg.src = event.target.dataset.source;
      lightboxImg.alt = event.target.alt;
      lightboxRef.classList.add("is-open");
      lightboxOverlay.classList.add("is-open");
      document.addEventListener("keydown", EcsModal);
      // document.addEventListener("keydown", Nextimg);
      document.addEventListener("keydown", moveRight);
      document.addEventListener("keydown", moveLeft);
      activeSlide = event.target.dataset.index;
    }
  };
  console.log(galleryHtml);
  const EcsModal = (event) => {
    if (event.keyCode == 27) {
      lightboxRef.classList.remove("is-open");
    }
  };

  const moveRight = (event) => {
    if (event.key === "ArrowLeft") {
      activeSlide--;
      if (activeSlide < 0) {
        activeSlide = imgRefs.length - 1;
      }
      lightboxImg.src = imgRefs[activeSlide].dataset.source;
    }
  };

  function moveLeft(event) {
    if (event.key === "ArrowRight") {
      activeSlide++;
      if (activeSlide > imgRefs.length - 1) {
        activeSlide = 0;
      }

      lightboxImg.src = imgRefs[activeSlide].dataset.source;
    }
  }
  // const Nextimg = (event) => {
  //   console.log(event.key);
  //   console.log(event.target.parentNode.parentNode.nextElementSibling);

  //   switch (event.keyCode) {
  //     case 39:
  //       if (myTarget.parentNode.parentNode.nextElementSibling) {
  //         let nextImage =
  //           myTarget.parentNode.parentNode.nextElementSibling.firstElementChild
  //             .firstElementChild;

  //         lightboxImg.setAttribute("src", nextImage.dataset.source);
  //         myTarget = nextImage;
  //       }
  //       break;
  //     case 37:
  //       if (myTarget.parentNode.parentNode.previousElementSibling) {
  //         let prevImage =
  //           myTarget.parentNode.parentNode.previousElementSibling
  //             .firstElementChild.firstElementChild;

  //         lightboxImg.setAttribute("src", prevImage.dataset.source);
  //         myTarget = prevImage;
  //       }
  //     case 27:
  //       EcsModal();
  //       break;
  //   }
  // };

  const closeModal = () => {
    lightboxImg.src = "";
    lightboxRef.classList.remove("is-open");
    lightboxOverlay.classList.remove("is-open");
    document.removeEventListener("keydown", EcsModal);
    // document.removeEventListener("keydown", Nextimg);
  };

  galleryRef.addEventListener("click", openModal);
  buttonRef.addEventListener("click", closeModal);
  lightboxOverlay.addEventListener("click", closeModal);
  // document.removeEventListener("keydown", Nextimg);
  document.removeEventListener("keydown", moveRight);
  document.removeEventListener("keydown", moveLeft);
});

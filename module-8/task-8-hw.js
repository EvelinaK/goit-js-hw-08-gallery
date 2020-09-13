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

  let activeSlide;
  const openModal = ({ target }) => {
    if (target.classList.contains("gallery__image")) {
      event.preventDefault();
      lightboxImg.src = target.dataset.source;
      lightboxImg.alt = target.alt;
      lightboxRef.classList.add("is-open");
      lightboxOverlay.classList.add("is-open");
      document.addEventListener("keydown", EcsModal);
      document.addEventListener("keydown", moveRight);
      document.addEventListener("keydown", moveLeft);
      activeSlide = target.dataset.index;
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
  const moveLeft = (event) => {
    if (event.key === "ArrowRight") {
      activeSlide++;
      if (activeSlide > imgRefs.length - 1) {
        activeSlide = 0;
      }

      lightboxImg.src = imgRefs[activeSlide].dataset.source;
    }
  };
  // const move = ({ key }) => {
  //   const activeSlideOld = activeSlide;
  //   if (key === "ArrowRight") {
  //     activeSlide++;
  //   } else if (key === "ArrowLeft") {
  //     activeSlide--;
  //   }
  //   if (activeSlide !== activeSlideOld) {
  //     activeSlide = activeSlide % imgRefs.length;
  //     lightboxImg.src = imgRefs[activeSlide].dataset.source;
  //   }
  // };

  const closeModal = () => {
    lightboxImg.src = "";
    lightboxRef.classList.remove("is-open");
    lightboxOverlay.classList.remove("is-open");
    document.removeEventListener("keydown", EcsModal);
  };

  galleryRef.addEventListener("click", openModal);
  buttonRef.addEventListener("click", closeModal);
  lightboxOverlay.addEventListener("click", closeModal);
  document.removeEventListener("keydown", moveRight);
  document.removeEventListener("keydown", moveLeft);
});

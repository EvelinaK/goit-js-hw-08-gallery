import gallery from "./gallery-items.js";

// добавляю массив картинок в галерею

document.addEventListener("DOMContentLoaded", () => {
  let galleryRef = document.querySelector(".gallery");
  const galleryHtml = gallery.map((img) => {
    return (img = `<li class="gallery__item">
    <a class="gallery__link" href="${img.original}">
    <img
      class="gallery__image"
      src="${img.preview}"
      data-source="${img.original}"
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
  const lightboxImgref = lightboxRef.querySelectorAll(".lightbox__image");
  const linklImg = document.querySelectorAll(".gallery__link");
  const lightboxOverlay = lightboxRef.querySelector(".lightbox__overlay");
  let myTarget;
  const openmodal = (event) => {
    if (event.target.classList.contains("gallery__image")) {
      event.preventDefault();
      console.log(event.target);
      lightboxRef.classList.add("is-open");
      lightboxOverlay.classList.add("is-open");
      lightboxImg.src = event.target.dataset.source;
      lightboxImg.alt = event.target.alt;
      document.addEventListener("keydown", EcsModal);
      document.addEventListener("keydown", Nextimg);
      myTarget = event.target;
    }
  };

  const EcsModal = (event) => {
    if (event.keyCode == 27) {
      lightboxRef.classList.remove("is-open");
    }
  };

  const Nextimg = (event) => {
    console.log(event.key);
    console.log(event.target.parentNode.parentNode.nextElementSibling);

    switch (event.keyCode) {
      case 39:
        if (myTarget.parentNode.parentNode.nextElementSibling) {
          let nextImage =
            myTarget.parentNode.parentNode.nextElementSibling.firstElementChild
              .firstElementChild;

          lightboxImg.setAttribute("src", nextImage.dataset.source);
          myTarget = nextImage;
        }
        break;
      case 37:
        if (myTarget.parentNode.parentNode.previousElementSibling) {
          let prevImage =
            myTarget.parentNode.parentNode.previousElementSibling
              .firstElementChild.firstElementChild;

          lightboxImg.setAttribute("src", prevImage.dataset.source);
          myTarget = prevImage;
        }
      case 27:
        EcsModal();
        break;
    }
  };

  const closemodal = () => {
    lightboxRef.classList.remove("is-open");
    lightboxOverlay.classList.remove("is-open");
    lightboxImg.src = "";
    document.removeEventListener("keydown", EcsModal);
    document.removeEventListener("keydown", Nextimg);
  };

  galleryRef.addEventListener("click", openmodal);
  buttonRef.addEventListener("click", closemodal);
  lightboxOverlay.addEventListener("click", closemodal);
  document.removeEventListener("keydown", Nextimg);
});

// const imgRef = document.querySelector(".gallery__image");
//   const lightboxRef = document.querySelector(".lightbox");
//   const buttonRef = lightboxRef.querySelector(".lightbox__button");
//   const lightboxImg = lightboxRef.querySelector(".lightbox__image");
//   const linklImg = document.querySelector(".gallery__link");
//   const lightboxOverlay = lightboxRef.querySelector(".lightbox__overlay");
//   const openmodal = (event) => {
//     if (event.target.classList.contains("gallery__image")) {
//       event.preventDefault();
//       console.log(event.target);
//       lightboxRef.classList.add("is-open");
//       lightboxOverlay.classList.add("is-open");
//       lightboxImg.src = event.target.dataset.source;
//       lightboxImg.alt = event.target.alt;
//       lightboxOverlay.addEventListener("keydown", function (event) {
//         if (event.keyCode === 27) {
//           lightboxOverlay.classList.remove("is-open");
//         }
//       });
//     }
//   };
//   const closemodal = (event) => {
//     lightboxRef.classList.remove("is-open");
//     lightboxOverlay.classList.remove("is-open");
//     lightboxImg.src = "";
//     lightboxOverlay.removeEventListener("keydown", event);
//   };

//   galleryRef.addEventListener("click", openmodal);
//   buttonRef.addEventListener("click", closemodal);
//   lightboxOverlay.addEventListener("click", closemodal);
// });

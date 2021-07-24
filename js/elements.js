import images from "./app.js";

const refs = {
  gallery: document.querySelector(".gallery"),
  lightbox: document.querySelector(".lightbox"),
  lightbox_overlay: document.querySelector(".lightbox__overlay"),
  modal: document.querySelector(".lightbox__content"),
  lightbox__image: document.querySelector(".lightbox__image"),
  image: document.createElement("img"),
  btn: document.querySelector('[data-action="close-lightbox"]'),
  escCloseModal: document.querySelector(".lightbox__overlay"),
};

const createGalleryItems = ({ preview, original, description }) =>
  `<li class="gallery__item">
<a
  class="gallery__link"
  href=${original}
>
  <img
    class="gallery__image"
    src=${preview}
    data-source=${original}
    alt=${description}
  />
</a>
</li>`;

const galleryMarkup = images.reduce(
  (acc, item) => acc + createGalleryItems(item),
  ""
);

refs.gallery.insertAdjacentHTML("afterbegin", galleryMarkup);
refs.image.classList.add("gallery__image");

refs.gallery.addEventListener("click", onGalleryClick);
refs.btn.addEventListener("click", onClickGalleryClose);
refs.modal.addEventListener("click", closeLightbox);
refs.lightbox_overlay.addEventListener("click", closeLightboxOverlay);
refs.escCloseModal.addEventListener("click", closeModalByEscape);
function onGalleryClick(el) {
  el.preventDefault();
  if (el.target.nodeName !== "IMG") {
    return;
  }
  if (el.target.nodeName === "IMG") {
    refs.lightbox.classList.add("is-open");
    refs.lightbox__image.src = el.target.getAttribute("data-source");
    refs.lightbox__image.alt = el.target.alt;
    refs.lightbox__image.description = el.target.description;
  }
}
function onClickGalleryClose(el) {
  el.preventDefault();
  refs.lightbox.classList.remove("is-open");
  refs.lightbox__image.src = "";
  refs.lightbox__image.alt = "";
  refs.lightbox__image.description = "";
}

function closeLightbox(event) {
  if (event.target === event.currentTarget) {
    onClickGalleryClose();
  }
  
}
function closeModalByEscape(event){
if (event.keyCode === 27) {
  onClickGalleryClose();
}
}


function closeLightboxOverlay(event) {
  event.preventDefault();
  refs.lightbox.classList.remove("is-open");
  refs.lightbox__image.src = "";
  refs.lightbox__image.alt = "";
  refs.lightbox__image.description = "";
}

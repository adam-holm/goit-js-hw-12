import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader'); // Додали пошук лоадера тут

// Ініціалізація лайтбоксу
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b>${likes}</p>
          <p class="info-item"><b>Views</b>${views}</p>
          <p class="info-item"><b>Comments</b>${comments}</p>
          <p class="info-item"><b>Downloads</b>${downloads}</p>
        </div>
      </li>`)
    .join("");

  gallery.innerHTML = markup;
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

// ДОДАЙ ЦІ ДВІ ФУНКЦІЇ ПРЯМО СЮДИ:

export function showLoader() {
  if (loader) loader.classList.remove('is-hidden');
}

export function hideLoader() {
  if (loader) loader.classList.add('is-hidden');
}
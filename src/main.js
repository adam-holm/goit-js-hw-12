import { getImagesByQuery } from './js/pixabay-api.js';
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let maxPage = 1;

// 1. ОБРОБКА САБМІТУ ФОРМИ
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  query = event.target.elements['search-text'].value.trim();
  page = 1;

  if (!query) {
    iziToast.warning({ message: "Please enter a search term" });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    
    if (data.hits.length === 0) {
      iziToast.error({ message: "Sorry, no images found." });
    } else {
      createGallery(data.hits);
      
      maxPage = Math.ceil(data.totalHits / 15);
      
      // ВИПРАВЛЕННЯ ДЛЯ МЕНТОРА:
      if (maxPage > 1) {
        showLoadMoreButton();
      } else {
        // Якщо результатів мало і сторінка лише одна — відразу показуємо інфо
        iziToast.info({ 
          message: "We're sorry, but you've reached the end of search results.",
          position: 'bottomRight'
        });
      }
    }
  } catch (error) {
    iziToast.error({ message: "Something went wrong!" });
  } finally {
    hideLoader();
    form.reset();
  }
});

// 2. ОБРОБКА КЛІКУ ПО КНОПЦІ LOAD MORE
loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton(); 
  showLoader();
  
  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    
    // ПЛАВНИЙ СКРОЛ
    const galleryItem = document.querySelector(".gallery-item");
    if (galleryItem) {
      const { height: cardHeight } = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
    }

    if (page >= maxPage) {
      hideLoadMoreButton();
      iziToast.info({ 
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomRight'
      });
    } else {
      showLoadMoreButton();
    }
    
  } catch (error) {
    iziToast.error({ message: "Error loading more images." });
  } finally {
    hideLoader();
  }
});
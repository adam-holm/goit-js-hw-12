
import { getImagesByQuery } from './js/pixabay-api.js';
// Додаємо нові функції в імпорт
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader 
} from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({ message: "Please enter a search term" });
    return;
  }

  clearGallery();
  
  // ВИПРАВЛЕНО: Викликаємо функцію замість прямої маніпуляції DOM
  showLoader(); 

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message: "Sorry, there are no images matching your search query.",
          position: 'topRight'
        });
        return;
      }
      createGallery(data.hits);
    })
    .catch(error => {
      console.error(error);
      iziToast.error({ message: "Something went wrong!" });
    })
    .finally(() => {
      // ВИПРАВЛЕНО: Викликаємо функцію приховування
      hideLoader(); 
      form.reset();
    });
});
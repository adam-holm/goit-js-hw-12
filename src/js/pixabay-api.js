import axios from 'axios';

const API_KEY = '55203157-9703e432d06ec35062b99b950';
const BASE_URL = 'https://pixabay.com/api/';

// 1. Додаємо параметр page (за замовчуванням 1)
// 2. Робимо функцію асинхронною (async)
export async function getImagesByQuery(query, page = 1) {
  // Використовуємо await для запиту
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,       // Додаємо номер сторінки в параметри
      per_page: 15,     // Встановлюємо 15 об'єктів за запит (вимога ТЗ)
    }
  });
  
  // Повертаємо дані (axios зберігає їх у властивості data)
  return response.data;
}
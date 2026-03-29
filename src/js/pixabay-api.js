import axios from 'axios';

const API_KEY = '55203157-9703e432d06ec35062b99b950';
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  return axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    }
  }).then(res => res.data);
}
import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '39981301-13bf59bc4498509007367da9c';
const input = document.querySelector('#searchQuery');

export async function getImages(page) {
  try {
    const response = await axios.get(
      `${URL}?key=${API_KEY}&q=${input.value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    if (!response.status === 200) {
      throw new Error(response.statusText);
    }
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

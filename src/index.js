import Notiflix from 'notiflix';

import { getImages } from './api';
import { createMarkup } from './markup';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const input = document.querySelector('#searchQuery');

btnLoadMore.style.visibility = 'hidden';

form.addEventListener('submit', handleSearch);
let page = 1;

async function handleSearch(event) {
  event.preventDefault();
  page = 1;
  btnLoadMore.style.visibility = 'hidden';
  gallery.innerHTML = '';
  const data = await getImages(page);
  createMarkup(data);
  if (data.hits.length === 0) {
    return Notiflix.Notify.failure(
      `Sorry, there are no images matching your "${input.value}". Please try again.`
    );
  }
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  btnLoadMore.style.visibility = 'visible';
}

btnLoadMore.addEventListener('click', async () => {
  page++;
  const data = await getImages(page);
  createMarkup(data);
  const totalImagesLoaded = page * 40;
  if (totalImagesLoaded <= data.totalHits) {
    btnLoadMore.style.visibility = 'visible';
  } else {
    btnLoadMore.style.visibility = 'hidden';
    Notiflix.Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
  }
});

import iziToast from 'izitoast'; // Описаний у документації
import 'izitoast/dist/css/iziToast.min.css'; // Додатковий імпорт стилів
import SimpleLightbox from 'simplelightbox'; // Описаний в документації
import 'simplelightbox/dist/simple-lightbox.min.css'; // Додатковий імпорт стилів

import { fetchPhotosByQuery } from './js/pixabay-api';
import { creatGallery } from './js/render-functions';

const form = document.querySelector('.form-search');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.load-more');

loader.style.display = 'none';
btnLoadMore.style.display = 'none';

let currentQuery = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

const galleryModal = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const handlerSearch = async event => {
  event.preventDefault();

  currentQuery = event.target.elements.user_query.value.trim();
  page = 1;
  gallery.innerHTML = '';
  btnLoadMore.style.display = 'none';

  if (!currentQuery) {
    iziToast.show({
      backgroundColor: '#EF4040',
      message: `Enter the data for the search!`,
      messageColor: '#FFFFFF',
      position: 'topRight',
    });
    return;
  }

  loader.style.display = 'inline-block';

  try {
    const data = await fetchPhotosByQuery(currentQuery, page, perPage);

    if (data.hits.length === 0) {
      iziToast.show({
        backgroundColor: '#EF4040',
        message: `Sorry, there are no images matching your search query. Please try again!`,
        messageColor: '#FFFFFF',
        position: 'topCenter',
      });
      return;
    }

    totalHits = data.totalHits;
    gallery.insertAdjacentHTML('beforeend', creatGallery(data.hits));
    galleryModal.refresh();

    // Показуємо кнопку "Load more", якщо дані є
    if (data.hits.length >= perPage) {
      btnLoadMore.style.display = 'block';
    }

    iziToast.show({
      backgroundColor: '#28a745',
      message: `Hooray! We found ${totalHits} images.`,
      messageColor: '#FFFFFF',
      position: 'topRight',
    });
  } catch (error) {
    console.error(error.message);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
      position: 'topCenter',
      backgroundColor: '#EF4040',
      messageColor: '#FFFFFF',
    });
  } finally {
    loader.style.display = 'none';
    event.target.reset();
  }
};

const loadImgMore = async () => {
  page += 1;

  loader.style.display = 'inline-block';
  btnLoadMore.style.display = 'none';

  try {
    const data = await fetchPhotosByQuery(currentQuery, page, perPage);

    if (data.hits.length === 0) {
      iziToast.show({
        backgroundColor: '#EF4040',
        message: `No more images to load.`,
        messageColor: '#FFFFFF',
        position: 'topCenter',
      });
      return;
    }

    gallery.insertAdjacentHTML('beforeend', creatGallery(data.hits));
    galleryModal.refresh();

    // Плавне прокручування сторінки
    const galleryItem = document.querySelector('.gallery .gallery-item');
    if (galleryItem) {
      const { height } = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }

    // Перевірка, чи завантажено всі зображення
    const totalLoaded = document.querySelectorAll(
      '.gallery .gallery-item'
    ).length;
    if (totalLoaded >= totalHits) {
      btnLoadMore.style.display = 'none';
      iziToast.show({
        backgroundColor: '#EF4040',
        message: `We're sorry, but you've reached the end of search results.`,
        messageColor: '#FFFFFF',
        position: 'topCenter',
      });
    } else {
      btnLoadMore.style.display = 'block'; // Показуємо кнопку, якщо ще є зображення
    }
  } catch (error) {
    console.error(error.message);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
      position: 'topCenter',
      backgroundColor: '#EF4040',
      messageColor: '#FFFFFF',
    });
  } finally {
    loader.style.display = 'none';
  }
};

form.addEventListener('submit', handlerSearch);
btnLoadMore.addEventListener('click', loadImgMore);

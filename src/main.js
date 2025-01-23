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

const galleryModal = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const handlerSearch = async event => {
  event.preventDefault();

  currentQuery = event.target.elements.user_query.value.trim();
  page = 1; // Скидаємо значення сторінки на початкове
  gallery.innerHTML = ''; // Очищення галереї
  btnLoadMore.style.display = 'none'; // Ховаємо кнопку "Load more"

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

    gallery.insertAdjacentHTML('beforeend', creatGallery(data.hits));
    galleryModal.refresh();

    // Показуємо кнопку "Load more", якщо дані є
    if (data.hits.length >= perPage) {
      btnLoadMore.style.display = 'block';
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
    event.target.reset();
  }
};

const loadImgMore = async () => {
  page += 1; // Збільшуємо значення сторінки

  loader.style.display = 'inline-block';
  btnLoadMore.style.display = 'none'; // Ховаємо кнопку на час завантаження

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

    // Додаємо нові зображення в галерею
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

    // Показуємо кнопку "Load more", якщо є більше зображень
    if (data.hits.length >= perPage) {
      btnLoadMore.style.display = 'block';
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

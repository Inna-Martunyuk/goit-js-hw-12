import iziToast from 'izitoast'; // Описаний у документації
import 'izitoast/dist/css/iziToast.min.css'; // Додатковий імпорт стилів
import SimpleLightbox from 'simplelightbox'; // Описаний в документації
import 'simplelightbox/dist/simple-lightbox.min.css'; // Додатковий імпорт стилів

import { fetchPhotosByQuery } from './js/pixabay-api';
import { creatGallery } from './js/render-functions';

const form = document.querySelector('.form-search');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

loader.style.display = 'none';

const galleryModal = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const handlerSearch = event => {
  event.preventDefault();

  let question = event.target.elements.user_query.value.trim(); // input world

  gallery.innerHTML = ' ';

  if (!question) {
    iziToast.show({
      backgroundColor: '#EF4040',
      message: `Enter the data for the search!`,
      messageColor: '#FFFFFF',
      position: 'topRight',
    });
    return;
  }

  loader.style.display = 'inline-block';

  fetchPhotosByQuery(question) // promise
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.show({
          title: '',
          backgroundColor: '#EF4040',
          messageColor: '#FFFFFF',
          message: `Sorry, there are no images matching your search query. Please try again!`,
          position: 'topCenter',
        });
      }

      gallery.insertAdjacentHTML('beforeend', creatGallery(data.hits));
      galleryModal.refresh();
      loader.style.display = 'none';
    })
    .catch(error => {
      console.log(error.message);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later!',
        position: 'topCenter',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
      });
    })
    .finally(() => {
      event.target.reset();
      loader.style.display = 'none';
    });
};

form.addEventListener('submit', handlerSearch);

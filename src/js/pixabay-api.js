import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48245420-0c25989f875d1fe30dc45addb';

export async function fetchPhotosByQuery(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query.trim(),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error.message);
    throw error;
  }
}

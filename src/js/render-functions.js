export function creatGallery(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags = 'No tags',
        likes = 0,
        views = 0,
        comments = 0,
        downloads = 0,
      }) =>
        `<li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <ul class="inform">
                <li class="inform-item">
                    <h2 class="inform-title">Likes:</h2>
                    <p class="inform-dan">${likes}</p>
                </li>
                <li class="inform-item">
                    <h2 class="inform-title">Views:</h2>
                    <p class="inform-dan">${views}</p>
                </li>
                <li class="inform-item">
                    <h2 class="inform-title">Comments:</h2>
                    <p class="inform-dan">${comments}</p>
                </li>
                <li class="inform-item">
                    <h2 class="inform-title">Downloads:</h2>
                    <p class="inform-dan">${downloads}</p>
                </li>
            </ul>
        </li>`
    )
    .join('');
}

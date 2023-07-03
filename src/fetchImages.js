const BASE_URL =
  'https://pixabay.com/api/?key=32874025-27c2a6f3bebdb103c7b8a921c';

export const fetchImages = (query, page = 1, perPage = 12) => {
  return fetch(
    BASE_URL +
    `&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error('Something went wrong :('));
  });
};

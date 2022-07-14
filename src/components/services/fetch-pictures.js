const key = '27577235-c9daade09bc67e8d645cf910b';

export function requestFetch(name, page) {
  return fetch(
    `https://pixabay.com/api/?key=${key}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
  ).then(respons => respons.json());
}

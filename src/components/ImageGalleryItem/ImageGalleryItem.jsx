export function ImageGalleryItem({ arrayOfPictures }) {
  let markup = arrayOfPictures.map(el => {
    return (
      <li key={el.id}>
        <img src={el.webformatURL} alt={el.tags} />
      </li>
    );
  });

  return markup;
}

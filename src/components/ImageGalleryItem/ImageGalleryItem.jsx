import {
  ImageEl,
  Image,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export function ImageGalleryItem({ arrayOfPictures }) {
  if (arrayOfPictures) {
    let markup = arrayOfPictures.map(el => {
      return (
        <ImageEl key={el.id}>
          <Image src={el.webformatURL} alt={el.tags} />
        </ImageEl>
      );
    });

    return markup;
  }
}

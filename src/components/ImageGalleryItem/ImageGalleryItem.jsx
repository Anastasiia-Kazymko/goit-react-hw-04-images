import {
  ImageEl,
  Image,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export function ImageGalleryItem({ arrayOfPictures }) {
  //console.log(arrayOfPictures);
  if (arrayOfPictures) {
    let markup = arrayOfPictures.map(el => {
      return (
        <ImageEl key={el.id}>
          <Image src={el.webformatURL} alt={el.tags} width="100px" />
        </ImageEl>
      );
    });

    return markup;
  }
}

import {
  ImageEl,
  Image,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export default function ImageGalleryItem({
  onClick,
  largeImageURL,
  webformatURL,
  tags,
  id,
}) {
  const handleClick = () => {
    onClick(largeImageURL, tags);
  };

  return (
    <ImageEl key={id}>
      <Image src={webformatURL} alt={tags} onClick={handleClick} />
    </ImageEl>
  );
}

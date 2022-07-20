import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { Gallery } from 'components/ImageGallery/ImageGalleryItem.styled';
import { requestFetch } from 'components/services/fetch-pictures';

export default function ImageGaller({ imageSearch }) {
  const [arrayOfPictures, setArrayOfPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imageTag, setImageTag] = useState('');

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onOpenModal = (url, tags) => {
    setLargeImageURL(url);
    setImageTag(tags);

    modalToggle();
  };

  const modalToggle = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (!imageSearch) {
      return;
    }
    setStatus('pending');

    requestFetch(imageSearch, 1)
      .then(object => {
        if (object.hits.length === 0) {
          setStatus('rejected');
          return toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setArrayOfPictures(object.hits);
        setStatus('resolved');
      })
      .catch(error => setError(error));
  }, [imageSearch]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    requestFetch(imageSearch, page + 1).then(object => {
      setArrayOfPictures([...arrayOfPictures, ...object.hits]);
    });
  }, [page, imageSearch, arrayOfPictures]);

  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'resolved') {
    return (
      <>
        <Gallery>
          {arrayOfPictures.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              tags={tags}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onClick={onOpenModal}
            />
          ))}
          {showModal && (
            <Modal
              src={largeImageURL}
              tags={imageTag}
              onCloseModal={modalToggle}
            />
          )}
          {<Button onLoadMore={onLoadMore} />}
        </Gallery>
      </>
    );
  }
}

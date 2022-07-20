import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { App } from 'components/App.styled';
import 'react-toastify/dist/ReactToastify.css';

export default function ImageFinder() {
  const [imageSearch, setImageSearch] = useState('');

  const hadleFornSubmit = imageSearch => {
    setImageSearch(imageSearch);
  };

  return (
    <App>
      <Searchbar onSubmit={hadleFornSubmit} />
      <ImageGallery imageSearch={imageSearch} />
      <ToastContainer autoclose={3000} />
    </App>
  );
}

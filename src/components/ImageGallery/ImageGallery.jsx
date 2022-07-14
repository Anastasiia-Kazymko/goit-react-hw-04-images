import React from 'react';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import { Gallery } from 'components/ImageGallery/ImageGalleryItem.styled';

export class ImageGallery extends React.Component {
  state = {
    arrayOfPictures: [],
    page: 1,
    error: null,
    status: 'idle',
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageSearch;
    const nextName = this.props.imageSearch;

    if (prevName !== nextName || prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?key=27577235-c9daade09bc67e8d645cf910b&q=${nextName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${this.state.page}`
      )
        .then(responce => responce.json())
        .then(object => {
          this.setState(prevState => ({
            arrayOfPictures: [...prevState.arrayOfPictures, ...object.hits],
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { status, arrayOfPictures } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
      if (arrayOfPictures.length === 0) {
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      return (
        <>
          <Gallery>
            <ImageGalleryItem arrayOfPictures={arrayOfPictures} />
            {<Button onLoadMore={this.onLoadMore} />}
          </Gallery>
        </>
      );
    }
  }
}

import React from 'react';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

export class ImageGallery extends React.Component {
  state = {
    arrayOfPictures: null,
    page: 1,
    error: null,
    status: 'idle',
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageSearch;
    const nextName = this.props.imageSearch;
    if (prevName !== nextName) {
      this.setState({ status: 'pending', page: 1 });

      fetch(
        `https://pixabay.com/api/?key=27577235-c9daade09bc67e8d645cf910b&q=${nextName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${this.state.page}`
      )
        .then(responce => responce.json())
        .then(object => {
          this.setState({ arrayOfPictures: object.hits, status: 'resolved' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  getImages = () => {
    fetch(
      `https://pixabay.com/api/?key=27577235-c9daade09bc67e8d645cf910b&q=${this.props.imageSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${this.state.page}`
    )
      .then(responce => responce.json())
      .then(object => {
        this.setState(prevState => ({
          arrayOfPictures: [...prevState.arrayOfPictures, ...object],
          status: 'resolved',
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  onLoadMore = () => {
    this.getImages();
  };

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
          <ul>
            <ImageGalleryItem arrayOfPictures={arrayOfPictures} />
          </ul>
          {<Button onLoadMore={this.onLoadMore()} />}
        </>
      );
    }
  }
}

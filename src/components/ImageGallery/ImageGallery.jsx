import React from 'react';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import { Gallery } from 'components/ImageGallery/ImageGalleryItem.styled';
import { requestFetch } from 'components/services/fetch-pictures';

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

    if (prevName !== nextName) {
      this.setState({ status: 'pending', page: 1 });

      requestFetch(nextName, this.state.page)
        .then(object => {
          if (object.hits.length === 0) {
            return toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
          this.setState(() => ({
            arrayOfPictures: object.hits,
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (prevState.page !== this.state.page) {
      requestFetch(nextName, this.state.page + 1).then(object => {
        this.setState(prevState => {
          return {
            arrayOfPictures: [...prevState.arrayOfPictures, ...object.hits],
          };
        });
      });
    }
  }

  render() {
    const { status, arrayOfPictures } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
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

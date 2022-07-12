import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
//import Loader from 'components/Loader/Loader';

export class ImageGallery extends React.Component {
  state = {
    arrayOfPictures: null,
    page: 1,
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageSearch !== this.props.imageSearch) {
      this.setState({ loading: true });

      fetch(
        `https://pixabay.com/api/?key=27577235-c9daade09bc67e8d645cf910b&q=${this.props.imageSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${this.state.page}`
      )
        .then(res => res.json())
        .then(object => {
          this.setState({ arrayOfPictures: object.hits });
        })
        .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    return (
      <ul>
        <ImageGalleryItem arrayOfPictures={this.state.arrayOfPictures} />
      </ul>
    );
  }
}

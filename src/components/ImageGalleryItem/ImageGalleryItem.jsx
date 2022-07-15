import React, { Component } from 'react';
import {
  ImageEl,
  Image,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  handleClick = () => {
    this.props.onClick(this.props.largeImageURL, this.props.tags);
  };

  render() {
    const { id, webformatURL, tags } = this.props;

    return (
      <ImageEl key={id}>
        <Image src={webformatURL} alt={tags} onClick={this.handleClick} />
      </ImageEl>
    );
  }
}

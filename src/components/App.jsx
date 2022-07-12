import React from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';

export class ImageFinder extends React.Component {
  state = {
    imageSearch: '',
  };

  hadleFornSubmit = imageSearch => {
    this.setState({ imageSearch });
  };

  render() {
    return <Searchbar onSubmit={this.hadleFornSubmit} />;
  }
}

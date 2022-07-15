import React from 'react';

import { Overlay, Picture } from 'components/Modal/Modal.styled';

export default class Modal extends React.Component {
  render() {
    console.log(this.props.src);
    console.log(this.props.tags);
    //const { src, tags } = this.props;
    return (
      <Overlay>
        <Picture src={this.props.src} alt={this.props.tags} />
      </Overlay>
    );
  }
}

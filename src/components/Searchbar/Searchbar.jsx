import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

//import 'components/Searchbar/Searchbar.css';

export class Searchbar extends React.Component {
  state = {
    imageSearch: '',
  };

  handleNameChange = e => {
    this.setState({ imageSearch: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.imageSearch.trim() === '') {
      return toast.error('Please fill in the field!');
    }
    this.props.onSubmit(this.state.imageSearch);
    this.setState({ imageSearch: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form onSubmit={this.handleSubmit} className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
          <input
            className="input"
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
            name="imageSearch"
            value={this.state.imageSearch}
            onChange={this.handleNameChange}
            autofocus
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

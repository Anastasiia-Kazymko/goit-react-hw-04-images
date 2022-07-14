import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Form,
  SearchButton,
  SearchInput,
  SearchMenu,
  ButtonLabel,
} from 'components/Searchbar/Searchbar.styled';

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
      <SearchMenu>
        <Form onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </SearchButton>
          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="imageSearch"
            value={this.state.imageSearch}
            onChange={this.handleNameChange}
          />
        </Form>
      </SearchMenu>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

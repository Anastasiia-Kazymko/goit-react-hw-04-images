import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Form,
  SearchButton,
  SearchInput,
  SearchMenu,
  ButtonLabel,
} from 'components/Searchbar/Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [imageSearch, setImageSearch] = useState('');

  const handleNameChange = e => {
    setImageSearch(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imageSearch.trim() === '') {
      return toast.error('Please fill in the field!');
    }
    onSubmit(imageSearch);
    setImageSearch('');
  };

  return (
    <SearchMenu>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </SearchButton>
        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="imageSearch"
          value={imageSearch}
          onChange={handleNameChange}
        />
      </Form>
    </SearchMenu>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

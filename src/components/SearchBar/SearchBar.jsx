import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import {
  FormInput,
  Header,
  SearchForm,
  SubmitBtn,
  SubmitBtnLabel,
} from './SearchBar.styled';

const SearchBar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const onChange = event => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(event.currentTarget.children[1].value);
    setSearch('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SubmitBtn type="submit">
          <BiSearch size={25} />
          <SubmitBtnLabel>Search</SubmitBtnLabel>
        </SubmitBtn>

        <FormInput
          onChange={onChange}
          value={search}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
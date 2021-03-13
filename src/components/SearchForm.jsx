import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Divider, IconButton, InputAdornment, InputBase,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { search } from '../features/searcherSlice';
import { selectKeywrod } from '../features/selector';

const Search = styled.form`
  background-color: rgba(255,255,255,.15);
  width: ${({ actived }) => (actived ? '320px' : '300px')};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin-left: ${({ theme }) => theme.spacing(3)}px;
  padding: ${({ theme }) => theme.spacing(0.5)}px ${({ theme }) => theme.spacing(1)}px;
  display: flex;
  transition: all .5s ease;
  &:hover{
    width: 320px;
    background-color: rgba(255,255,255,.3);
  }
  .MuiDivider-root{
    margin-right: ${({ theme }) => theme.spacing(1)}px;
  }
`;

function SearchForm() {
  const [searchInputFocus, setSearchInputFocus] = useState(false);
  const defaultKeyword = useSelector(selectKeywrod);
  const [keyword, setKeyword] = useState(defaultKeyword);
  const dispatch = useDispatch();

  useEffect(() => {
    setKeyword(defaultKeyword);
  }, [defaultKeyword]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(search(keyword));
  };

  const onSearchInputChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <Search actived={searchInputFocus} onSubmit={handleSearchSubmit}>
      <InputBase
        fullWidth
        onFocusCapture={() => setSearchInputFocus(true)}
        onBlur={() => setSearchInputFocus(false)}
        onChange={onSearchInputChange}
        value={keyword}
        endAdornment={(
          <InputAdornment position="end">
            <div style={{ display: 'flex' }}>
              <Divider orientation="vertical" flexItem />
              <IconButton size="small" aria-label="search" type="submit">
                <SearchIcon />
              </IconButton>
            </div>
          </InputAdornment>
        )}
      />
    </Search>
  );
}

export default SearchForm;

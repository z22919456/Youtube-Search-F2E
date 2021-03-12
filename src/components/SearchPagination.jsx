import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import { goNextPage } from '../features/searcherSlice';
import { selectPage } from '../features/selector';

// TODO: last page shoud not have next page btn in pagination
// TODO: add keywor & page to route params

const StyledContianer = styled(Container)`
  margin: ${({ theme }) => theme.spacing(4)}px 0;
  display: flex !important;
  justify-content: center;
`;

function SearchPagination() {
  const dispatch = useDispatch();
  const { currentPageNum, pageTokenList } = useSelector(selectPage);
  const handlePageChange = (e, value) => {
    dispatch(goNextPage(value));
  };
  return (
    <StyledContianer>
      <Pagination color="primary" variant="outlined" page={parseInt(currentPageNum, 10)} count={pageTokenList.length} onChange={handlePageChange} />
    </StyledContianer>
  );
}

export default SearchPagination;

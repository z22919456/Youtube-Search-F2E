import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import { goNextPage } from '../features/searcherSlice';
import { selectPageList } from '../features/selector';

// TODO: last page shoud not have next page btn in pagination
// TODO: add keywor & page to route params

const StyledContianer = styled(Container)`
  margin: ${({ theme }) => theme.spacing(4)}px 0;
  display: flex !important;
  justify-content: center;
`;

function SearchPagination() {
  const dispatch = useDispatch();
  const pageList = useSelector(selectPageList);
  const handlePageChange = (e, value) => {
    dispatch(goNextPage(value));
  };
  return (
    <StyledContianer>
      <Pagination color="primary" variant="outlined" count={pageList.length} onChange={handlePageChange} />
    </StyledContianer>
  );
}

export default SearchPagination;

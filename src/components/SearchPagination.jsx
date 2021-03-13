import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import { goNextPage } from '../features/searcherSlice';
import { selectPage } from '../features/selector';

const StyledContianer = styled(Container)`
  margin: ${({ theme }) => theme.spacing(4)}px 0;
  display: flex !important;
  justify-content: center;
`;

function SearchPagination() {
  const dispatch = useDispatch();
  const { currentPageNum, totalPage, totalResults } = useSelector(selectPage);
  const handlePageChange = (e, value) => {
    dispatch(goNextPage(value));
  };
  return (
    <StyledContianer>
      {totalResults !== 0 && <Pagination color="primary" variant="outlined" page={parseInt(currentPageNum, 10)} count={parseInt(totalPage, 10)} onChange={handlePageChange} />}
    </StyledContianer>
  );
}

export default SearchPagination;

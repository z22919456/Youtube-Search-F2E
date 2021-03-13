import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectItems } from '../features/selector';
import Video from './Video';
import VideoLoading from './VideoLoading';
import ResultInfo from './ResultInfo';
import NullList from './NullList';

const StyledContainer = styled(Container)`
  padding-top: 80px;
`;

function VideoListContainer() {
  const { items, loading } = useSelector(selectItems);
  return (
    <StyledContainer>
      <ResultInfo />
      <div>
        <Grid container spacing={4}>
          {loading ? Array.from({ length: 24 }).map((i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <VideoLoading />
            </Grid>
          )) : items && items.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.etag}>
              <Video item={item} />
            </Grid>
          ))}
        </Grid>
        {(!loading && (!items || items.length === 0))
          && <NullList />}
      </div>
    </StyledContainer>
  );
}

export default VideoListContainer;

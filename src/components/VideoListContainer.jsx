import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectItems } from '../features/selector';
import Video from './Video';

const StyledContainer = styled(Container)`
  padding-top: 80px;
`;

function VideoListContainer() {
  const items = useSelector(selectItems);
  return (
    <StyledContainer>
      <Grid container spacing={4}>
        {items && items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.etag}>
            <Video item={item} />
          </Grid>
        ))}

      </Grid>
    </StyledContainer>
  );
}

export default VideoListContainer;

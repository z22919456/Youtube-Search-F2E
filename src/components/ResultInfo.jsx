import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectInfo } from '../features/selector';

function ResultInfo() {
  const { keyword, totalResults } = useSelector(selectInfo);
  return (
    <div style={{ paddingBottom: '25px' }}>
      { keyword
        && (
          <Typography variant="body1" color="textPrimary">
            約有
            {' '}
            { totalResults}
            {' '}
            項結果
          </Typography>
        )}
    </div>
  );
}

export default ResultInfo;

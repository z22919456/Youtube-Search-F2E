import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const Null = styled(Paper)`
  width: 100%;
  margin-top: 30px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content:center;
`;

function NullList() {
  return (
    <Null>
      <div>
        <Typography align="center" variant="h3">查無影片</Typography>
        <Typography align="center" variant="body1">請輸入其他關鍵字試試</Typography>
      </div>
    </Null>
  );
}

export default NullList;

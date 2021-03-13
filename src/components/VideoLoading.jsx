/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  
  .thumbnail-container{
    display: block;
    padding-top: 56.25%;
    width: 100%;
    background: white;
    opacity: .1;
  }
  .details{
    .h1{
      margin: 15px 0 0 0;
      background: white;
      opacity: .1;
      height: 2rem;
      width: 80%;
    }
    .channel{
      margin: 10px 0 0 0;
      background: white;
      opacity: .1;
      height: 22px;
      width: 40%;
    }
  }
`;

function Video() {
  return (
    <Item>
      <div className="thumbnail-container" />

      <div className="details">
        <div className="h1" />
        <p className="channel" />
      </div>
    </Item>
  );
}

export default Video;

/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import moment from '../utils/moment';

const Item = styled.div`

  &:hover .thumbnail-container::before{
    opacity: .2
  }
  .thumbnail-container{
    position: relative;
    display: block;
    padding-top: 56.25%;
    width: 100%;
    overflow: hidden;
    &::before{
      content: "";
      width: 100%;
      height: 100%;
      top: 0;
      position: absolute;
      background: white;
      opacity: 0;
      z-index: 10;
      transition: all .2s ease-in;
    }
    &::after{
      content: "";
      width: 100%;
      height: 100%;
      top: 0;
      position: absolute;
      background: white;
      opacity: .1;
      ${({ varient }) => (varient === 'youtube#channel' ? `
          transform: translate(-50%, -50%);
          top: 50%;
          left: 50%;
          width: 56.25% !important;
          border-radius: 50%;
        ` : '')};
    }
    img{
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      ${({ varient }) => (varient === 'youtube#channel'
    ? `
        height: 100%;
        border-radius: 50%;
      `
    : `
      width: 100%;
      `)}
    }
  }
  .details{
    position: relative;
    cursor: pointer;
    h1{
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 1rem;
      line-height: 1.25rem;
      height: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .channel{
      margin: 0;
      color: ${({ theme }) => theme.palette.text.secondary};
      a{
        color: ${({ theme }) => theme.palette.text.secondary};
        text-decoration: none;
        transition: all .2s ease-in;
      }
      &:hover a{
        color: ${({ theme }) => theme.palette.text.primary};
      }
    }
  }
`;

const Link = styled.a`
  text-decoration: none;
`;

const videoUrl = (videoId) => `https://youtube.com.tw/watch?v=${videoId}`;
const channelUrl = (channelId) => `https://youtube.com.tw/channel/${channelId}`;

function Video({ item }) {
  const { id, snippet } = item;
  const {
    thumbnails, publishTime, title, channelId, channelTitle,
  } = snippet;
  return (
    <Item varient={id.kind}>
      <a href={id.kine === 'youtube#channel' ? channelUrl(channelId) : videoUrl(id.videoId)}>
        <div className="thumbnail-container">
          <img src={thumbnails.high.url} alt={title} />
        </div>
      </a>
      <div className="details">
        <Link href={id.kine === 'youtube#channel' ? channelUrl(channelId) : videoUrl(id.videoId)}>
          <h1>{title}</h1>
        </Link>
        {id.kind !== 'youtube#channel'
          && (
            <p className="channel">
              <a href={channelUrl(channelId)}>
                <span>{channelTitle}</span>
              </a>
              <span>·</span>
              <span>{moment(publishTime).fromNow()}</span>
            </p>
          )}

      </div>
    </Item>
  );
}

export default Video;

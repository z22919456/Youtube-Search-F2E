import React, { useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import './App.css';
import 'normalize.css';
import { useDispatch, useSelector } from 'react-redux';
import SearchToolBar from './components/SearchToolbar';
import theme from './theme';
import VideoListContainer from './components/VideoListContainer';
import SearchPagination from './components/SearchPagination';
import useQueryString from './components/useQueryString';
import {
  search, restoreState, restorePageByQueryString,
} from './features/searcherSlice';
import { selectQuery } from './features/selector';
import { loadState } from './utils/localStorage';

function App() {
  const { query, setQueryString } = useQueryString();
  const queryState = useSelector(selectQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    const state = loadState();
    if (state) {
      dispatch(restoreState(state));
      if (Object.keys(query).length !== 0) {
        dispatch(restorePageByQueryString(query));
      } else {
        dispatch(search(''));
      }
    } else {
      dispatch(search(''));
    }
  }, []);

  useEffect(() => {
    setQueryString(queryState);
  }, [queryState]);

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <SearchToolBar />
        <VideoListContainer />
        <SearchPagination />
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;

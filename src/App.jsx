import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import 'normalize.css';
import SearchToolBar from './components/SearchToolbar';
import theme from './theme';
import VideoListContainer from './components/VideoListContainer';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <SearchToolBar />
        <VideoListContainer />
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;

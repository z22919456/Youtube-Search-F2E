import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import SearchToolBar from './components/SearchToolbar';
import theme from './theme';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <SearchToolBar />
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;

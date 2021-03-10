import { createMuiTheme } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#424242',
      paper: '#424242',
    },
    primary: {
      main: red[300],
    },
    text: {
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
});

window.theme = theme;

export default theme;

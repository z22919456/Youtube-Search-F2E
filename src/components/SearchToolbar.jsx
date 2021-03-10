import { AppBar, Container, Toolbar } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import SearchForm from './SearchForm';

const LogoIcon = styled.div`
    width: 100px;
    svg{
      fill: white;  
    }
`;

function SearchToolBar() {
  return (

    <AppBar color="default">
      <Container>
        <Toolbar disableGutters>
          <LogoIcon>
            <Logo alt="logo" />
          </LogoIcon>
          <SearchForm />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default SearchToolBar;

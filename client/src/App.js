import React from 'react';

// Style
import { ThemeProvider } from 'styled-components';
import theme from 'style/theme';
import 'style/reset.css';
import 'style/index.css';

// Component
import { Content, Footer, Header } from 'component';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Content />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;

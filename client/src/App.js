import React from 'react';

// Style
import { ThemeProvider } from 'styled-components';
import theme from 'style/theme';
import 'style/reset.css';
import 'style/index.css';

// Component
import { Content, Footer, Header } from 'component';

function App() {
  console.log(process.env.REACT_APP_S3_ACCESS_KEY);
  console.log(process.env.REACT_APP_S3_SECRET_ACCESS_KEY);
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

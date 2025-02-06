import React from 'react';
import Layout from '../components/Layout';
import { AppProvider } from '../context/AppContext';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
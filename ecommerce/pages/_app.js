import '../styles/globals.css';
import { StateContextProvider } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <StateContextProvider>
      <Toaster />
      <Component {...pageProps} />
    </StateContextProvider>
  );
}

export default MyApp;

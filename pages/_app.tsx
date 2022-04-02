import '../styles/globals.css'
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { store } from '../redux_toolkit/store';
import 'bootstrap/dist/css/bootstrap.css'
function MyApp({
  Component, pageProps,
}: AppProps) {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
       <Component {...pageProps} />
       </PersistGate>
    
    </Provider>
  );
}

export default MyApp;

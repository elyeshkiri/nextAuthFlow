import '../styles/globals.css'
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { store } from '../redux_toolkit/store';
import 'bootstrap/dist/css/bootstrap.css'
import "../styles/scss/login.scss"
import "../styles/scss/_colors.scss"
import "../styles/scss/_fonts.scss"
import "../styles/scss/_variables.scss"
import "../styles/scss/components/forms.scss"
import "@fortawesome/fontawesome-free/css/all.css";
import "../styles/scss/leftSlider.scss"
import "../styles/scss/register.scss"
import "../styles/scss/forget.scss"
import "../styles/scss/verifyOtp.scss"
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

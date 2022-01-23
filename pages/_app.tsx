import type { AppProps } from 'next/app'
import 'src/styles/fonts.css';
import 'sezy-design/css/variables.css';
import 'sezy-design/css/default.css';
import 'src/styles/variables.css';
import 'src/styles/default.css';
import { Provider } from 'react-redux';
import store from 'src/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp

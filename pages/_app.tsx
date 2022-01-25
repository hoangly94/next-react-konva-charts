import type { AppProps } from 'next/app'
import '~styles/fonts.css';
import 'sezy-design/css/variables.css';
import 'sezy-design/css/default.css';
import '~styles/variables.css';
import '~styles/default.css';
import { Provider } from 'react-redux';
import store from '~store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp

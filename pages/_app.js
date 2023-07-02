import './global.sass';
import '../styles/global.css';
import Layout from '../components/Layout.js';

export default function MyApp({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>;
}
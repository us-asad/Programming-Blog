import { Header } from "../components";
import '../styles/globals.scss'


function MyApp({ Component, pageProps }) {
  return (
  	<>
  		<Header />
  		<Component {...pageProps} />
  	</>
  );
}

export default MyApp

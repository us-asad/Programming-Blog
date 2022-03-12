import { Header, CarouselFeaturedPosts } from "components";
import 'styles/globals.scss'


function MyApp({ Component, pageProps }) {
  return (
  	<>
  		<Header />
  		<CarouselFeaturedPosts />
  		<Component {...pageProps} />
  	</>
  );
}

export default MyApp

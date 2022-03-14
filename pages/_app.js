import Head from "next/head";
import { Header } from "components";
import 'styles/globals.scss'


function MyApp({ Component, pageProps }) {
  return (
  	<>
  		<Head>
	    	<title>Blog - Programming</title>
	      <meta name="description" content="Programming Blog | Find fascinating blogs about programming" />
	      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
	      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
	      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
	      <link rel="manifest" href="/favicons/site.webmanifest" />
	    </Head>
  		<Header />
  		<Component {...pageProps} />
  	</>
  );
}

export default MyApp

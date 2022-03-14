import Head from "next/head";
import { PostCard, PostWidget, Categories, CarouselFeaturedPosts } from "../components";
import { getPosts } from "../services";

export default function Home({posts}) {
  return (
    <>
      <Head>
        <title>Blog - Programming</title>
        <meta name="description" content="Programming Blog | Find fascinating blogs about programming" />
        <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
        <link rel="manifest" href="favicons/site.webmanifest" />
      </Head>
      <CarouselFeaturedPosts />
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {posts.map(({node}) => <PostCard key={node.id} post={node} />)}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const posts = (await getPosts()) || [];
 
  return {
    props: {
      posts,
    }
  }
}
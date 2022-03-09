import Head from "next/head";
import { PostCard, RelatedPosts, Categories } from "../components";

const posts = [
  {slug: "first",title: "1 Title", excerpt: "1 Excerpt"},
  {slug: "second" ,title: "2 Title", excerpt: "2 Excerpt"}
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Blog - Programming</title>
        <meta name="description" content="Programming Blog Website" />
      </Head>
      <div className="container mx-auto px-10 mb-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {posts.map(post => (
              <div>
                <PostCard key={post.slug} post={post} />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <RelatedPosts />
            <Categories />
          </div>
        </div>
      </div>
    </>
  )
}

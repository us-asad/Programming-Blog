import { PostCard, PostWidget, Categories, CarouselFeaturedPosts } from "../components";
import { getPosts } from "../services";

export default function Home({posts}) {
  return (
    <>
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
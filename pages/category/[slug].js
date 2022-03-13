import { getCategoryPost } from "services";
import { PostWidget, PostCard, Categories } from "components";

export default function CategoryPosts({ posts }) {
	if (!posts.length) return <div className="w-full h-full text-3xl flex justify-center items-center text-white">Could not find any posts in this category &#128557;</div>

	return (
		<div className="container px-10 mx-auto mb-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
			<div className="lg:col-span-4 col-span-1">
        <div className="lg:sticky relative top-8">
          <PostWidget />
          <Categories />
        </div>
      </div>
			<div className="col-span-1 lg:col-span-8">
				{posts.map(({node}) => <PostCard key={node.id} post={node} />)}
			</div>
		</div>
	);
}

export async function getServerSideProps({ params }) {
	const data = await getCategoryPost(params.slug);

	return {
		props: {
			posts: data
		}
	}
}
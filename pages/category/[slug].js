import Head from "next/head";
import { getCategoryPost } from "services";
import { PostWidget, PostCard, Categories } from "components";

export default function CategoryPosts({ posts }) {
	const categoryTitle = posts[0]?.node?.categories[0]?.name;

	return (
		<>
			<Head>
	    	<title>{categoryTitle} | Programming - Blog</title>
	    </Head>
			<div className="container px-10 mx-auto mb-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="col-span-1 lg:col-span-8">
					{posts.map(({node}) => <PostCard key={node.id} post={node} />)}
				</div>
				<div className="lg:col-span-4 col-span-1">
	        <div className="lg:sticky relative top-8">
	          <PostWidget />
	          <Categories />
	        </div>
	      </div>
			</div>
		</>
	);
}

export async function getServerSideProps({ params }) {
	const data = await getCategoryPost(params.slug);
	
	if (!data.length) return {
		notFound: true
	}

	return {
		props: {
			posts: data
		}
	}
}
import Head from "next/head";
import { PostWidget, Categories, PostDetail, Author, CommentsForm, Comments, AdjacentPosts } from "components";
import { getPostDetails } from "services";

export default function PostDetails({ postDetails }) {
	const { slug, title, createdAt, categories, author } = postDetails;
	const categoriesSlug = categories.map(category => category.slug); 

	return (
		<>
			<Head>
	    	<title>{title} | Programming - Blog</title>
	    </Head>
			<div className="container px-10 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="col-span-1 lg:col-span-8">
					<PostDetail postDetails={postDetails} />
					<Author author={author} />
					<AdjacentPosts createdAt={createdAt} slug={slug} />
					<CommentsForm slug={slug} />
					<Comments slug={slug} />
				</div>
				<div className="col-span-1 lg:col-span-4">
					<div className="static lg:sticky top-8">
						<PostWidget slug={slug} categories={categoriesSlug} />
						<Categories />
					</div>
				</div>
			</div>
		</>
	);
}

export const getServerSideProps = async (context) => {
	const { params: { slug } } = context;

	const data = await getPostDetails(slug);

	if (!data) return {
		notFound: true
	}

	return {
		props: {
			postDetails: data
		}
	}
}

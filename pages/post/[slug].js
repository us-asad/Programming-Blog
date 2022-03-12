import { PostWidget, Categories, PostDetail, Author, CommentsForm, Comments } from "components";
import { getPostDetails } from "services";

export default function PostDetails({ postDetails }) {
	const { slug, categories, author } = postDetails;
	const categoriesSlug = categories.map(category => category.slug); 

	return (
		<div className="container px-10 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
			<div className="col-span-1 lg:col-span-4 static lg:sticky top-8">
				<PostWidget slug={slug} categories={categoriesSlug} />
				<Categories />
			</div>
			<div className="col-span-1 lg:col-span-8">
				<PostDetail postDetails={postDetails} />
				<Author author={author} />
				<CommentsForm slug={slug} />
				<Comments slug={slug} />
			</div>
		</div>
	);
}

export const getServerSideProps = async (context) => {
	const { params: { slug } } = context;

	const data = await getPostDetails(slug);

	return {
		props: {
			postDetails: data
		}
	}
}

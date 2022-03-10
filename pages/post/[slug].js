import { PostWidget, Categories, PostDetail, Author, CommentsForm, Comments } from "../../components";
import { getPostDetails } from "../../services";

export default function PostDetails({ postDetails }) {
	return (
		<div className="container px-10 mx-auto flex flex-col flex-row">
			<div className="col-span-1 lg:col-span-4 static lg:sticky top-8">
				<PostWidget  />
				<Categories />
			</div>
			<div className="col-span-1 lg:col-span-8">
				<PostDetail />
				<Author />
				<CommentsForm />
				<Comments />
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

import { useRouter } from "next/router";
import { PostWidget, Categories } from "components";

export default function CategoryPosts() {
	const router = useRouter();
	const { slug } = router.query;

	return (
		<div className="container px-10 mx-auto mb-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
			<div className="col-span-1 lg:col-span-4">
				<PostWidget  />
				<Categories />
			</div>
			<div className="col-span-1 lg:col-span-8">
				{slug}
			</div>
		</div>
	);
}
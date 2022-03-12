import { useRouter } from "next/router";
import Image from "next/image";
import moment from "moment";

export default function CarouselFeaturedPostCard({ post }) {
	const router = useRouter();
	const { title, slug, createdAt, featuredImage: { url: postImageUrl }, author: { name, photo: { url: authorPhotoUrl } } } = post

	return (
		<div onClick={() => router.push(`/post/${slug}`)} className="relative h-72 cursor-pointer">
			<div className="absolute rounded-lg bg-center bg-cover shadow-lg inline-block w-full h-72" style={{backgroundImage: `url(${postImageUrl})`}} />
			<div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
			<div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
				<p className="text-white mb-4 text-shadow font-semibold text-xs">{moment(createdAt).format("MMMM DD, YYYY")}</p>
				<p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">{title}</p>
				<div className="flex items-center absolute bottom-5 w-full justify-center">
					<Image
						src={authorPhotoUrl}
						alt="post img"
						width={30}
						height={30}
						className="drop-shadow-lg rounded-lg"
					/>
					<p className="inline text-white text-shadow ml-2 font-medium">{name}</p>
				</div>
			</div>
		</div>
	);
}
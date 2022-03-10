import moment from "moment";
import Link from "next/link";
import Image from "next/image";

export default function PostCard(props) {
	const { title, featuredImage: { url: postImageUrl }, slug, author: { photo: { url: authorPhotoUrl }, name: authorName }, excerpt, createdAt } = props;

	return (
		<div className="bg-white shadow-lg rounded-lg p-0 pt-8 lg:p-8 pb-12 mb-8">
			<h2 className="transition duration-300 text-center mb-8 cursor-pointer hover:text-indigo-700 text-3xl font-semibold">
				<Link href={`/post/${slug}`}>
					{title}
				</Link>
			</h2>
			<div className="flex items-center justify-center mb-8 w-full">
				<div className="flex items-center justify-center mr-8">
					<Image
						src={authorPhotoUrl}
						alt="author pic"
						width="30px"
						height="30px"
						className="rounded-full"
					/>
					<p className="inline align-middle text-gray-700 ml-2 text-lg">{authorName}</p>
				</div>
				<div className="font-medium text-gray-700">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{moment(createdAt).format("MMM DD, YYYY")}</span>
				</div>
			</div>
			<div className="relative overflow-hidden shadow-md pb-80 mb-6">
				<Image
					src={postImageUrl}
					alt="post img"
					layout='fill'
					className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
				/>
			</div>
			<p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
				{excerpt}
			</p>
			<div className="text-center">
				<Link href={`/post/${slug}`}>
					<span className="transition duration-500 transfrom hover:-translate-y-1 inline-block bg-indigo-800 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
						Continue Reading
					</span>
				</Link>
			</div>
		</div>
	)
}
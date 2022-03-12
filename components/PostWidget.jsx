import { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { getRecentPosts, getRelatedPosts } from "services";

export default function PostWidget({ categories, slug }) {
	const [widgetPosts, setWidgetPosts] = useState([]);

	useEffect(() =>{
		if (slug) {
			getRelatedPosts(categories, slug)
				.then(res => setWidgetPosts(res))
				.catch(err => console.error("Get Related Posts Error! ",err));
		} else {
			getRecentPosts()
				.then(res => setWidgetPosts(res))
				.catch(err => console.error("Get Recent Posts Error! ",err));
		}
	},[slug]);

	if (!widgetPosts.length) return <></>;

	return (
		<div className="bg-white rounded-lg shadow-lg p-8 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">
				{slug ? "Related" : "Recent"}	Posts
			</h3>
			{widgetPosts.map(({title, featuredImage: { url }, slug, createdAt}) => (
				<div key={title} className="flex items-center w-full mb-4">
					<div className="w-16">
						<Image
							src={url}
							alt={slug ? "related img" : "recent img"}
							width="60px"
							height="60px"
							className="rounded-full object-cover"
						/>
					</div>
					<div className="flex-grow ml-4 border-b">
						<p className="text-gray-500 font-xs">
							{moment(createdAt).format("MMM DD, YYYY")}
						</p>
						<Link href={`/post/${slug}`}>
							<a  className="text-indigo-800 hover:text-indigo-400">{title}</a>
						</Link>
					</div>
				</div>
			))}
		</div>
	)
}
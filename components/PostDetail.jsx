import { Fragment } from "react";
import moment from "moment";
import Image from "next/image";

export default function PostDetail({ postDetails }) {
	const { title, content, createdAt, author: { photo: { url: authorPhotoUrl }, name: authorName }, featuredImage: { url } } = postDetails;

	const getContentFragment = (index, text, obj, type) => {
		let modifiedText = text;

		if (obj) {
			if (obj.bold) {
				modifiedText = <b key={index}>{text}</b>;
			}
			if (obj.italic) {
				modifiedText = <i key={index}>{text}</i>;
			}
			if (obj.underline) {
				modifiedText = <u key={index}>{text}</u>;
			}
		}

		switch(type) {
			case "heading-three":
				return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item,i) => <Fragment key={index}>{item}</Fragment>)}</h3>;
			case "paragraph":				
				return <p key={index} className="mb-8">{modifiedText.map((item,i) => <Fragment key={index}>{item}</Fragment>)}</p>;
			case "image": 
				return (
					<Image
						src={obj.src}
						alt={obj.title}
						key={index}
						width={obj.width}
						height={obj.height}
					/>
				);
			default: 
				return modifiedText;
		}
	}

	return (
		<div className="bg-white rounded-lg shadow-lg lg:p-8 pb-12 mb-12">
				<div className="relative overflow-hidden shadow-md mb-6">
					<img
						src={url}
						alt="post img"
						className="object-top w-full h-full rounded-t-lg"
					/>
				</div>
				<div className="px-4 lg:px-0">
					<div className="flex items-center mb-8 w-full">
						<div className="flex items-center lg:justify-start justify-center w-full">
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
					</div>
					<h2 className="mb-8 text-3xl font-semibold">{title}</h2>
					{content.raw.children.map((typeObj, index) => {
						const children = typeObj.children.map((item,itemIndex) => getContentFragment(itemIndex, item.text, item));

						return getContentFragment(index, children, typeObj, typeObj.type)
					})}
				</div>
		</div>
	);
}
import { useState, useEffect } from "react";
import moment from "moment";
import { getComments } from "services";
import parse from "html-react-parser";

export default function Comments({ slug }) {
	const [comments,setComments] = useState([]);

	useEffect(() => {
		const data = getComments(slug)
			.then(res => setComments(res.reverse()))
			.catch(err => console.error("Fetch Comments Error! ",err));
	},[slug]);

	if (!comments.length) return <></>;

	return (
		<div className="bg-white rounded-lg shadow-lg p-8 pb-12 mb-8">
			<h3 className="text-xl font-semibold border-b pb-4 mb-8">{comments.length} Comments</h3>
			{comments.map(({name, date, comment},index) => (
				<div key={index} className="border-b border-gray-100 pb-4 mb-4">
					<p className="mb-4"><b>{name}</b> on {moment(date).format("MMM DD, YYYY")}</p>
					<p className="text-gray-600 w-full whitespace-pre-line">{parse(comment)}</p>
				</div>
			))}
		</div>
	);
}
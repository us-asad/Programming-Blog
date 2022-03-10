import { useState, useEffect } from "react";
import { getCategories } from "../services";
import Link from "next/link";

export default function Categories() {
	const [categories,setCategories] = useState([]);

	useEffect(() => {
			getCategories()
				.then(res => setCategories(res))
				.catch(err => console.error("Get Categories Error! ",err));
	}, []);

	return (
		<div className="bg-white rounded-lg shadow-lg p-8 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
			<div>
				{categories.map(({ name, slug }) => (
					<Link key={slug} href={`/category/${slug}`}>
						<a className="cursor-pointer block pb-3 mb-3 text-indigo-800 hover:text-indigo-400">{name}</a>
					</Link>
				))}
			</div>
		</div>
	)
}
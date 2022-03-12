import { useState, useEffect } from "react";
import { getCategories } from "services";
import Link from "next/link";

export default function Categories() {
	const [categories,setCategories] = useState([]);

	useEffect(() => {
		getCategories()
			.then(res => setCategories(res))
			.catch(err => console.error("Get Categories Error! ",err));
	},[]);

	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="border-b w-full flex justify-between border-blue-500 py-8">
				<Link href="/">
					<span className="cursor-pointer font-bold text-4xl text-white">
						Blog CMS
					</span>
				</Link>
				<div className="hidden md:flex space-3">
					{categories.map(({slug,name}) => (
						<Link key={slug} href={`/category/${slug}`}>
							<a className="mt-2 text-white hover:text-gray-200 transition duration-50 ml-4 font-semibold cursor-pointer">
								{name}
							</a>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
import { useState, useEffect } from "react";
import { getCategories } from "services";
import Image from "next/image";
import Link from "next/link";

const arrowClassNames = "w-full h-1 rounded-full bg-white transition duration-50";

export default function Categories() {
	const [categories, setCategories] = useState([]);
	const [navbarShow, setNavbarShow] = useState(false);

	useEffect(() => {
		getCategories()
			.then(res => setCategories(res))
			.catch(err => console.error("Get Categories Error! ",err));
	},[]);

	if (navbarShow && typeof window !== "undefined") {
		window.document.body.style = "overflow: hidden";
	} else if (typeof window !== "undefined") {
		window.document.body.style = "overflow: auto";
	}

	return (
		<div className="container mx-auto px-10 mb-8">
			{navbarShow && <div onClick={() => setNavbarShow(prevState => !prevState)} className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-40"></div>}
			<div className="border-b w-full flex justify-between items-center border-blue-500 pt-8 pb-4">
				<Link href="/">
					<a className="cursor-pointer font-bold text-4xl text-white">
						<Image
							src="/logo.png"
							alt="Programming Blog"
							width={80}
							height={80}
							className="rounded-full"
						/>
					</a>
				</Link>
				<div onClick={() => setNavbarShow(prevState => !prevState)} className="md:hidden flex flex-col space-y-1 w-7 cursor-pointer z-50">
					<span className={`${arrowClassNames} ${navbarShow && "rotate-45"}`}></span>
					<span className={`${arrowClassNames} ${navbarShow && "-rotate-45 -translate-y-2"}`}></span>
					<span className={`${arrowClassNames} ${navbarShow && "hidden"}`}></span>
				</div>
				<div className="hidden md:flex space-3 items-center">
					{categories.map(({slug, name}) => (
						<Link key={slug} href={`/category/${slug}`}>
							<a className="mt-2 text-white hover:text-gray-200 transition duration-50 ml-4 font-semibold cursor-pointer">
								{name}
							</a>
						</Link>
					))}
				</div>
			</div>
			<div className={`md:hidden bg-blue-800 space-y-3 flex flex-col items-center justify-center absolute top-0 z-50 h-screen px-10 transition customTransition duration-500 ${navbarShow ? "left-0" : "-left-60"}`}>
				<p className="absolute top-5 w-full text-center left-0 text-white border-b pb-4 border-gray-600">Categories</p>
				{categories.map(({slug, name}) => (
					<Link key={slug} href={`/category/${slug}`}>
						<a onClick={() => setNavbarShow(prevState => !prevState)} className="mt-2 text-white hover:text-gray-200 transition duration-50 ml-4 font-semibold cursor-pointer">
							{name}
						</a>
					</Link>
				))}
			</div>
		</div>
	);
}
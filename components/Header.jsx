import Link from "next/link";

const categories = [
	{name: "1 category", slug: "firstSlug"},
	{name: "2 category", slug: "secondSlug"}
];

export default function Categories() {
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
							<span className="mt-2 text-white ml-4 font-semibold cursor-pointer">
								{name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
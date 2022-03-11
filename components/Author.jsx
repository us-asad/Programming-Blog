import Image from "next/image";

export default function Author({ author }) {
	const { name, photo: { url }, bio } = author;

	return (
		<div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
			<div className="absolute left-0 right-0 -top-14">
				<Image
					src={url}
					alt="author pic"
					className="rounded-full"
					width={100}
					height={100}
				/>
			</div>
			<h3 className="text-white my-4 text-xl font-bold">{name}</h3>
			<p className="text-white text-ls">{bio}</p>
		</div>
	);
}
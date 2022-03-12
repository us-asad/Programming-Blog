import { useState, useEffect } from "react";
import { getFeaturedPosts } from "services";
import { CarouselFeaturedPostCard } from ".";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

export default function CarouselFeaturedPosts() {
	const [featuredPosts, setFeaturedPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
			getFeaturedPosts()
				.then(res => {
					setFeaturedPosts(res);
					setLoading(false)
				})
				.catch(err => console.error("Fetch Featured Posts Error! ",err));
	},[]);

	const leftArrowIcon = (
    <div className="absolute arrow-btn left-0 text-center py-3 cursor-pointer bg-white rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 text-indigo w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </div>
  );

  const rightArrowIcon = (
    <div className="absolute arrow-btn right-0 text-center py-3 cursor-pointer bg-white rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 text-indigo w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  ); 

	return (
		<div className="mb-8 container mx-auto">
			<Carousel
				showDots
				autoPlay
				infinite
				autoPlaySpeed={5000}
				customRightArrow={rightArrowIcon}
				customLeftArrow={leftArrowIcon}
				responsive={responsive}
				itemClass="px-4"
			>
				{!loading && featuredPosts.map((post, index) => (
					<CarouselFeaturedPostCard key={index} post={post} />
				))}
			</Carousel>
		</div>
	);
}
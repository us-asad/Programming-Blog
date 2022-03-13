import { useState, useEffect } from 'react';
import AdjacentPostCard from './AdjacentPostCard.jsx';
import { getAdjacentPosts } from 'services';

export default function AdjacentPosts({ createdAt, slug }) {
  const [{ next, previous }, setAdjacentPosts] = useState({
  	next: null,
  	previous: null,
  });

  useEffect(() => {
    getAdjacentPosts(createdAt, slug)
    	.then(res => setAdjacentPosts(res))
    	.catch(err => console.error("Fetch Adjacent Posts Error! ",err));
  }, [slug]);

  if (!next && !previous) <></>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 mb-8">
        {previous && <AdjacentPostCard post={previous} position="LEFT" />}
        {next && <AdjacentPostCard post={next} position="RIGHT" />}
    </div>
  );
};


import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_API;

export const getPosts = async () => {
	const query = gql`
		query MyQuery {
		  postsConnection {
		    edges {
		      node {
		        author {
		          bio
		          name
		          createdAt
		          id
		          photo {
		            url
		          }
		        }
		        createdAt
		        excerpt
		        id
		        slug
		        title
		        featuredPost
		        featuredImage {
		          url
		        }
		        categories {
		          name
		          slug
		        }
		      }
		    }
		  }
		}
	`;

	const result = await request(graphqlAPI,query);

	return result.postsConnection.edges;
}

export const getRecentPosts = async () => {
	const query = gql`
		query GetPostDetails() {
			posts(
				orderBy: createdAt_ASC
				last: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt,
				slug
			}
		}
	`;

	const result = await request(graphqlAPI,query);

	return result.posts;
}

export const getRelatedPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};

export const getCategories = async () => {
	const query = `
		query getCategories {
			categories {
				name
				slug
			}
		}
	`;

	const result = await request(graphqlAPI, query);

	return result.categories;
}

export const getPostDetails = async slug => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const submitComment = async obj => {
	try {
		const result = await fetch('/api/comments', {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(obj),
	  });

  	return result.json();
	} catch (err) {
  		console.error("Submit Comment Error at Services! ",err);
  		return err;
	}
};

export const getComments = async slug => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: {post: {slug: $slug}}){
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};

export const getCategoryPost = async slug => {
	const query = gql`
		query GetCategoryPost($slug: String!) {
			postsConnection(where: {categories_some: {slug: $slug}}) {
					edges {
		      node {
		        author {
		          bio
		          name
		          createdAt
		          id
		          photo {
		            url
		          }
		        }
		        createdAt
		        excerpt
		        id
		        slug
		        title
		        featuredPost
		        featuredImage {
		          url
		        }
		        categories {
		          name
		          slug
		        }
		      }
		    }
			}
		}
	`;

	const result = await request(graphqlAPI, query, { slug });

	return result.postsConnection.edges;
}

export const getFeaturedPosts = async () => {
	const query = gql`
		query GetCategoryPost() {
			posts(where: {featuredPost: true}) {
				author {
					name
					photo {
						url
					}
				}
				featuredImage {
					url
				}
				title
				slug
				createdAt
			}
		}
	`;

	const result = await request(graphqlAPI, query);

	return result.posts;
}
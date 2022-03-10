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
export const getRelatedPosts = async () => {
	const query = gql`
		query GetPostDetails($slug: String!, $categories: [String!]) {
			posts(
				where: (slug_not: $slug, AND {categories_name: {slug_in: $categories}})
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
	`

	const result = await request(graphqlAPI, query);

	return result.posts;
}
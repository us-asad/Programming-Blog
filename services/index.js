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
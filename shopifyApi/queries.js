import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
 
 query GetProducts {
    products(first: 50) {
      edges {
        node {
          id
          title
          description
          images(first: 1) {
            edges {
              node {
                src
                altText
              }
            }
          }
        }
      }
    }
  }
`;




const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($id: ID!) {
    product(id: $id) {
      title
      description
      images(first: 5) {
        edges {
          node {
            src
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            price {
              amount
            }
          }
        }
      }
    }
  }
`;



import { gql } from "@apollo/client";

export const BOOKS = gql`
  query {
    books {
      id
      title
      authorName
      slug
      printType
      price
      Images {
        url
        secureUrl
        type
      }
    }
  }
`
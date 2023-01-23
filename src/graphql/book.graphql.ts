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

export const ADDBOOK = gql`
  mutation($data: addBookInput!){
   addBook(data: $data){
     createdAt
     id
     title
   }
 }`

 export const DELETEBOOK = gql`
 mutation($bookId: ID!){ 
   deleteBook(bookId: $bookId){
     createdAt
     id
     title
   }
 }`
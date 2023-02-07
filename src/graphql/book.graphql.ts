import { gql } from "@apollo/client";

export const PUBLIC_BOOK_LIST = gql`
  query ($options: queryBookOptionsInput) {
    books(options: $options) {
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
`;

export const PUBLIC_BOOK_DETAIL = gql`
  query($slug: ID!) {
    book(slug: $slug) {
      title
      authorName
      numberOfPages
      isbn
      publisher
      description
      price
      publicationYear
      Categories {
        name
      }
      stock
      printType
      Images {
        secureUrl
        type
      }
    }
  }
`;

export const PORTAL_INIT_BOOK_UPDATE = gql`
  query($bookId: ID) {
    book(bookId: $bookId) {
      title
      authorName
      numberOfPages
      isbn
      publisher
      Categories{
        id
        name
      }
      description
      price
      stock
      printType
      publicationYear
      Images {
        secureUrl
        type
        publicId
        id
      }
    }
  }
`;

export const PORTAL_BOOK_LIST = gql`
  query {
    books {
      id
      title
      authorName
      createdAt
    }
  }
`;

export const ADDBOOK = gql`
  mutation ($data: addBookInput!) {
    addBook(data: $data) {
      createdAt
      id
      title
    }
  }
`;

export const DELETEBOOK = gql`
  mutation ($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      createdAt
      id
      title
    }
  }
`;

export const UPDATEBOOK = gql`
 mutation($data: updateBookInput!){
   updateBook(data: $data){
     createdAt
     id
     title
   }
 }`
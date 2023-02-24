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
        id
        url 
        type 
        createdAt
        updatedAt
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
        id
        url 
        type 
        createdAt
        updatedAt
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
        id
        url 
        type 
        createdAt
        updatedAt
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

export const ADD_BOOK = gql`
  mutation ($data: addBookInput!, $cover: String!) {
    addBook(data: $data, cover: $cover) {
      createdAt
      id
      title
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation ($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      createdAt
      id
      title
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation($data: updateBookInput!, $cover: String){
    updateBook(data: $data, cover: $cover){
      createdAt
      id
      title
    }
  }
`
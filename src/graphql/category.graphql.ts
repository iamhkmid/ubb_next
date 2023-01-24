import { gql } from "@apollo/client";


export const BOOKCATEGORIES = gql`
  query{
    bookCategories{
      id
      name
    }
}`

export const PUBLIC_BOOK_CATEGORIES = gql`
  query {
    bookCategories {
      id
      name
    }
}`

export const ADDBOOKCATEGORY = gql`
mutation($data: addBookCategoryInput!){
  addBookCategory(data: $data){
    updatedAt,
    createdAt
  }
}`

export const DELETEBOOKCATEGORY = gql`
mutation($categoryId: ID!){ 
 deleteBookCategory(categoryId: $categoryId){
   id
   name
   }
 }
`

export const UPDATEBOOKCATEGORY = gql`
mutation($data: updateBookCategoryInput!){
   updateBookCategory(data: $data){
    updatedAt,
    createdAt
  }
}`

export const PORTAL_INIT_CATEGORY_UPDATE = gql`
  query($categoryId: ID!) {
    bookCategory(categoryId: $categoryId) {
      name
    }
  }
`;
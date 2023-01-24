import { gql } from "@apollo/client";


export const BOOKCATEGORIES = gql`
query{
  bookcategories{
    id
    nameId
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
   nameId
   }
 }

`
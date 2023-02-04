import { gql } from "@apollo/client";


export const CONTACT = gql`
  query{
    contact{
      id
      whatsApp
      twitter
      facebook
      email
      instagram
    }
}`


export const UPDATECONTACT = gql`
mutation($data: updateContactInput!){
   updateContact(data: $data){
    updatedAt,
    createdAt
  }
}`

export const PORTAL_INIT_CONTACT_UPDATE = gql`
  query($categoryId: ID!) {
    contact(categoryId: $categoryId) {
      id
      whatsApp
      twitter
      facebook
      email
      instagram
    }
  }
`;
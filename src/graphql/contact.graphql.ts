import { gql } from "@apollo/client";


export const CONTACTS = gql`
  query{
  contacts{
    id
    name
    image
    url
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
  query($contactId: ID!) {
    contact(contactId: $contactId) {
      id
      name
      image
      url
    }
  }
`;
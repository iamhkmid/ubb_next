import { gql } from "@apollo/client";

export const ANNOUNCEMENT = gql`
  query{
  banners{
    createdAt
    id
    image
    publicId
    title
    updatedAt
  }
}
`;

export const ADDANNOUNCEMENT = gql`
mutation($data: addBannerInput!){
  addBanner(data: $data){
    createdAt
    id
    title
  }
}`

export const PORTAL_ANNOUNCEMENT_LIST = gql`
  query{
  banners{
    createdAt
    id
    image
    publicId
    title
    updatedAt
  }
}
`;
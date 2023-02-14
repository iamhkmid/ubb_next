import { gql } from "@apollo/client";

export const FOOTER_INFO = gql`
  query{
    footerInfo{
      id
      label
      image
      value
      Group {
        id
        name
      }
  }
}`


export const UPDATE_FOOTER_INFO = gql`
mutation($data: updateFooterInfoInput!){
  updateFooterInfo(data: $data){
    updatedAt,
    createdAt
  }
}`

export const PORTAL_INIT_FOOTER_UPDATE = gql`
  query($footerInfoId: ID!) {
    footerInfo(footerInfoId: $footerInfoId) {
      id
      label
      image 
      value
      Group {
        id
        name
      }
    }
  }
`;
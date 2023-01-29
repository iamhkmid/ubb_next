import { gql } from "@apollo/client";

export const PORTAL_ANNOUNCEMENT_LIST = gql`
  query {
    announcements {
      id
      secureUrl
    }
  }
`;

export const ADDANNOUNCEMENT = gql`
mutation($data: addAnnouncement!){
  addAnnouncement(data: $data){
    updatedAt,
    createdAt
  }
}`
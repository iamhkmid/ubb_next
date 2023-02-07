import { gql } from "@apollo/client";

export const ANNOUNCEMENT = gql`
  query{
    banners{
      createdAt
      id
      image
      publicId
      updatedAt
    }
  }
`;

export const ADDANNOUNCEMENT = gql`
  mutation($data: addBannerInput!){
    addBanner(data: $data){
      createdAt
      id
    }
  }
`

export const PORTAL_ANNOUNCEMENT_LIST = gql`
  query{
    banners{
      createdAt
      id
      image
      publicId
      updatedAt
    }
  }
`;

export const PUBLIC_ANNOUNCEMENT = gql`
  query{
    banners{
      id
      image
    }
  }
`;
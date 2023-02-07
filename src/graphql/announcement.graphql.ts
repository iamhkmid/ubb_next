import { gql } from "@apollo/client";

export const BANNNERS = gql`
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

export const ADDBANNER = gql`
  mutation($data: String!){
    addBanner(imageBase64: $data){
      createdAt
      id
    }
  }
`

export const PORTAL_BANNERS_LIST = gql`
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

export const DELETEBANNER = gql`
  mutation($data: ID!){
    deleteBanner(bannerId: $data){
      createdAt
      id
    }
  }
`

export const PUBLIC_ANNOUNCEMENT = gql`
  query{
    banners{
      id
      image
    }
  }
`;
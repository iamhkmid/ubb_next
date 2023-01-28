import { gql } from "@apollo/client";

export const PORTAL_ANNOUNCEMENT_LIST = gql`
  query {
    announcements {
      id
      secureUrl
    }
  }
`;

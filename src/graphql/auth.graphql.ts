import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password){
      message
      user {
        fullName
        username
        role
      } 
    }
  }
`
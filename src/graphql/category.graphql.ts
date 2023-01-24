import { gql } from "@apollo/client";


export const BOOKCATEGORIES = gql`
query{
  bookcategories{
    nameId
  }
}`
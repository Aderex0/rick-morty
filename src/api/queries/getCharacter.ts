import { gql } from "@apollo/client";

const GET_CHARACTER = gql`
  query character($id: ID!) {
    character(id: $id) {
      name
      status
      species
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        episode
      }
    }
  }
`;

export default GET_CHARACTER;

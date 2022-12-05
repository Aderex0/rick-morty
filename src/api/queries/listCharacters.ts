import { gql } from "@apollo/client";

const LIST_CHARACTERS = gql`
  query characters($page: Int!) {
    characters(page: $page) {
      info {
        pages
        count
      }
      results {
        id
        name
        image
      }
    }
  }
`;

export default LIST_CHARACTERS;

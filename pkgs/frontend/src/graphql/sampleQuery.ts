import {gql} from "urql";

// subgraph query
const sampleQuery = gql`
  query MyQuery {
    Transfer {
      from_id
      to_id
      tokenId
      db_write_timestamp
    }
  }
`;

export default sampleQuery;

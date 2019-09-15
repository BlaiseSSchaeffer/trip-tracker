import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
  enum STATE {
    AL
    AK
    AS
    AZ
    AR
    CA
    CO
    CT
    DE
    DC
    FM
    FL
    GA
    GU
    HI
    ID
    IL
    IN
    IA
    KS
    KY
    LA
    ME
    MH
    MD
    MA
    MI
    MN
    MS
    MO
    MT
    NE
    NV
    NH
    NJ
    NM
    NY
    NC
    ND
    MP
    OH
    OK
    OR
    PW
    PA
    PR
    RI
    SC
    SD
    TN
    TX
    UT
    VT
    VI
    VA
    WA
    WV
    WI
    WY
    AE
    AP
    AA
  }

  type Address {
    id: ID!
    buildingNumber: Int!
    streetName: String!
    city: String!
    state: STATE!
    zip: Int!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    address: Address
  }

  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: () => {
      return [
        {
          id: 1,
          firstName: "Blaise",
          lastName: "Schaeffer",
          address: {
            id: 1,
            buildingNumber: 1600,
            streetName: "Pennsylvania Ave NW",
            city: "Washington",
            state: "DC",
            zip: 20500
          }
        }
      ];
    }
  }
};

// const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

// server.applyMiddleware({ app });

const port = process.env.PORT || 4001;
app.listen({ port }, () => {
  // console.log(
  //   `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  // );
});

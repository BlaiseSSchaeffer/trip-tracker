import express from "express";
import config from "config";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import walk from "recursive-readdir";
import loadSchema from "./utils/loadSchema";
import userResolvers from "./user/resolvers";
import addressResolvers from "./address/resolvers";
import merge from "lodash.merge";

walk(config.get("walk_for_schema"), (error, files) => {
  if (error) throw error;

  const typeDefs = loadSchema(files);
  const resolvers = merge(userResolvers, addressResolvers);
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  const server = new ApolloServer({ schema });
  const app = express();

  server.applyMiddleware({ app });

  const port = process.env.PORT || config.get("port") || 4002;
  app.listen({ port }, () => {
    console.log(`🚀 Server ready on port ${port}`);
  });
});

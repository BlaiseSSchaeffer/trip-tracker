import express from "express";
import config from "config";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import recursiveReaddir from "recursive-readdir";
import loadSchema from "./utils/loadSchema";
import userResolvers from "./user/resolvers";
import addressResolvers from "./address/resolvers";
import merge from "lodash.merge";
import path from "path";
import fs from "fs";
import loadModels from "./utils/loadModels";
import SequelizeSettings from "./utils/sequelizeSettings";
import { Sequelize } from "sequelize";

const pathToWalk: string = config.get("walk_for_graphql_schema");
recursiveReaddir(
  pathToWalk,
  [path.join(pathToWalk, "index.ts")],
  (error, files) => {
    if (error) throw error;

    const sequelize = new Sequelize(SequelizeSettings.sequelizeOptions());
    const db = {
      Sequelize,
      sequelize
    };

    const models = loadModels(files, pathToWalk, "");
    models.forEach(model => {
      const imported = sequelize.import(model);
      // @ts-ignore
      db[imported.name] = imported;
    });

    Object.keys(db).forEach(modelName => {
      // @ts-ignore
      if (db[modelName].associate) {
        // @ts-ignore
        db[modelName].associate(db);
      }
    });

    const typeDefs = loadSchema(files);
    const resolvers = merge(userResolvers, addressResolvers);
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    });

    const server = new ApolloServer({ schema });
    const app = express();

    server.applyMiddleware({ app });

    const port = config.get("express_port") || 4002;
    app.listen({ port }, () => {
      console.log(`🚀 Server ready on port ${port}`);
    });
  }
);

// @flow

import "babel-polyfill";

import express from "express";
import graphqlHTTP from "express-graphql";
import { schema } from "./graphql";
import type { Context } from "./graphql";
import { User } from "./models";
import db from "./database";

import { batchGetUsers } from "./loaders";
import config from "./config";
import DataLoader from "dataloader";
//import setup from "./setup";

// db.user.create({
//   id: 1,
//   name: "Bob"
// });

const createContext = async (): Promise<Context> => {
  const userLoader = new DataLoader(ids => batchGetUsers(ids));

  const user = await User.genAuth("1", userLoader);
  if (!user) throw new Error("Could not find user");
  return {
    loaders: {
      user: userLoader
    },
    viewer: user
  };
};

const app = express();

const formatError = error => {
  if (config.environment === "development") {
    return {
      message: error.message,
      stack: error.stack.split("\n"),
      locations: error.locations,
      path: error.path
    };
  } else if (config.environment === "production") {
    return {
      message: error.message,
      locations: error.locations,
      path: error.path
    };
  }
};

/**
 * The GraphiQL endpoint
 */
app.use(
  `/graphiql`,
  graphqlHTTP(async req => ({
    schema,
    graphiql: true,
    context: await createContext(),
    formatError
  }))
);

/**
 * The single GraphQL Endpoint
 */
app.use(
  "/",
  graphqlHTTP(async req => ({
    schema,
    graphiql: false,
    context: await createContext(),
    formatError
  }))
);

db.sequelize.sync().then(() => {
  //setup();
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
});

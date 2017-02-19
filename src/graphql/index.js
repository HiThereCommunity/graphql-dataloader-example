// @flow

import { GraphQLSchema } from "graphql";

import query from "./query";
//import mutation from "./mutations";

export const schema = new GraphQLSchema({
  query,
});

export type { Context } from "./type";

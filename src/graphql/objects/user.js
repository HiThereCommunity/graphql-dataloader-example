// @flow

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from "graphql";
import { globalIdField } from "graphql-relay";

import { nodeInterface } from "./relayNode";
import { User } from "../../models";
import type { ID, Context } from "../type";

const GraphQLUser = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: globalIdField("User", (user: User): ID => user.id),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The name of the user",
      resolve: (user, _, { viewer }: Context): string =>
        user.name
    },
    bestFriend: {
      type: GraphQLUser,
      resolve: (user: User, _, context) =>
        User.gen(context.viewer, user.bestFriendId, context.loaders.user)
    },
    friends: {
      args: {
        first: { type: GraphQLInt }
      },
      type: new GraphQLList(GraphQLUser),
      resolve: (user, { first }, context: Context) =>
        user.genFriends(context.viewer, first, context.loaders.user)
    }
  }),
  // Relay will use this function to determine if an object in your system is
  // of a particular GraphQL type
  isTypeOf: function(obj) {
    return obj instanceof User;
  },
  interfaces: [nodeInterface]
});

export default GraphQLUser;

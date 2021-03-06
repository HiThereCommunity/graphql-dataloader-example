// @flow

import { nodeDefinitions, fromGlobalId } from "graphql-relay";
import { User } from "../../models";
import type {Context} from "../../graphql";

/**
 * We get the node interface and field from the relay library.
 *
 * The first method is the way we resolve an ID to its object. The second is the
 * way we resolve an object that implements node to its type.
 */
export const { nodeInterface, nodeField, nodesField } = nodeDefinitions((
  globalId,
  {viewer, loaders}: Context
) =>
  {
    const { type, id } = fromGlobalId(globalId);

    if (type === "User") {
      return User.gen(viewer, id, loaders.user);
    }
    return null;
  });

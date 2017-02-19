// @flow

import DataLoader from "dataloader";
import { isNumeric } from "../utils";
import db from "../database";

const checkCanSee = (viewer: User, data: Object): boolean => {
  return true; //Always possible
};

export default class User {
  static async gen(
    viewer: User,
    id: string,
    loader: DataLoader<string, ?Object>
  ): Promise<?User> {
    if (!isNumeric(id)) return null;
    const data = await loader.load(id);
    if (!data) return null;
    const canSee = checkCanSee(viewer, data);
    return canSee ? new User(data) : null;
  }

  static async genAuth(
    id: string,
    loader: DataLoader<string, ?Object>
  ): Promise<?User> {
    if (!isNumeric(id)) return null;
    const user = await loader.load(id);
    return user ? new User(user) : null;
  }

  id: string;
  name: string;
  bestFriendId: string;

  constructor(data: Object) {
    this.id = String(data.id);
    this.name = data.name;
    this.bestFriendId = String(data.best_friend_id);
  }

  async genFriends(
    viewer: User,
    first: number,
    loader: DataLoader<string, ?Object>
  ): Promise<Array<Promise<?User>>> {
    const data: Array<{to_id: number}> = await db.friend.findAll({
      where: {
        from_id: this.id
      },
      limit: first,
      attributes: ["to_id"]
    });

    return data.map(entry => User.gen(viewer, String(entry.to_id), loader));
  }
}

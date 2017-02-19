// @flow

import db from "./database";

export default async () => {

  const bob = await db.user.create({
    id: 1,
    name: "Bob"
  });

  const sam = await db.user.create({
    id: 2,
    name: "Sam"
  });

  const stephen = await db.user.create({
    id: 3,
    name: "Stephen"
  });

  const pete = await db.user.create({
    id: 4,
    name: "Pete"
  });

  const chris = await db.user.create({
    id: 5,
    name: "Chris"
  });

  const josh = await db.user.create({
    id: 6,
    name: "Josh"
  });

  bob.best_friend_id = sam.id;
  await bob.save();

  sam.best_friend_id = bob.id;
  await sam.save();

  stephen.best_friend_id = sam.id;
  await stephen.save();

  pete.best_friend_id = chris.id;
  await pete.save();

  chris.best_friend_id = pete.id;
  await chris.save();

  josh.best_friend_id = bob.id;
  await josh.save();

  [
    2,
    3,
    4,
    5,
    6
  ].forEach(async to_id => {
    await db.friend.create({
      from_id: 1,
      to_id
    })
  });

}

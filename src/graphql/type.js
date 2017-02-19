// @flow

import DataLoader from 'dataloader';
import {User} from '../models'

export type ID = string;

export type Context = {
  loaders: {
    user: DataLoader<string, ?Object>
  },
  viewer: User
}

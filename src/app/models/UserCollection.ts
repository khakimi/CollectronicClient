import {Item} from './Item';

export interface UserCollection {
  id?: number;
  title: string;
  description: string;
  image?: String;
  username?: string;
  items?: Item[];
}

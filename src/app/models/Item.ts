import {Comment} from './Comment';

export interface Item{
  id?: number;
  title: string;
  caption: string;
  image?: String;
  likes?: number;
  usersLiked?: string[];
  comments?: Comment[];
  username?: string;
}

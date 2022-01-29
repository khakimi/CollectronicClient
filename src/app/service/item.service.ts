import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserCollection} from '../models/UserCollection';
import {Observable} from 'rxjs';
import {Item} from '../models/Item';
import {environment} from '../../environments/environment';

const ITEM_API = environment.baseUrl+'api/item/';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  createItem(item: Item, collectionId: number): Observable<any> {
    return this.http.post(ITEM_API+ collectionId + '/create', item);
  }

  getAllItemsToCollection(collectionId: number): Observable<any> {
    return this.http.get(ITEM_API+ collectionId + '/items');
  }

  getAllItems(): Observable<any> {
    return this.http.get(ITEM_API + 'all');
  }


  likeItem(id: number, username: string): Observable<any> {
    return this.http.post(ITEM_API + id + '/' + username + '/like', null);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.post(ITEM_API + id + '/delete', null);
  }
}

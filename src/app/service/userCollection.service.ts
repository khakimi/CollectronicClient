import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserCollection} from '../models/UserCollection';
import {environment} from '../../environments/environment';

const COLLECTION_API = environment.baseUrl+'api/collection/';

@Injectable({
  providedIn: 'root'
})
export class UserCollectionService {

  constructor(private http: HttpClient) {
  }

  createCollection(collection: UserCollection): Observable<any> {
    return this.http.post(COLLECTION_API + 'create', collection);
  }

  getAllCollections(): Observable<any> {
    return this.http.get(COLLECTION_API + 'all');
  }

  getCollectionsForCurrentUser(): Observable<any> {
    return this.http.get(COLLECTION_API + 'user/collections');
  }

  getCollectionById(id: number): Observable<any> {
    return this.http.get(COLLECTION_API + id);
  }

  deleteCollection(id: number): Observable<any> {
    return this.http.post(COLLECTION_API + id + '/delete', null);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const IMAGE_API = 'http://localhost:8080/api/image/';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  uploadImageToUser(file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);

    return this.http.post(IMAGE_API + 'upload', uploadData);
  }

  uploadImageToItem(file: File, collectionId: number,itemId: number): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);

    return this.http.post(IMAGE_API + collectionId +'/' + itemId + '/upload', uploadData);
  }

  uploadImageToCollection(file: File, collectionId: number): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);

    return this.http.post(IMAGE_API + collectionId + '/upload', uploadData);
  }

  getProfileImage(): Observable<any> {
    return this.http.get(IMAGE_API + 'profile/image');
  }

  getImageToItem(itemId: number): any {
    return this.http.get(IMAGE_API + itemId + '/item');
  }


  getImageToCollection(collectionId: number): any {
    return this.http.get(IMAGE_API + collectionId + '/collection');
  }

}

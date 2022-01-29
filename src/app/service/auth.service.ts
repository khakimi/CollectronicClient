import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const AUTH_API = environment.baseUrl+'api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(user): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: user.username,
      password: user.password
    });
  }

  public register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      email: user.email,
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      password: user.password,
      confirmPassword: user.confirmPassword
    });
  }
}

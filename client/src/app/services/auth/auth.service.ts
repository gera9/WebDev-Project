import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(username: any, password: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  public signup(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  public setActiveGlobalUser(active: boolean): Observable<any> {
    return this.http.post(
      AUTH_API + 'active-global-user',
      {
        active,
      },
      httpOptions
    );
  }

  public getActiveGlobalUser(): Observable<any> {
    return this.http.get(AUTH_API + 'get-active-global-user', httpOptions);
  }
  public logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', {}, httpOptions);
  }
}

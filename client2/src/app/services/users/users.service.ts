import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  public getUsersByDepartment(department: string): Observable<any> {
    return this._http.get(`${AUTH_API}?department=${department}`, httpOptions);
  }

  public getUsersByDepartmentAndVark(
    department: string,
    varkResult: string
  ): Observable<any> {
    return this._http.get(
      `${AUTH_API}?department=${department}&varkResult=${varkResult}`,
      httpOptions
    );
  }

  public getUsersByDepartmentAndPersonality(
    department: string,
    personalityResult: string
  ): Observable<any> {
    return this._http.get(
      `${AUTH_API}?department=${department}&personalityResult=${personalityResult}`,
      httpOptions
    );
  }

  public getUsersByVark(varkResult: string): Observable<any> {
    return this._http.get(`${AUTH_API}?varkResult=${varkResult}`, httpOptions);
  }

  public getUserByPersonality(personalityResult: string): Observable<any> {
    return this._http.get(
      `${AUTH_API}?personalityResult=${personalityResult}`,
      httpOptions
    );
  }

  public getUsersByQueries(queries: string): Observable<any> {
    return this._http.get(`${AUTH_API}${queries}`, httpOptions);
  }

  public getUsers(): Observable<any> {
    return this._http.get(AUTH_API, httpOptions);
  }

  public getUserById(id: string): Observable<any> {
    return this._http.get(`${AUTH_API}/${id}`, httpOptions);
  }

  public createUser(user: any): Observable<any> {
    return this._http.post(AUTH_API, user, httpOptions);
  }

  public updateUser(id: string, user: any): Observable<any> {
    console.log(user);
    return this._http.put(`${AUTH_API}/${id}`, user, httpOptions);
  }

  public deleteUser(id: string): Observable<any> {
    return this._http.delete(`${AUTH_API}/${id}`, httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private _http: HttpClient) {}

  public getConfig(): Observable<any> {
    return this._http.get(`${AUTH_API}`, httpOptions);
  }

  public updateConfig(config: any): Observable<any> {
    return this._http.put(
      AUTH_API + '/63859f2852b2344526e96191',
      config,
      httpOptions
    );
  }
}

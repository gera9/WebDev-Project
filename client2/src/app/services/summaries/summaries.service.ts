import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/summary';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class SummariesService {
  constructor(private _http: HttpClient) {}

  public getGlobalVarkSummary(): Observable<any> {
    return this._http.get(`${AUTH_API}/vark/global`, httpOptions);
  }

  public getDepartmentVarkSummary(department: string): Observable<any> {
    return this._http.get(
      `${AUTH_API}/vark/department?department=${department}`,
      httpOptions
    );
  }

  public getGlobalPersonalitySummary(): Observable<any> {
    return this._http.get(`${AUTH_API}/personality/global`, httpOptions);
  }

  public getDepartmentPersonalitySummary(department: string): Observable<any> {
    return this._http.get(
      `${AUTH_API}/personality/department?department=${department}`,
      httpOptions
    );
  }
}

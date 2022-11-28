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
export class ScoresService {
  constructor(private http: HttpClient) {}

  public saveScore(score: any): Observable<any> {
    return this.http.post(AUTH_API + 'save-score', score, httpOptions);
  }

  public saveVark(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'save-vark', data, httpOptions);
  }

  public savePersonality(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'save-personality', data, httpOptions);
  }
}

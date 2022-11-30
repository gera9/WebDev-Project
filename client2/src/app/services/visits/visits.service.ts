import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/visits';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class VisitsService {
  constructor(private _http: HttpClient) {}

  public getVisits(): Observable<any> {
    return this._http.get(AUTH_API, httpOptions);
  }

  public updateVisits(str: string) {
    this.getVisits().subscribe({
      next: (value) => {
        if (str == 'vark') {
          this._http
            .put(
              AUTH_API,
              {
                vark: value.vark + 1,
              },
              httpOptions
            )
            .subscribe({});
        } else {
          this._http
            .put(
              AUTH_API,
              {
                personality: value.personality + 1,
              },
              httpOptions
            )
            .subscribe({});
        }
      },
    });
  }
}

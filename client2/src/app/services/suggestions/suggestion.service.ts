import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxCaptchaModule } from 'ngx-captcha';

const AUTH_API = 'http://localhost:3000/email';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  constructor() {}
}

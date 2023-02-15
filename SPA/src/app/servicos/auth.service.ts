import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public loginWithGoogle(credential: string): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post(config.logistica_url + '/api/auth', { credentials: credential }, { headers: header });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import config, { httpOptions } from 'config';
import UserDTO from '../interfaces/UserDTO';

@Injectable({
  providedIn: 'root'
})

export class AnonimizarUserService {


  constructor(private HTTPClient : HttpClient) { }

  public anonimizarUser(id : number): Observable<UserDTO>{

    let uri = `${config.logistica_url}/api/users/${id}`;

    return this.HTTPClient.patch<UserDTO>(uri,null, httpOptions);
  }
}
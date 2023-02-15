import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../domain/user/user';
import { UserMap } from '../mappers/UserMap';
import  UserDTO  from '../interfaces/UserDTO';
import config, { httpOptions } from 'config';

@Injectable({
  providedIn: 'root'
})
export class CriarUserService {

  constructor(private HTTPClient : HttpClient) { }

  public criarUser(user : User): Observable<UserDTO>{
    return this.HTTPClient.post<UserDTO>(config.logistica_url +  "/api/users", UserMap.toDTO(user), httpOptions);

  }
}

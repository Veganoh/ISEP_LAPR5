import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import config, { httpOptions } from 'config';
import UserDTO from '../interfaces/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class ListarUsersService {

  constructor(private http: HttpClient) {}

  public obterUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(config.logistica_url + "/api/users", httpOptions);
  }
}

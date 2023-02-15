import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Armazem } from '../domain/armazem/armazem';
import { ArmazemDTO } from '../interfaces/armazemDto';
import config, { httpOptions } from 'config';

@Injectable({
  providedIn: 'root'
})
export class InibirArmazensService {

  constructor(private HTTPClient : HttpClient) { }

  public inibirOuAtivarArmazem(armazem : Armazem): Observable<ArmazemDTO>{
    return this.HTTPClient.patch<ArmazemDTO>(config.gestao_armazens_url + `/api/Armazens/Inibir/${armazem.id.toString()}`, null, httpOptions);
  }
}

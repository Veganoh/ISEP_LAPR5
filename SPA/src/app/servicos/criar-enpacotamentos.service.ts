import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enpacotamento } from '../domain/enpacotamento/enpacotamento';
import { EnpacotamentoDto } from '../interfaces/enpacotamentoDto';
import { EnpacotamentoMap } from '../mappers/enpacotamentoMap';
import config, { httpOptions } from 'config';

@Injectable({
  providedIn: 'root'
})
export class CriarEnpacotamentosService {

  constructor(private HTTPClient : HttpClient) { }

  public criarEnpacotamento(enpacotamento : Enpacotamento): Observable<EnpacotamentoDto>{
    return this.HTTPClient.post<EnpacotamentoDto>(config.logistica_url +  "/api/Enpacotamentos", EnpacotamentoMap.toDTO(enpacotamento), httpOptions);

  }
}

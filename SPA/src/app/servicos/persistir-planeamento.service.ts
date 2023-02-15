import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rota } from '../domain/planeamento/rota';
import { RotaMap } from '../mappers/rotaMap';

import RotaDTO from '../interfaces/rotaDto';
import config, { httpOptions } from 'config';

@Injectable({
  providedIn: 'root'
})
export class PersistirPlaneamentoService {

  constructor(private HTTPClient : HttpClient) { }

  public persistirPlaneamento(rota: Rota): Observable<RotaDTO>{
    return this.HTTPClient.post<RotaDTO>(config.logistica_url + "/api/planeamento/persistir", RotaMap.toDTO(rota), httpOptions);
  }
}

import { EntregaDTO } from '../interfaces/entregaDTO';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrega } from '../domain/entrega/entrega';
import { EntregaMap } from '../mappers/entregaMap';
import config, { httpOptions } from 'config';


@Injectable({
    providedIn: 'root'
})
export class CriarEntregasServico{

  constructor(private http: HttpClient) {}
  
  //faz a conecção ao webapi da gestão de armazens
  public criarEntrega(entrega : Entrega): Observable<EntregaDTO>  {
    return this.http.post<EntregaDTO>(config.gestao_armazens_url + "/api/Entregas", EntregaMap.toDTO(entrega), httpOptions);
  }
}


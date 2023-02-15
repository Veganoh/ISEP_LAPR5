import { HttpClient } from '@angular/common/http';
import { EntregaDTO } from '../interfaces/entregaDTO';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import config, { httpOptions } from 'config';

@Injectable({
  providedIn: 'root'
})
export class OrdenarEntregasService {

  constructor(private HTTPClient : HttpClient) { }

  public OrdenarPorAtributo(atributo : string): Observable<EntregaDTO[]>{
    if(atributo != "v0"){
    return this.HTTPClient.get<EntregaDTO[]>(`${config.gestao_armazens_url}/api/Entregas/sortBy/atribute/${atributo}`, httpOptions);
  }
  return this.HTTPClient.get<EntregaDTO[]>(config.gestao_armazens_url + "/api/Entregas/sortBy/atribute/", httpOptions);
 }
}

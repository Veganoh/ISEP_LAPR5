import { EntregaDTO } from '../interfaces/entregaDTO';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import config, { httpOptions } from 'config';



@Injectable({
    providedIn: 'root'
})
export class ListarEntregasServico{

  constructor(private http: HttpClient) {}
  
  public obterEntregas(): Observable<EntregaDTO[]> {
    return this.http.get<EntregaDTO[]>(config.gestao_armazens_url + "/api/Entregas", httpOptions);
  }
}


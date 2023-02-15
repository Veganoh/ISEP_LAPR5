import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnpacotamentoDto } from '../interfaces/enpacotamentoDto';
import config, { httpOptions } from 'config';

@Injectable({
  providedIn: 'root'
})

export class ListarEnpacotamentosService {

  constructor(private HTTPClient: HttpClient) {}

  public obterEnpacotamentosPagina(pag: number, num: number): Observable<{count: number, lista: EnpacotamentoDto[]}>{
    let url = `${config.logistica_url}/api/Enpacotamentos/pagina?pag=${pag}&num=${num}`;

    return this.HTTPClient.get<{count: number, lista: EnpacotamentoDto[]}>(url, httpOptions);
  }

  
  public obterEnpacotamentos(): Observable<EnpacotamentoDto[]>{
    return this.HTTPClient.get<EnpacotamentoDto[]>(config.logistica_url + "/api/Enpacotamentos", httpOptions);
  }
}

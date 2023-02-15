import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import RotaDTO from '../interfaces/rotaDto';
import config, { httpOptions } from 'config';

@Injectable({
  providedIn: 'root'
})
export class ListarViagensService {

  constructor(private HTTPClient : HttpClient) { }

  public listarViagens(pag: number, num: number,sortBy: string): Observable<{count: number, lista: RotaDTO[]}>{
    let uri = `${config.logistica_url}/api/planeamento/pagina?pag=${pag}&num=${num}&ord=${sortBy}`;

    return this.HTTPClient.get<{count: number, lista: RotaDTO[]}>(uri, httpOptions);
  }
}

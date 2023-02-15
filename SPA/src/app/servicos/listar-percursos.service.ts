import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IPercursoDTO from '../interfaces/IPercursoDTO';
import config, { httpOptions } from 'config';

@Injectable({
  providedIn: 'root'
})
export class ListarPercursosService {

  constructor(private HTTPClient : HttpClient) { }

  public listarPercursos(pag: number, num: number, orig: string, dest: string): Observable<{count: number, lista: IPercursoDTO[]}>{
    let uri = `${config.logistica_url}/api/Percursos/pagina?pag=${pag}&num=${num}`;

    if (orig) 
      uri += '&orig=' + orig;
    
    if (dest)
      uri += '&dest=' + dest;

    return this.HTTPClient.get<{count: number, lista: IPercursoDTO[]}>(uri, httpOptions);
  }
}

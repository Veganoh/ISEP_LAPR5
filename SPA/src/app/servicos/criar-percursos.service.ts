import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Percurso } from '../domain/percurso/percurso';
import IPercursoDTO from '../interfaces/IPercursoDTO';
import { PercursoMap } from '../mappers/PercursoMap';
import config, { httpOptions } from 'config';

@Injectable({
  providedIn: 'root'
})
export class CriarPercursosService {

  constructor(private HTTPClient : HttpClient) { }

  public criarPercurso(Percurso : Percurso): Observable<IPercursoDTO>{
    return this.HTTPClient.post<IPercursoDTO>(config.logistica_url + "/api/Percursos", PercursoMap.toDTO(Percurso), httpOptions);
  }
}

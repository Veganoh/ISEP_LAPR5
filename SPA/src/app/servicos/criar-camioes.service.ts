import { Injectable } from '@angular/core';
import { CamiaoDTO } from "../interfaces/camiaoDto";
import { HttpClient } from '@angular/common/http';
import { Camiao } from '../domain/camiao/camiao';
import { Observable } from 'rxjs';
import { CamiaoMap } from "../mappers/camiaoMap";
import config, { httpOptions } from 'config';

@Injectable({
  providedIn: 'root'
})
export class CriarCamioesService {

  constructor(private http: HttpClient) {}

  public criarCamiao(camiao: Camiao): Observable<CamiaoDTO> {
    return this.http.post<CamiaoDTO>(config.logistica_url + "/api/camiao", CamiaoMap.toDTO(camiao), httpOptions);
  }
}

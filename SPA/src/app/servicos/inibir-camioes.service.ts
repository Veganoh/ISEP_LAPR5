import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Camiao } from '../domain/camiao/camiao';
import { CamiaoDTO } from '../interfaces/camiaoDto';
import config, { httpOptions } from 'config';
import { CamiaoMap } from '../mappers/camiaoMap';

@Injectable({
  providedIn: 'root'
})
export class InibirCamioesService {

  constructor(private HTTPClient : HttpClient) { }

  public inibirOuAtivarCamiao(camiao : Camiao): Observable<CamiaoDTO>{
    return this.HTTPClient.patch<CamiaoDTO>(config.logistica_url + `/api/camiao/inibir`, CamiaoMap.toDTO(camiao),httpOptions);
  }
}
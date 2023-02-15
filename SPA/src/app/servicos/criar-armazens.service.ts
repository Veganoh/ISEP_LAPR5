import { ArmazemDTO } from '../interfaces/armazemDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Armazem } from '../domain/armazem/armazem';
import { ArmazemMap } from '../mappers/armazemMap';
import config, { httpOptions } from 'config';



@Injectable({
    providedIn: 'root'
})
export class CriarArmazensServico{

  constructor(private http: HttpClient) {}
  
  //faz a conecção ao webapi da gestão de armazens
  public criarArmazem(armazem : Armazem): Observable<ArmazemDTO>  {
    return this.http.post<ArmazemDTO>(config.gestao_armazens_url + "/api/Armazens", ArmazemMap.toDTO(armazem), httpOptions);
  }
}


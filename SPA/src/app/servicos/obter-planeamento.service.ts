import { Injectable } from '@angular/core';
import  PlaneamentoDTO  from "../interfaces/planeamentoDto";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlaneamentoRequest } from '../domain/planeamento/planeamentoRequest';
import { Observable, throwError } from 'rxjs';
import { PlaneamentoMap } from "../mappers/planeamentoMap";
import RotaDTO from '../interfaces/rotaDto';
import config, { httpOptions } from 'config';

@Injectable({
    providedIn: 'root'
  })
  export class ObterPlaneamentoService {
  
    constructor(private http: HttpClient) {}
  
    public obterPlaneamento(camiao: PlaneamentoRequest): Observable<RotaDTO> {
      return this.http.post<RotaDTO>(config.logistica_url + "/api/planeamento", PlaneamentoMap.toDTO(camiao), httpOptions);
    }

    public obterPlaneamentoGenetico(camiao: PlaneamentoRequest): Observable<RotaDTO[]> {
      return this.http.post<RotaDTO[]>(config.logistica_url + "/api/planeamento/frota", PlaneamentoMap.toDTO(camiao), httpOptions);
    }
  }


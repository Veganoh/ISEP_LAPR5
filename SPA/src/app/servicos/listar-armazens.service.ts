import { ArmazemDTO } from '../interfaces/armazemDto';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import config, { httpOptions } from 'config';



@Injectable({
    providedIn: 'root'
})
export class ListarArmazensServico{

  constructor(private http: HttpClient) {}
  
  //Realiza um get request ao API de gestão de armazens
  public obterArmazens(): Observable<ArmazemDTO[]> {
    return this.http.get<ArmazemDTO[]>(config.gestao_armazens_url + "/api/Armazens", httpOptions);
  }

  //Realiza um get request ao API de gestão de armazens
  public obterArmazensAtivos(): Observable<ArmazemDTO[]> {
    return this.http.get<ArmazemDTO[]>(config.gestao_armazens_url + "/api/Armazens/Ativos", httpOptions);
  }
}


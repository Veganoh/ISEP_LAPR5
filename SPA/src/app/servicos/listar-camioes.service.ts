import { CamiaoDTO } from "../interfaces/camiaoDto";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import config, { httpOptions } from 'config';


@Injectable({
    providedIn: 'root'
})

export class ListarCamioesServico{
    
    constructor(private http: HttpClient) {}

    public obterCamioes(): Observable<CamiaoDTO[]>{
        return this.http.get<CamiaoDTO[]>(config.logistica_url + "/api/camiao", httpOptions);
    }
}
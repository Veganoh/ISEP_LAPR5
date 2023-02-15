import { Component, OnInit } from '@angular/core';
import { CamiaoId } from "../domain/camiao/camiaoId";
import { NumeroAlgoritmo } from "../domain/planeamento/numeroAlgoritmo";
import { PlaneamentoRequest } from "../domain/planeamento/planeamentoRequest";
import { Rota } from "../domain/planeamento/rota";
import { ObterPlaneamentoService } from '../servicos/obter-planeamento.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, pipe, throwError } from 'rxjs';
import RotaDTO from '../interfaces/rotaDto';
import { Graph } from '../planeamento-graph-templates/graph-template';

import { ArmazensData } from "src/assets/Info";
import { PersistirPlaneamentoService } from '../servicos/persistir-planeamento.service';
import { RotaMap } from '../mappers/rotaMap';

@Component({
  selector: 'app-obter-planeamento',
  templateUrl: './obter-planeamento.component.html',
  styleUrls: ['./obter-planeamento.component.css']
})
export class ObterPlaneamentoComponent implements OnInit {

  profileForm = this.form();
  sucesso: boolean = false;

  rotaIndice: number = 0;
  rotaSelecionada: RotaDTO = null!;
  rotas : RotaDTO[] = []!;
  graph!: Graph;

  constructor(private _servico: ObterPlaneamentoService, private _persistirServico: PersistirPlaneamentoService) { }

  ngOnInit(): void {
    this.graph = new Graph();

    ArmazensData.forEach( armazem => {
      let xNorm = this.normalize(armazem.X, 50, -50) * 1.8 - 0.9;
      let yNorm = this.normalize(armazem.Y, 50, -50) * 1.8 - 0.9;
      let id = armazem.ID;

      this.graph.addNode(xNorm, yNorm, id); 
    });

    this.graph.atualizarLigacoes();
    this.graph.animate();
  }

  private normalize(val: number, max: number, min: number): number {
    return (val - min) / (max - min); 
  }

  obterPlaneamento(): void {
    this.rotas = [];
    var dataDesformatada;
    var re = /\-/gi;
    dataDesformatada = this.profileForm.controls["data"].value!;

    let planeamento: PlaneamentoRequest = PlaneamentoRequest.cria({
      camiao: new CamiaoId(this.profileForm.controls["camiao"].value!),
      data: new Date(dataDesformatada.replace(re,"/")),
      algoritmo: NumeroAlgoritmo.cria(this.profileForm.controls["algoritmo"].value!).getValue()
    }).getValue();


    if(planeamento.algoritmo.value < 5){
      this._servico.obterPlaneamento(planeamento).pipe(
        catchError((error) => {
          this.sucesso = false;
          return throwError(error.error);
        })).subscribe((dto) => {
          this.rotas.push(dto);    
          this.form()

          this.rotaSelecionada = dto;
          this.graph.adicionarRota(dto.rota);
          this.graph.animate();
        });
    }else{
      this._servico.obterPlaneamentoGenetico(planeamento).pipe(
        catchError((error) => {
          this.sucesso = false;
          return throwError(error.error);
        })).subscribe((dtoList) => {
          this.rotas = dtoList;
          this.form()

          this.rotaSelecionada = dtoList[0];
          this.graph.adicionarRota(dtoList[0].rota);
          this.graph.animate();
        });
      }
  }

  guardarPlaneamento() {
    let rota: Rota = RotaMap.toDomain(this.rotaSelecionada);


    if( confirm(
      `Tem a certeza de que quer guardar esta Rota?
      \n\tCamião: ${rota.camiao}
      \n\tData: ${rota.data.getDate()}/${rota.data.getMonth()}/${rota.data.getFullYear()}
      \n\tRota: ${rota.rota}`
      )) {
        this._persistirServico.persistirPlaneamento(rota).pipe(
          catchError((error) => {
            this.sucesso = false;
            return throwError(error.error);
          })).subscribe(() => {
            this.sucesso = true;
            console.log("sucesso");
          });
      }
  }

  fecharAlerta() {
    console.warn("pressed");
    this.sucesso = false;
  }

  proxPagina() {
    if ( this.rotaIndice < this.rotas.length - 1 ) {
      this.rotaIndice++;
      this.rotaSelecionada = this.rotas[this.rotaIndice];
    } 
    else if ( this.rotaIndice === this.rotas.length - 1 && this.rotaIndice !== 0 ) {
      this.rotaIndice = 0;
      this.rotaSelecionada = this.rotas[this.rotaIndice];
    }

    this.graph.adicionarRota(this.rotaSelecionada.rota);
    this.graph.animate();
  }
  
  prevPagina() {
    if ( this.rotaIndice > 0 ) {
      this.rotaIndice--;
      this.rotaSelecionada = this.rotas[this.rotaIndice];
    } 
    else if ( this.rotaIndice === 0 ) {
      this.rotaIndice = this.rotas.length - 1;
      this.rotaSelecionada = this.rotas[this.rotaIndice];
    }

    this.graph.adicionarRota(this.rotaSelecionada.rota);
    this.graph.animate();
  }

  form(): FormGroup{
    return new FormGroup({
      camiao: new FormControl('', [Validators.required, Validators.pattern(/^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/)]),
      data: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]),
      algoritmo: new FormControl(0, [Validators.required])
    })
  }
}

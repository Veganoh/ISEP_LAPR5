import { Component, OnInit } from '@angular/core';
import { Camiao } from "../domain/camiao/camiao";
import { Injectable } from '@angular/core';
import { Result } from '../core/logic/Result';
import { CriarCamioesService } from '../servicos/criar-camioes.service';
import { CamiaoId } from '../domain/camiao/camiaoId';
import { Tara } from '../domain/camiao/camiaoTara';
import { CargaTotal } from '../domain/camiao/camiaoCargaTotal';
import { CamiaoBateria } from '../domain/camiao/camiaoBateria';
import { AutonomiaCamiao } from '../domain/camiao/camiaoAutonomia';
import { CarregamentoLento } from '../domain/camiao/camiaoCarregamentoLento';
import { CarregamentoRapido } from '../domain/camiao/camiaoCarregamentoRapido';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { stringify } from 'uuid';
import { catchError, throwError } from 'rxjs';
import { CamiaoAtivo } from '../domain/camiao/camiaoAtivo';


@Component({
  selector: 'app-criar-camioes',
  templateUrl: './criar-camioes.component.html',
  styleUrls: ['./criar-camioes.component.css']
})
export class CriarCamioesComponent implements OnInit {

  profileForm = this.form();
  sucesso: boolean = false;

  constructor(private _servico: CriarCamioesService) { }

  ngOnInit(): void {
  }

  criarCamiao(): void {
    let camiao: Camiao = Camiao.create({
      tara: Tara.create(this.profileForm.controls["tara"].value!).getValue(),
      capacidadeCargaTotal: CargaTotal.create(this.profileForm.controls["capacidadeCargaTotal"].value!).getValue(),
      camiaoBateria: CamiaoBateria.create(this.profileForm.controls["camiaoBateria"].value!).getValue(),
      autonomiaCamiao: AutonomiaCamiao.create(this.profileForm.controls["autonomiaCamiao"].value!).getValue(),
      carregamentoLento: CarregamentoLento.create(this.profileForm.controls["carregamentoLento"].value!).getValue(),
      carregamentoRapido: CarregamentoRapido.create(this.profileForm.controls["carregamentoRapido"].value!).getValue(),
      ativo: CamiaoAtivo.create(true).getValue(),
    }, new CamiaoId(this.profileForm.controls["id"].value!)).getValue();

    this._servico.criarCamiao(camiao).pipe(
      catchError((error) => {
        this.sucesso = false;
        return throwError(error.error);
      })).subscribe(() => {this.sucesso = true;
                      this.form()});
  }

  form(): FormGroup{
    return new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern(/^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/)]),
      tara: new FormControl(0, [Validators.required, Validators.min(1)]),
      capacidadeCargaTotal: new FormControl(0, [Validators.required, Validators.min(1)]),
      camiaoBateria: new FormControl(0, [Validators.required, Validators.min(1)]),
      autonomiaCamiao: new FormControl(0, [Validators.required, Validators.min(1)]),
      carregamentoLento: new FormControl(0, [Validators.required, Validators.min(1)]),
      carregamentoRapido: new FormControl(0, [Validators.required, Validators.min(1)])
    })
  }
}

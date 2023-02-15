import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Result } from '../core/logic/Result';
import { CriarEntregasServico } from '../servicos/criar-entregas.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { EntregaID } from "../domain/entrega/entregaId";
import { Data } from "../domain/entrega/data";
import { PesoEntrega } from "../domain/entrega/peso_entrega";
import { Armazem_ID } from "../domain/entrega/armazem_id";
import {TempoColacacao} from "../domain/entrega/tempo_colocacao";
import {TempoRetirada} from "../domain/entrega/tempo_retirada";
import { Entrega } from "../domain/entrega/entrega";
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-criar-entregas',
  templateUrl: './criar-entregas.component.html',
  styleUrls: ['./criar-entregas.component.css'],
  providers: [CriarEntregasServico]
})

@Injectable()
export class CriarEntregasComponent implements OnInit {

  profileForm = new FormGroup({
    //identificador: new FormControl('', [Validators.required, Validators.minLength(1)]),
    data: new FormControl('', [Validators.required, Validators.pattern(/^\d{2}[-]\d{2}[-]\d{4}$/)]),
    peso: new FormControl(1, [Validators.min(1)]),
    arm_id: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3}$/)]),
    tempo_col: new FormControl(1, [Validators.min(1)]),
    tempo_ret: new FormControl(1, [Validators.min(1)])
  });

  sucesso: boolean = false;

  constructor(private _servico: CriarEntregasServico) { 
  }


  ngOnInit(): void {
    //this.profileForm.controls["identificador"].invalid;
  }
  
  criarEntrega(): void {
    let entrega: Entrega = Entrega.cria({
      data: Data.create(this.profileForm.controls["data"].value!).getValue(),
      peso: PesoEntrega.create(this.profileForm.controls["peso"].value!).getValue(),
      arm_id: Armazem_ID.create(this.profileForm.controls["arm_id"].value!).getValue(),
      tempo_col: TempoColacacao.create(this.profileForm.controls["tempo_col"].value!).getValue(),
      tempo_ret: TempoRetirada.create(this.profileForm.controls["tempo_ret"].value!).getValue()
    },  new EntregaID('')).getValue();

    console.log(entrega.data.value);
    this._servico.criarEntrega(entrega).pipe(
      catchError((error) => {
        this.sucesso = false;
        return throwError(error.error);
      })).subscribe(() => {this.sucesso = true;
                    this.form()});
  };

  form(): void{
    this.profileForm = new FormGroup({
      //identificador: new FormControl('', [Validators.required, Validators.minLength(1)]),
      data: new FormControl('', [Validators.required, Validators.pattern(/^\d{2}[-]\d{2}[-]\d{4}$/)]),
      peso: new FormControl(1, [Validators.min(1)]),
      arm_id: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3}$/)]),
      tempo_col: new FormControl(1, [Validators.min(1)]),
      tempo_ret: new FormControl(1, [Validators.min(1)])
    });
  }

  fecharAlerta() {
    console.warn("pressed");
    this.sucesso = false;
  }

}

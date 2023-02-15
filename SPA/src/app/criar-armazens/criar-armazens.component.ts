import { Component, OnInit } from '@angular/core';
import { Armazem   } from '../domain/armazem/armazem';
import { Injectable } from '@angular/core';
import { Result } from '../core/logic/Result';
import { CriarArmazensServico } from '../servicos/criar-armazens.service';
import { ArmazemID } from '../domain/armazem/armazemId';
import { Designacao } from '../domain/armazem/designacao';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Coordenadas } from '../domain/armazem/coordenadas';
import { Endereco } from '../domain/armazem/endereco';
import { Altitude } from '../domain/armazem/altitude';
import { stringify } from 'uuid';
import { catchError, throwError } from 'rxjs';
import { Ativo } from '../domain/armazem/ativo';

@Component({
  selector: 'app-criar-armazens',
  templateUrl: './criar-armazens.component.html',
  styleUrls: ['./criar-armazens.component.css'],
  providers: [CriarArmazensServico]
})

@Injectable()
export class CriarArmazensComponent implements OnInit {

  //form usado para validar em tempo real inputs de utilizador
  profileForm = this.form();

  //muda de valor no caso de a operação funcionar
  sucesso: boolean = false;

  constructor(private _servico: CriarArmazensServico) { 
  }


  ngOnInit(): void {
  }
  
  //cria o armaem usando os valores dados
  criarArmazem(): void {
    let armazem: Armazem = Armazem.cria({
      designacao: Designacao.create(this.profileForm.controls["designacao"].value!).getValue(),
      endereco: Endereco.create(this.profileForm.controls["endereco"].value!).getValue(),
      coordenadas: Coordenadas.create(this.profileForm.controls["latitude"].value!, this.profileForm.controls["longitude"].value!).getValue(),
      altitude: Altitude.create(this.profileForm.controls["altitude"].value!).getValue(),
      ativo: Ativo.create(true).getValue(),
    },  new ArmazemID(this.profileForm.controls["identificador"].value!)).getValue();

    //serviço e chamado e subscrito para avisar do sucesso da operação
    this._servico.criarArmazem(armazem).pipe(
      catchError((error) => {
        this.sucesso = false;
        return throwError(error.error);
      })).subscribe(() => {this.sucesso = true;
                    this.form()});
  }

  //metodo que reseta o form usado para validar os valores
  form(): FormGroup{
    return new FormGroup({
      identificador: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3}$/)]),
      designacao: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]),
      endereco: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z ]+,){2}( *[0-9]{4}-)[0-9]{3}$/)]),
      latitude: new FormControl(0, [Validators.max(90), Validators.min(-90)]),
      longitude: new FormControl(0, [Validators.max(180), Validators.min(-180)]),
      altitude: new FormControl(0, [Validators.min(0)])
    });
  }

  fecharAlerta() {
    console.warn("pressed");
    this.sucesso = false;
  }

}

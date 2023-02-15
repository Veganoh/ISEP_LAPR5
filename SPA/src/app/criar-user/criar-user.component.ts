import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { UserMap } from '../mappers/UserMap';
import { CriarUserService } from '../servicos/criar-user.service';

@Component({
  selector: 'app-criar-user',
  templateUrl: './criar-user.component.html',
  styleUrls: ['./criar-user.component.css']
})
export class CriarUserComponent implements OnInit {

  sucesso = false;

  userForm = new FormGroup({
    primeiroNome: new FormControl('', [Validators.required]),
    ultimoNome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    telemovel: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });

  constructor(
    private criarUserService : CriarUserService
  ) { }

  ngOnInit(): void {
  }

  criarUser() {
    const user = UserMap.toDomain({
      userId: -1,
      primeiroNome: this.primeiroNome!.value!,
      ultimoNome: this.ultimoNome!.value!,
      email: this.email!.value!,
      telemovel: this.telemovel!.value!,
      role: this.role!.value!,
    });

    if ( user.isFailure) {
      console.warn(user.error);
      return;
    }

    if( confirm(
      `Tem a certeza de que quer criar o Utilizador?
      \n\tPrimeiro Nome: ${this.primeiroNome?.value}
      \n\tÚltimo Nome: ${this.ultimoNome?.value}
      \n\tEmail: ${this.email?.value}
      \n\tTelemóvel: ${this.telemovel?.value}
      \n\tTipo de Utilizador: ${this.role?.value}`
      )) {
        this.criarUserService.criarUser(user.getValue()).pipe(
          catchError((error) => {
            this.sucesso = false;
            return throwError(error.error);
          })).subscribe(() => {this.sucesso = true; });
      }
  }

  fecharAlerta() {
    console.warn("pressed");
    this.sucesso = false;
  }

  get primeiroNome() { return this.userForm.get('primeiroNome'); }

  get ultimoNome() { return this.userForm.get('ultimoNome'); }

  get email() { return this.userForm.get('email'); }

  get telemovel() { return this.userForm.get('telemovel'); }

  get role() { return this.userForm.get('role'); }

}

import { Component, OnInit } from '@angular/core';
import { ListarUsersService } from '../servicos/listar-users.service';
import { AnonimizarUserService } from '../servicos/anonimizar-user.service';
import UserDTO from '../interfaces/UserDTO';

@Component({
  selector: 'app-anonimizar-user',
  templateUrl: './anonimizar-user.component.html',
  styleUrls: ['./anonimizar-user.component.css'],
  providers: [AnonimizarUserService,ListarUsersService]
})

export class AnonimizarUserComponent implements OnInit {

  constructor(
    private _listar_servico: ListarUsersService,
    private _anonimizar_servico: AnonimizarUserService
  ) { }

  users : UserDTO[] = [];
  backup : UserDTO[] = [];


  ngOnInit(): void {
    this.popularLista();
  }

  popularLista(): void{
    this.users = [];
    this.backup = [];
    this._listar_servico.obterUsers().subscribe((usersDTO) => {this.backup = usersDTO;
      this.users = this.backup;});
}

  isAnonimizado(user : UserDTO) : Boolean{
    var re = /^x+$/;

    return re.test(user.email) && re.test(user.primeiroNome) && re.test(user.ultimoNome) && re.test(user.role) && re.test(user.telemovel);
  }

  
  public anonimizarUser(userDTO: UserDTO): void{
    let id = userDTO.userId;
    this._anonimizar_servico.anonimizarUser(id).subscribe((dto) => {
      this.backup[this.backup.indexOf(userDTO)] = dto;
    });
  }
}

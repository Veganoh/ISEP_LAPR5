import { Component, OnInit } from '@angular/core';
import { Camiao } from '../domain/camiao/camiao';
import { CamiaoMap } from '../mappers/camiaoMap';
import { InibirCamioesService } from '../servicos/inibir-camioes.service';
import { ListarCamioesServico } from '../servicos/listar-camioes.service';

@Component({
  selector: 'app-listar-camioes',
  templateUrl: './listar-camioes.component.html',
  styleUrls: ['./listar-camioes.component.css'],
  providers: [ListarCamioesServico,]
})
export class ListarCamioesComponent implements OnInit {

  constructor(private _servico: ListarCamioesServico, private _inibir_servico: InibirCamioesService) { }

  backup: Camiao[] = [];
  camioes: Camiao[] = [];
  idFilter: string = "";

  ngOnInit(): void {
    this._servico.obterCamioes().subscribe((camioesDTO) => {this.backup = CamiaoMap.toDomainLista(camioesDTO);
      this.camioes = this.backup;});
  }

  filter(): void{
    this.camioes = this.backup.filter((camiao) => camiao.id.toString().includes(this.idFilter));
  }

  public inibirOuAtivarCamiao(camiao: Camiao): void{
    if(camiao)
      this._inibir_servico.inibirOuAtivarCamiao(camiao).subscribe((camiaoDTO) => {
        this.backup[this.backup.indexOf(camiao)] = CamiaoMap.toDomain(camiaoDTO);
        this.filter()
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Armazem } from '../domain/armazem/armazem';
import { ArmazemMap } from '../mappers/armazemMap';
import { InibirArmazensService } from '../servicos/inibir-armazens.service';
import { ListarArmazensServico } from '../servicos/listar-armazens.service';

@Component({
  selector: 'app-listar-armazens',
  templateUrl: './listar-armazens.component.html',
  styleUrls: ['./listar-armazens.component.css'],
  providers: [ListarArmazensServico, InibirArmazensService]
})
export class ListarArmazensComponent implements OnInit {

  constructor(
    private _listar_servico: ListarArmazensServico,
    private _inibir_servico: InibirArmazensService
    ) { }

  backup : Armazem[] = [];
  armazens : Armazem[] = [];
  idFilter : string = "";
  designacaoFilter : string = "";

  ngOnInit(): void {
    this.popularLista();
  }

  popularLista(): void{
      this._listar_servico.obterArmazens().subscribe((armazensDTO) => {this.backup = ArmazemMap.toDomainLista(armazensDTO);
        this.armazens = this.backup;});
  }

  //filtra a lista de armazens obtidos mostrado aqueles que correspondem a pesquisa
  filter(): void{
    this.armazens = this.backup.filter((armazem) => armazem.id.toString().includes(this.idFilter) 
                                                    && armazem.designacao.value.includes(this.designacaoFilter));
  }

  
  public InibirOuAtivarArmazem(armazem: Armazem): void{
    if(armazem)
      this._inibir_servico.inibirOuAtivarArmazem(armazem).subscribe((armazemDTO) => {
        this.backup[this.backup.indexOf(armazem)] = ArmazemMap.toDomain(armazemDTO);
        this.filter()
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Entrega } from '../domain/entrega/entrega';
import { EntregaMap } from '../mappers/entregaMap';
import { ListarEntregasServico } from '../servicos/listar-entregas';
import { OrdenarEntregasService } from '../servicos/ordenar.service';
import { ListarArmazensServico } from '../servicos/listar-armazens.service'
import { Armazem } from '../domain/armazem/armazem';
import { ArmazemMap } from '../mappers/armazemMap';

@Component({
  selector: 'app-listar-entregas',
  templateUrl: './listar-entregas.component.html',
  styleUrls: ['./listar-entregas.component.css'],
  providers: [ListarEntregasServico]
})
export class ListarEntregasComponent implements OnInit {

  constructor(private _servico: ListarEntregasServico,private obterArmazensService : ListarArmazensServico, private ordenarEntrega:OrdenarEntregasService) { }

  backup : Entrega[] = [];
  entregas : Entrega[] = [];
  armazens : Armazem[] = [];
  idFilter : string = "";
  dataInicioFilter : string = "";
  dataFimFilter : string = "";
  sortBy:string = "";

  ngOnInit(): void {
    this._servico.obterEntregas().subscribe((entregasDTO) => {this.backup = EntregaMap.toDomainLista(entregasDTO);
      this.entregas = this.backup;});
    
    this.obterArmazensService.obterArmazensAtivos().subscribe((armazensDTO) => {this.armazens = ArmazemMap.toDomainLista(armazensDTO);})
  }

  filter(): void{
    console.log(new Date(this.backup[0].data.value) >= new Date(this.dataInicioFilter))
    console.log(this.backup[0].arm_id.value);
    console.log(this.idFilter);
    console.log(new Date(this.dataInicioFilter.replace("///g", "-")));
    this.entregas = this.backup.filter((entrega) => entrega.arm_id.value.includes(this.idFilter) 
                                                    &&( new Date(entrega.data.value) >= new Date(this.dataInicioFilter.replace("///g", "-")) && 
                                                    new Date(entrega.data.value) <= new Date(this.dataFimFilter.replace("///g", "-")) || this.dataInicioFilter == '' && this.dataFimFilter == ''));
  }

  OrderBy():void{
    console.log(this.sortBy);
      this.ordenarEntrega.OrdenarPorAtributo(this.sortBy).subscribe((entregasDTO) => {this.backup = EntregaMap.toDomainLista(entregasDTO);
        this.entregas = this.backup;});
    /**
    if(this.sortBy.includes("v1")){
      this.ordenarEntrega.OrdenarPorAtributo(this.sortBy);
      this.entregas = this.backup;
    }
    if(this.sortBy.includes("v2")){
      this.ordenarEntrega.OrdenarPorAtributo(this.sortBy);
      this.entregas = this.backup;
    }
    if(this.sortBy.includes("v3")){
      this.backup = this.ordenarEntrega.OrdenarPorAtributo(this.sortBy);
      this.entregas = this.backup;
    }
    if(this.sortBy.includes("v4")){
      this.ordenarEntrega.OrdenarPorAtributo(this.sortBy);
      this.entregas = this.backup;

    }
    if(this.sortBy.includes("v5")){
      this.ordenarEntrega.OrdenarPorAtributo(this.sortBy);
      this.entregas = this.backup;
    }
    */
  }

}

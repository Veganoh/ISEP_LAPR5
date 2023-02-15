import { Component, OnInit } from '@angular/core';
import { EnpacotamentoDto } from '../interfaces/enpacotamentoDto';
import { ListarEnpacotamentosService } from '../servicos/listar-enpacotamentos.service';


@Component({
  selector: 'app-listar-enpacotamentos',
  templateUrl: './listar-enpacotamentos.component.html',
  styleUrls: ['./listar-enpacotamentos.component.css'],
  providers: [ListarEnpacotamentosService],
})

export class ListarEnpacotamentosComponent implements OnInit {
  listaEnpacotamentosDto : EnpacotamentoDto[] = [];
  backupEnpacotamentosDto : EnpacotamentoDto[] = [];
  countTotal: number = 0;

  paginaAtual: number = 0;
  numPorPagina: number = 10;
  numTotalPaginas : number = this.countTotal / this.numPorPagina;

  btnPrevDesativado = true;
  btnProxDesativado = false;

  entregaFilter: string = "";
  matriculaFilter: string = "";

  constructor(private service : ListarEnpacotamentosService) { }



  ngOnInit(): void {
    this.atualizarDados();
  }

  atualizarDados() {

    this.entregaFilter = "";
    this.matriculaFilter = "";

    this.service.obterEnpacotamentosPagina(this.paginaAtual,this.numPorPagina).subscribe(enpacotamentos => {
      this.backupEnpacotamentosDto = enpacotamentos.lista;
      this.listaEnpacotamentosDto = this.backupEnpacotamentosDto;
      this.countTotal = enpacotamentos.count;
      this.numTotalPaginas = Math.ceil(this.countTotal / this.numPorPagina);

      if (this.paginaAtual === 0) {
        this.btnPrevDesativado = true;
      } else {
        this.btnPrevDesativado = false;
      }

      if (this.paginaAtual === this.numTotalPaginas - 1) {
        this.btnProxDesativado = true;
      } else {
        this.btnProxDesativado = false;
      }
    });
  }

  ultimaPagina() {
    this.paginaAtual = this.numTotalPaginas - 1;
    
    this.atualizarDados();

    this.irTopoJanela();
  }


  primeiraPagina() {
    this.paginaAtual = 0;

    this.atualizarDados();

    this.irTopoJanela();
  }
  
  proxPagina() {
    if (this.paginaAtual !== this.numTotalPaginas - 1) {
      this.paginaAtual++;

      this.atualizarDados();

      this.irTopoJanela();
    }
  }

  prevPagina() {
    if (this.paginaAtual !== 0) {
      this.paginaAtual--;

      this.atualizarDados();

      this.irTopoJanela();
    }
  }


  mudarPagina(pagina: number) {
    this.paginaAtual = pagina;

    this.atualizarDados();
  }

  mudarNumPorPagina() {
    this.paginaAtual = 0;

    this.atualizarDados();
  }

  
  aplicarFiltro() {
    this.listaEnpacotamentosDto = this.backupEnpacotamentosDto.filter((enpacotamento) => enpacotamento.matricula.toString().includes(this.matriculaFilter)
                                                                                        && enpacotamento.entrega.toString().includes(this.entregaFilter));
  }


  private irTopoJanela() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}

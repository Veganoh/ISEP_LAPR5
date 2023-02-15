import { Component, OnInit } from '@angular/core';
import { ListarViagensService } from '../servicos/listar-viagens.service';
import RotaDTO from '../interfaces/rotaDto';

@Component({
  selector: 'app-listar-viagens',
  templateUrl: './listar-viagens.component.html',
  styleUrls: ['./listar-viagens.component.css']
})
export class ListarViagensComponent implements OnInit {

  /*
  LISTAR POR PAGINA
  */
 backup:RotaDTO[] = [];
  listaRotasDto: RotaDTO[] = [];
  countTotal: number = 0;

  paginaAtual: number = 0;
  numPorPagina: number = 10;
  numTotalPaginas: number = this.countTotal / this.numPorPagina;

  btnPrevDesativado = true;
  btnProxDesativado = false;

  /*
  FILTRAR
  */
  dataInicioFilter : string = "";
  dataFimFilter : string = "";
  idFilter : string = "";
  sortBy:string = "";

  constructor(private listarRotasService: ListarViagensService) { }

  ngOnInit(): void {
    this.atualizarDados();
  }

  atualizarDados() {
    this.listarRotasService.listarViagens(this.paginaAtual, this.numPorPagina,this.sortBy).subscribe(rotas => {
      this.listaRotasDto = rotas.lista;
      this.backup = this.listaRotasDto;
      this.countTotal = rotas.count;
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

  primeiraPagina() {
    this.paginaAtual = 0;

    this.atualizarDados();

    this.irTopoJanela();
  }

  mudarPagina(pagina: number) {
    this.paginaAtual = pagina;

    this.atualizarDados();
  }

  private irTopoJanela() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  mudarNumPorPagina() {
    this.paginaAtual = 0;

    this.atualizarDados();
  }

  aplicarFiltro() {
    this.paginaAtual = 0;

    this.atualizarDados();
  }

  filter(): void{
    this.listaRotasDto = this.backup.filter((rotas) => rotas.camiao.includes(this.idFilter) 
                                                    &&( new Date(rotas.data) >= new Date(this.dataInicioFilter.replace("///g", "-")) && 
                                                    new Date(rotas.data) <= new Date(this.dataFimFilter.replace("///g", "-")) || this.dataInicioFilter == '' && this.dataFimFilter == ''));
  }
  
}

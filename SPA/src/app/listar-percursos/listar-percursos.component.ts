import { Component, OnInit } from '@angular/core';
import IPercursoDTO from '../interfaces/IPercursoDTO';
import { ListarPercursosService } from '../servicos/listar-percursos.service';

@Component({
  selector: 'app-listar-percursos',
  templateUrl: './listar-percursos.component.html',
  styleUrls: ['./listar-percursos.component.css']
})
export class ListarPercursosComponent implements OnInit {
  listaPercursosDto: IPercursoDTO[] = [];
  countTotal: number = 0;

  paginaAtual: number = 0;
  numPorPagina: number = 10;
  numTotalPaginas: number = this.countTotal / this.numPorPagina;

  btnPrevDesativado = true;
  btnProxDesativado = false;

  armazemOrigemFiltro = '';
  armazemDestinoFiltro = '';

  constructor(private listarPercursosService: ListarPercursosService) { }

  ngOnInit(): void {
    this.atualizarDados();
  }

  atualizarDados() {
    this.listarPercursosService.listarPercursos(this.paginaAtual, this.numPorPagina, this.armazemOrigemFiltro, this.armazemDestinoFiltro).subscribe(percursos => {
      this.listaPercursosDto = percursos.lista;
      this.countTotal = percursos.count;
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
}

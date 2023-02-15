import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { armazemValidator, distanciaValidator, energiaValidator, tempoBaseValidator, tempoExtraValidator } from '../domain/percurso/percurso-validators';
import { ArmazemDTO } from '../interfaces/armazemDto';
import { PercursoMap } from '../mappers/PercursoMap';
import { CriarPercursosService } from '../servicos/criar-percursos.service';
import { ListarArmazensServico } from '../servicos/listar-armazens.service';

@Component({
  selector: 'app-criar-percursos',
  templateUrl: './criar-percursos.component.html',
  styleUrls: ['./criar-percursos.component.css']
})

export class CriarPercursosComponent implements OnInit {
  listaArmazens: ArmazemDTO[] = [];

  sucesso = false;
  armazensDesativados: any = {};

  percursoForm = new FormGroup({
    armazemOrig: new FormControl('', [Validators.required]),
    armazemDest: new FormControl('', [Validators.required]),
    distancia: new FormControl(0, [Validators.required, distanciaValidator()]),
    energia: new FormControl(0, [Validators.required, energiaValidator()]),
    tempo: new FormControl(0, [Validators.required, tempoBaseValidator()]),
    tempoExtra: new FormControl(0, [Validators.required, tempoExtraValidator()])
  });

  constructor( 
    private obterArmazensService: ListarArmazensServico,
    private criarPercursosService: CriarPercursosService
  ) { }

  ngOnInit(): void {
    this.obterArmazensService.obterArmazensAtivos().subscribe(armazensDTO => {
      this.listaArmazens = armazensDTO;
    });
  }

  criarPercurso() {
    const result = PercursoMap.toDomain({ 
        domainId: -1,
        armazemOrigem: this.armazemOrig!.value!, 
        armazemDestino: this.armazemDest!.value!, 
        distancia: this.distancia!.value!, 
        energiaGasta: this.energia!.value!, 
        tempoBase: this.tempo!.value!, 
        tempoExtra: this.tempoExtra!.value!
      });

    if ( result.isFailure) {
      console.warn(result.error);
      return;
    }

    if( confirm(
        `Tem a certeza de que quer criar o Percurso?
        \n\tOrigem: ${this.armazemOrig?.value}
        \n\tDestino: ${this.armazemDest?.value}
        \n\tDistância: ${this.distancia?.value}
        \n\tEnergia: ${this.energia?.value}
        \n\tTempo: ${this.tempo?.value}
        \n\tTempo Extra: ${this.tempoExtra?.value}`
        )) {
          this.criarPercursosService.criarPercurso(result.getValue()).pipe(
            catchError((error) => {
              this.sucesso = false;
              return throwError(error.error);
            })).subscribe(() => {this.sucesso = true; });
    }
  }

  desativarArmazem() {
    localStorage.getItem("origem");
    this.armazensDesativados["001"] = false;
  }

  fecharAlerta() {
    console.warn("pressed");
    this.sucesso = false;
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  get armazemOrig() { return this.percursoForm.get('armazemOrig'); }

  get armazemDest() { return this.percursoForm.get('armazemDest'); }

  get distancia() { return this.percursoForm.get('distancia'); }

  get tempo() { return this.percursoForm.get('tempo'); }

  get energia() { return this.percursoForm.get('energia'); }

  get tempoExtra() { return this.percursoForm.get('tempoExtra'); }

}



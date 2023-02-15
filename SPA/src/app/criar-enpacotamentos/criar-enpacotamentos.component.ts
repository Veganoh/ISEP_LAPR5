import { Component, OnInit } from '@angular/core';
import { CriarEnpacotamentosService } from '../servicos/criar-enpacotamentos.service';
import { ListarEnpacotamentosService } from '../servicos/listar-enpacotamentos.service';
import { ListarEntregasServico } from '../servicos/listar-entregas';
import { Enpacotamento } from '../domain/enpacotamento/enpacotamento';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnpacotamentoId } from '../domain/enpacotamento/enpacotamentoId';
import { EnpacotamentoEntrega } from '../domain/enpacotamento/empacotamentoEntrega';
import { CamiaoId } from '../domain/camiao/camiaoId';
import { EnpacotamentoTempos } from '../domain/enpacotamento/enpacotamentoTempos';
import { EnpacotamentoCoordenadas } from '../domain/enpacotamento/enpacotamentoCoordenadas';
import { catchError, throwError } from 'rxjs';
import { EnpacotamentoDto } from '../interfaces/enpacotamentoDto';
import { EntregaDTO } from '../interfaces/entregaDTO';


@Component({
  selector: 'app-criar-enpacotamentos',
  templateUrl: './criar-enpacotamentos.component.html',
  styleUrls: ['./criar-enpacotamentos.component.css'],
  providers: [CriarEnpacotamentosService,ListarEntregasServico,ListarEnpacotamentosService]
})

export class CriarEnpacotamentosComponent implements OnInit {

  profileForm = this.form();
  sucesso: boolean = false;
  entregasFiltradas : EntregaDTO[] = [];
  backup : EntregaDTO[] = [];
  
  entregas : EntregaDTO[] = [];
  enpacotamentos : EnpacotamentoDto[] = [];

  constructor(
    private obterEntregasService : ListarEntregasServico,
    private obterEnpacotamentosService : ListarEnpacotamentosService,
    private criarEnpacotamentoService: CriarEnpacotamentosService,
  ) { }


  ngOnInit(): void {
    this.obterEntregasService.obterEntregas().subscribe(entregasDTO => {(this.entregas = entregasDTO);this.filtrarEntregas();});
    this.obterEnpacotamentosService.obterEnpacotamentos().subscribe(enpacotamentosDTO => {this.enpacotamentos = enpacotamentosDTO;this.filtrarEntregas();});
  }

  filtrarEntregas(): void{
    this.entregasFiltradas = [];
    
    this.entregas.forEach(entrega => {
      let flag = true;
      this.enpacotamentos.forEach(enpacotamento =>{
        if(entrega.identificador.match(enpacotamento.entrega)) flag = false;
      })

      if(flag){
        this.entregasFiltradas.push(entrega);
      }
    })
  }
  
  criarEnpacotamento(): void {
    let enpacotamento : Enpacotamento = Enpacotamento.cria({

      entrega: EnpacotamentoEntrega.cria(this.profileForm.controls["entrega"].value!).getValue(),
      matricula: new CamiaoId(this.profileForm.controls["matricula"].value!),
      tempos : EnpacotamentoTempos.cria(this.profileForm.controls["tempoColocacao"].value!,this.profileForm.controls["tempoRetirada"].value!).getValue(),
      coordenadas: EnpacotamentoCoordenadas.cria(this.profileForm.controls["coordenadaX"].value!,this.profileForm.controls["coordenadaY"].value!,this.profileForm.controls["coordenadaZ"].value!).getValue(),
    }, new EnpacotamentoId(-1)).getValue();

    this.criarEnpacotamentoService.criarEnpacotamento(enpacotamento).pipe(
      catchError((error) => {
        this.sucesso = false;
        return throwError(error.error);
      })).subscribe(() => {this.sucesso = true;
                      this.form(),
                      this.backup = this.entregasFiltradas.filter(entrega => {return entrega.identificador !== (enpacotamento.entrega.value)}),
                      this.entregasFiltradas = this.backup;
                    });
  }

  form(): FormGroup{
    return new FormGroup({
      entrega: new FormControl('', [Validators.required]),
      matricula: new FormControl('', [Validators.required, Validators.pattern(/^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/)]),
      tempoColocacao: new FormControl(0, [Validators.required, Validators.min(0)]),
      tempoRetirada: new FormControl(0, [Validators.required, Validators.min(0)]),
      coordenadaX: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(9)]),
      coordenadaY: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(19)]),
      coordenadaZ: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(7)])
    });
  }

}

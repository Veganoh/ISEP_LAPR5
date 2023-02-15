// @ts-nocheck
import { CriarEnpacotamentosService } from 'src/app/servicos/criar-enpacotamentos.service';
import { of } from 'rxjs';
import { CriarEnpacotamentosComponent } from 'src/app/criar-enpacotamentos/criar-enpacotamentos.component';
import { HttpErrorResponse } from '@angular/common/http';
import { EnpacotamentoDto } from 'src/app/interfaces/enpacotamentoDto';
import { ListarEnpacotamentosService } from 'src/app/servicos/listar-enpacotamentos.service';
import { ListarEntregasServico } from 'src/app/servicos/listar-entregas';
import { EntregaDTO } from 'src/app/interfaces/entregaDTO';
 
describe('CriarEnpacotamentosComponent', () => {

    const domainId = -1;
    const entrega = "alt";
    const matricula = "CA-10-10";
    const tempoColocacao = 1;
    const tempoRetirada = 2;
    const coordenadaX = 2;
    const coordenadaY = 3;
    const coordenadaZ = 4;

    let service = jasmine.createSpyObj('CriarEnpacotamentosService', ['criarEnpacotamento']);
    let serviceEnplistar = jasmine.createSpyObj('ListarEnpacotamentosService', ['obterEnpacotamentos']);;
    let serviceEntListar = jasmine.createSpyObj('ListarEntregasServico', ['obterEntregas']);;
    let component: CriarEnpacotamentosComponent;

    let enpacotamentos = {
      domainId: domainId,
      entrega: entrega,
      matricula : matricula,
      tempoColocacao: tempoColocacao,
      tempoRetirada: tempoRetirada,
      coordenadaX: coordenadaX,
      coordenadaY: coordenadaY,
      coordenadaZ: coordenadaZ,
    } as EnpacotamentoDto;

    let entregaLista: EntregaDTO[] = [
      {
          identificador:"002",
          data : "10/12/2022",
          peso_entrega :10,
          id_armazem : "005",
          tempo_colocacao: 10,
          tempo_retirada: 10
      },
      {
          identificador:"003",
          data : "10/12/2022",
          peso_entrega :10,
          id_armazem : "005",
          tempo_colocacao: 10,
          tempo_retirada: 10
      },
      {
          identificador:"004",
          data : "10/12/2022",
          peso_entrega :10,
          id_armazem : "005",
          tempo_colocacao: 10,
          tempo_retirada: 10
      }
  ]

  let enpacotamentoDto = [
      {
          domainId: -1,
          matricula: "CA-10-10",
          entrega: "001",
          tempoColocacao: 2,
          tempoRetirada: 4,
          coordenadaX: 3,
          coordenadaY: 5,
          coordenadaZ: 6,
      },
      {
          domainId: -1,
          matricula: "CA-10-10",
          entrega: "005",
          tempoColocacao: 5,
          tempoRetirada: 6,
          coordenadaX: 4,
          coordenadaY: 3,
          coordenadaZ: 1,
      },
      {
          domainId: -1,
          matricula: "CA-10-10",
          entrega: "002",
          tempoColocacao: 2,
          tempoRetirada: 4,
          coordenadaX: 2,
          coordenadaY: 5,
          coordenadaZ: 3,
      }
    ]

    beforeEach(() => {
        serviceEnplistar.obterEnpacotamentos.and.returnValue(of(enpacotamentoDto));
        serviceEntListar.obterEntregas.and.returnValue(of(entregaLista));

        component = new CriarEnpacotamentosComponent(serviceEntListar, serviceEnplistar, service);

        component.profileForm.controls["entrega"].setValue(entrega);
        component.profileForm.controls["matricula"].setValue(matricula);
        component.profileForm.controls["tempoColocacao"].setValue(tempoColocacao);
        component.profileForm.controls["tempoRetirada"].setValue(tempoRetirada);
        component.profileForm.controls["coordenadaZ"].setValue(coordenadaZ);
        component.profileForm.controls["coordenadaX"].setValue(coordenadaX);
        component.profileForm.controls["coordenadaY"].setValue(coordenadaY);
    });
    

    it('deve receber lista de outros agregados e filtrar', () => {
      component.ngOnInit();

      component.filtrarEntregas();

      expect(component.entregas.length).toBe(3);
      expect(component.enpacotamentos.length).toBe(3);
      expect(component.entregasFiltradas.length).toBe(2);
    });

    it('deve avisar sucesso', () => {
        
      service.criarEnpacotamento.and.returnValue(of(enpacotamentos));


      component.criarEnpacotamento();

      expect(component.sucesso).toBeTruthy();
    });

    it('se não houver resposta não deve atualizar', () => {

        service.criarEnpacotamento.and.returnValue(of());

        component.criarEnpacotamento();

        expect(component.sucesso).toBeFalse();
    });
});
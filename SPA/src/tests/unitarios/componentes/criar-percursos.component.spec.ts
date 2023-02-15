// @ts-nocheck
import { CriarPercursosService } from 'src/app/servicos/criar-percursos.service';
import { of } from 'rxjs';
import { CriarPercursosComponent } from 'src/app/criar-percursos/criar-percursos.component';
import IPercursoDTO from 'src/app/interfaces/IPercursoDTO';
import { ListarArmazensServico } from 'src/app/servicos/listar-armazens.service';
import { ArmazemDTO } from 'src/app/interfaces/armazemDto';
 
describe('CriarEntregasComponent', () => {
    const domainId = 1;
    const armazemOrigem = "M01";
    const armazemDestino = "M02";
    const distancia = 80;
    const tempoBase = 190;
    const tempoExtra = 0;
    const energiaGasta = 52;

    let service = jasmine.createSpyObj('CriarPercursosService', ['criarPercurso']);;
    let armazem_service = jasmine.createSpyObj('ListarArmazensServico', ['obterArmazensAtivos']);;
    let component: CriarPercursosComponent;

    let percurso = {
      id: "1",
      domainId: domainId,
      armazemOrigem: armazemOrigem,
      armazemDestino: armazemDestino,
      distancia: distancia,
      tempoBase: tempoBase,
      tempoExtra: tempoExtra,
      energiaGasta: energiaGasta,
    } as IPercursoDTO;

    let armazemLista: ArmazemDTO[] = [
      {
          identificador: "001",
          designacao: "designacao1",
          endereco: "end,end,1111-111",
          latitude: 10, 
          longitude: 10,
          altitude: 10,
          ativo: true
      },
      {
          identificador: "002",
          designacao: "designacao2",
          endereco: "end,end,2222-222",
          latitude: 10, 
          longitude: 10,
          altitude: 10,
          ativo: true
      },
      {
          identificador: "003",
          designacao: "designacao3",
          endereco: "end,end,333-333",
          latitude: 10, 
          longitude: 10,
          altitude: 10,
          ativo: false
      }
  ]


    beforeEach(() => {
        spyOn(window, "confirm").and.returnValue(true);

        armazem_service.obterArmazensAtivos.and.returnValue(of(armazemLista));

        component = new CriarPercursosComponent(armazem_service, service);

        component.percursoForm.controls["armazemOrig"].setValue(armazemOrigem);
        component.percursoForm.controls["armazemDest"].setValue(armazemDestino);
        component.percursoForm.controls["distancia"].setValue(distancia);
        component.percursoForm.controls["energia"].setValue(energiaGasta);
        component.percursoForm.controls["tempo"].setValue(tempoBase);
        component.percursoForm.controls["tempoExtra"].setValue(tempoExtra);
    });

    
    it('deve receber lista de outros agregados', () => {
      component.ngOnInit();

      expect(component.listaArmazens.length).toBe(3);
    });
    
    it('deve avisar sucesso', () => {
        
      service.criarPercurso.and.returnValue(of(percurso));


      component.criarPercurso();

      expect(component.sucesso).toBeTruthy();
    });

    it('se não houver resposta não deve atualizar', () => {
        service.criarPercurso.and.returnValue(of());

        component.criarPercurso();

        expect(component.sucesso).toBeFalse();
    });
});
// @ts-nocheck
import { ListarPercursosComponent } from 'src/app/listar-percursos/listar-percursos.component';
import { of } from 'rxjs';
import { ListarPercursosService } from 'src/app/servicos/listar-percursos.service';

describe('CriarArmazensComponente', () => {

    let listarService: ListarPercursosService;
    let component: ListarPercursosComponent;

    let percursoLista = [
      {
          id: "1",
          domainId: 1,
          armazemOrigem: "M01",
          armazemDestino: "M02",
          distancia: 80,
          tempoBase: 190,
          tempoExtra: 0,
          energiaGasta: 52
      },
      {
          id: "2",
          domainId: 2,
          armazemOrigem: "M01",
          armazemDestino: "M02",
          distancia: 80,
          tempoBase: 190,
          tempoExtra: 0,
          energiaGasta: 52
      },
      {
          id: "3",
          domainId: 3,
          armazemOrigem: "M01",
          armazemDestino: "M02",
          distancia: 80,
          tempoBase: 190,
          tempoExtra: 0,
          energiaGasta: 52
      }
  ]

    let httplistarSpy:any = jasmine.createSpyObj('HttpClient', ['get']);

    beforeEach(() => {
        listarService = new ListarPercursosService(httplistarSpy);


        component = new ListarPercursosComponent(listarService);
    });
    

    it('deve conseguir criar um armazem com sucesso', () => {
        httplistarSpy.get.and.returnValue(of({
            count: 3,
            lista: percursoLista,
        }));
        component.ngOnInit();

        expect(component.listaPercursosDto.length).toEqual(3);
        expect(component.countTotal).toEqual(3);
        expect(component.numTotalPaginas).toEqual(1);
        expect(component.btnPrevDesativado).toBeTruthy;
        expect(component.btnProxDesativado).toBeTruthy;
    });
});
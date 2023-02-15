// @ts-nocheck
import { ListarEntregasComponent } from 'src/app/listar-entregas/listar-entregas.component';
import { of } from 'rxjs';
import { ListarEntregasServico } from 'src/app/servicos/listar-entregas';
import { ArmazemDTO } from 'src/app/interfaces/armazemDto';
import { EntregaDTO } from 'src/app/interfaces/entregaDTO';
import { ListarArmazensServico } from 'src/app/servicos/listar-armazens.service';
import { OrdenarEntregasService } from 'src/app/servicos/ordenar.service';
 
describe('CriarArmazensComponente', () => {

    let listarEntregaService = jasmine.createSpyObj('ListarEntregasServico', ['obterEntregas']);
    let listarArmazemService = jasmine.createSpyObj('ListarArmazensServico', ['obterArmazensAtivos']);
    let ordenarEntregaService = jasmine.createSpyObj('OrdenarEntregasService', ['OrdenarPorAtributo']);

    let component: ListarEntregasComponent;

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
          identificador: "005",
          designacao: "designacao3",
          endereco: "end,end,3333-333",
          latitude: 10, 
          longitude: 10,
          altitude: 10,
          ativo: false
      }
    ]

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
          id_armazem : "002",
          tempo_colocacao: 10,
          tempo_retirada: 10
      },
      {
          identificador:"004",
          data : "10/12/2022",
          peso_entrega :10,
          id_armazem : "001",
          tempo_colocacao: 10,
          tempo_retirada: 10
      }
    ]

    beforeEach(() => {
        listarArmazemService.obterArmazensAtivos.and.returnValue(of(armazemLista));
        listarEntregaService.obterEntregas.and.returnValue(of(entregaLista));
        ordenarEntregaService.OrdenarPorAtributo.and.returnValue(of(entregaLista));

        component = new ListarEntregasComponent(listarEntregaService, listarArmazemService, ordenarEntregaService);
    });
    

    it('deve conseguir criar um armazem com sucesso', () => {
        component.ngOnInit();

        expect(component.backup.length).toEqual(3);
        expect(component.armazens.length).toEqual(3);

        component.idFilter = "002";
        component.filter();

        expect(component.entregas.length).toEqual(1);

        component.idFilter = "";
        component.dataInicioFilter = "2022-12-05"
        component.dataFimFilter = "2022-12-15"
        component.filter();
        
        expect(component.entregas.length).toEqual(3);
    });
});
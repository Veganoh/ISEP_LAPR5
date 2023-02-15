// @ts-nocheck
import { ListarArmazensServico } from 'src/app/servicos/listar-armazens.service';
import { ArmazemDTO } from 'src/app/interfaces/armazemDto';
import { ArmazemMap } from 'src/app/mappers/armazemMap';
import { of } from 'rxjs';
import { ListarArmazensComponent } from 'src/app/listar-armazens/listar-armazens.component';
import { InibirArmazensService } from 'src/app/servicos/inibir-armazens.service';
 
describe('CriarArmazensComponente', () => {

    let listarService = jasmine.createSpyObj('ListarArmazensServico', ['obterArmazens']);;
    let inibirService = jasmine.createSpyObj('InibirArmazensService', ['inibirOuAtivarArmazem']);;
    let component: ListarArmazensComponent;

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
            endereco: "end,end,3333-333",
            latitude: 10, 
            longitude: 10,
            altitude: 10,
            ativo: false
        }
    ];


    beforeEach(() => {
        component = new ListarArmazensComponent(listarService, inibirService);
    });
    

    it('deve conseguir criar um armazem com sucesso', () => {
        
        listarService.obterArmazens.and.returnValue(of(armazemLista));

        component.popularLista();

        expect(component.backup.length).toEqual(3);

        component.idFilter = "001";

        component.filter();

        expect(component.armazens.length).toEqual(1);

        component.idFilter = "";
        component.designacaoFilter = "designacao2";

        expect(component.armazens.length).toEqual(1);
    });

    it('se não houver resposta não deve atualizar', () => {
        let armazemDto = armazemLista[0];
        let armazem = ArmazemMap.toDomain(armazemDto);
        armazemDto.ativo = false;

        listarService.obterArmazens.and.returnValue(of(armazemLista));
        inibirService.inibirOuAtivarArmazem.and.returnValue(of(armazemDto));

        component.popularLista();

        expect(component.armazens.length).toEqual(3);

        component.InibirOuAtivarArmazem(armazem);

        expect(component.armazens[0].isAtivo).toBeFalse
    });
});
// @ts-nocheck
import { ListarCamioesComponent } from 'src/app/listar-camioes/listar-camioes.component';
import { of } from 'rxjs';
import { ListarCamioesServico } from 'src/app/servicos/listar-camioes.service';
import { InibirCamioesService } from 'src/app/servicos/inibir-camioes.service';
 
describe('CriarArmazensComponente', () => {

    let listarService: ListarCamioesServico;
    let inibirservice: InibirCamioesService;
    let component: ListarCamioesComponent;

    let camiaoLista = [
      {
          "id": "AA-00-00", 
          "tara": 800,
          "capacidadeCargaTotal": 1200,
          "camiaoBateria": 80,
          "autonomiaCamiao": 900,
          "carregamentoLento": 50,
          "carregamentoRapido": 10,
          ativo: true,
      },
      {
          "id": "BB-00-00", 
          "tara": 800,
          "capacidadeCargaTotal": 1200,
          "camiaoBateria": 80,
          "autonomiaCamiao": 900,
          "carregamentoLento": 50,
          "carregamentoRapido": 10,
          ativo: true,
      },
      {
          "id": "CC-00-00", 
          "tara": 800,
          "capacidadeCargaTotal": 1200,
          "camiaoBateria": 80,
          "autonomiaCamiao": 900,
          "carregamentoLento": 50,
          "carregamentoRapido": 10,
          ativo: true,
      }
    ]

    let httplistarSpy:any = jasmine.createSpyObj('HttpClient', ['get']);
    let httplistarSpyInibir:any = jasmine.createSpyObj('HttpClient', ['patch']);

    beforeEach(() => {
        listarService = new ListarCamioesServico(httplistarSpy);
        inibirservice = new InibirCamioesService(httplistarSpyInibir);

        component = new ListarCamioesComponent(listarService);
    });
    

    it('deve conseguir criar um armazem com sucesso', () => {
        httplistarSpy.get.and.returnValue(of(camiaoLista));
        component.ngOnInit();

        expect(component.backup.length).toEqual(3);

        component.idFilter = "AA-00-00";
        component.filter();

        expect(component.camioes.length).toEqual(1);
    });
});
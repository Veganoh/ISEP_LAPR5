// @ts-nocheck
import { ListarEnpacotamentosComponent } from 'src/app/listar-enpacotamentos/listar-enpacotamentos.component';
import { of } from 'rxjs';
import { ListarEnpacotamentosService } from 'src/app/servicos/listar-enpacotamentos.service';
 
describe('CriarArmazensComponente', () => {

    let listarService: ListarEnpacotamentosService;
    let component: ListarEnpacotamentosComponent;

    let enpacotamentoDto = [
        {
            domainId: -1,
            matricula: "CA-10-10",
            tempoColocacao: 2,
            tempoRetirada: 4,
            coordenadaX: 3,
            coordenadaY: 5,
            coordenadaZ: 6,
        },
        {
            domainId: -1,
            matricula: "CA-10-10",
            tempoColocacao: 5,
            tempoRetirada: 6,
            coordenadaX: 4,
            coordenadaY: 3,
            coordenadaZ: 1,
        },
        {
            domainId: -1,
            matricula: "CA-10-10",
            tempoColocacao: 2,
            tempoRetirada: 4,
            coordenadaX: 2,
            coordenadaY: 5,
            coordenadaZ: 3,
        }

    ]

    let httplistarSpy:any = jasmine.createSpyObj('HttpClient', ['get']);

    beforeEach(() => {
        listarService = new ListarEnpacotamentosService(httplistarSpy);


        component = new ListarEnpacotamentosComponent(listarService);
    });
    

    it('deve conseguir criar um armazem com sucesso', () => {
        httplistarSpy.get.and.returnValue(of({
            count: 3,
            lista: enpacotamentoDto,
        }));
        component.ngOnInit();

        expect(component.listaEnpacotamentosDto.length).toEqual(3);
        expect(component.backupEnpacotamentosDto.length).toEqual(3);
        expect(component.countTotal).toEqual(3);
        expect(component.numTotalPaginas).toEqual(1);
        expect(component.btnPrevDesativado).toBeTruthy;
        expect(component.btnProxDesativado).toBeTruthy;
    });
});
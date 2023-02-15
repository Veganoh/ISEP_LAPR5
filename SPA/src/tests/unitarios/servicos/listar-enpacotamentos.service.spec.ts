// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 
import config from 'config';
import { ListarEnpacotamentosService } from 'src/app/servicos/listar-enpacotamentos.service';
import { EnpacotamentoDto } from 'src/app/interfaces/enpacotamentoDto';
import { of } from 'rxjs';
 
describe('ListarEnpacotamentosService', () => {
  
    let httpTestingController: HttpTestingController;
    let service: ListarEnpacotamentosService;
    
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

    it('should get', () => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
    
        httpTestingController = TestBed.get(HttpTestingController);
    
        service = TestBed.get(ListarEnpacotamentosService);

        service.obterEnpacotamentos().subscribe();
    
        const testRequest = httpTestingController.expectOne(config.logistica_url + "/api/Enpacotamentos");
         // @ts-ignore
        expect(testRequest.request.method).toEqual('GET');

        httpTestingController.verify();
    });

    it('should get', () => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
    
        httpTestingController = TestBed.get(HttpTestingController);
    
        service = TestBed.get(ListarEnpacotamentosService);

        service.obterEnpacotamentosPagina(2, 15).subscribe();
    
        const testRequest = httpTestingController.expectOne(`${config.logistica_url}/api/Enpacotamentos/pagina?pag=2&num=15`);
        // @ts-ignore
        expect(testRequest.request.method).toEqual('GET');

        httpTestingController.verify();
  });

  it('deve receber uma lista de enpacotamentos', () => {

    let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    service = new ListarEnpacotamentosService(httpClientSpy);

    httpClientSpy.get.and.returnValue(of(enpacotamentoDto));

    service.obterEnpacotamentos().subscribe((enp) => {
        expect(enp.length).toEqual(3)});
  });

  it('deve receber uma de enpacotamentos paginados', () => {

    let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    service = new ListarEnpacotamentosService(httpClientSpy);

    httpClientSpy.get.and.returnValue(of({
        count: 3,
        lista: enpacotamentoDto,
    }));

    service.obterEnpacotamentosPagina(1, 3).subscribe((enp) => {
        expect(enp.lista.length).toEqual(3)
        expect(enp.count).toEqual(3)});
  });
});

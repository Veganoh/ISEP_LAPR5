// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 
import config from 'config';
import { OrdenarEntregasService } from 'src/app/servicos/ordenar.service';
import { EntregaDTO } from 'src/app/interfaces/entregaDTO';
import { of } from 'rxjs';
 
describe('OrdenarEntregasService', () => {
  
    let httpTestingController: HttpTestingController;
    let service: OrdenarEntregasService;
    
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

    it('should get', () => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
    
        httpTestingController = TestBed.get(HttpTestingController);
    
        service = TestBed.get(OrdenarEntregasService);

        service.OrdenarPorAtributo("v0").subscribe();
    
        const testRequest = httpTestingController.expectOne(config.gestao_armazens_url + "/api/Entregas/sortBy/atribute/");
       
        expect(testRequest.request.method).toEqual('GET');

        httpTestingController.verify();
    });

    it('should get', () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        httpTestingController = TestBed.get(HttpTestingController);

        service = TestBed.get(OrdenarEntregasService);


        service.OrdenarPorAtributo("v1").subscribe();
    
        const testRequest = httpTestingController.expectOne(config.gestao_armazens_url + "/api/Entregas/sortBy/atribute/v1");
        
        expect(testRequest.request.method).toEqual('GET');

        httpTestingController.verify();
    });

    it('deve receber uma lista de entrgas', () => {

        let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    
        service = new OrdenarEntregasService(httpClientSpy);
    
        httpClientSpy.get.and.returnValue(of(entregaLista));
    
        service.OrdenarPorAtributo("v0").subscribe((ent) => {
            expect(ent.length).toEqual(3)});
    });
});
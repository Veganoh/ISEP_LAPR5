// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 
import { ListarArmazensServico } from 'src/app/servicos/listar-armazens.service';
import { ArmazemDTO } from 'src/app/interfaces/armazemDto';
import { ArmazemMap } from 'src/app/mappers/armazemMap';
import config from 'config';
import { of } from 'rxjs';
 
describe('ListarArmazensServico', () => {
  
    let httpTestingController: HttpTestingController;
    let service: ListarArmazensServico;

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
    
    it('should get', () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
    
        httpTestingController = TestBed.get(HttpTestingController);
    
        service = TestBed.get(ListarArmazensServico);

        service.obterArmazens().subscribe();
    
        const testRequest = httpTestingController.expectOne(config.gestao_armazens_url + "/api/Armazens");
         // @ts-ignore
        expect(testRequest.request.method).toEqual('GET');

        httpTestingController.verify();
    });

    it('should get', () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
    
        httpTestingController = TestBed.get(HttpTestingController);
    
        service = TestBed.get(ListarArmazensServico);


        service.obterArmazensAtivos().subscribe();
    
        const testRequest = httpTestingController.expectOne(config.gestao_armazens_url + "/api/Armazens/Ativos");
         // @ts-ignore
        expect(testRequest.request.method).toEqual('GET');~

        httpTestingController.verify();
    });

    it('deve receber uma lista de armazens', () => {

        let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    
        service = new ListarArmazensServico(httpClientSpy);
    
        httpClientSpy.get.and.returnValue(of(armazemLista));
    
        service.obterArmazens().subscribe((arm) => {
            expect(arm.length).toEqual(3)});
    });

    it('deve receber uma lista de armazens ativos', () => {

        let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    
        service = new ListarArmazensServico(httpClientSpy);

        let armazenAtivos: ArmazemDTO[] = [];
        armazemLista.forEach(element => {
            if(element.ativo == true) armazenAtivos.push(element);
        });

        httpClientSpy.get.and.returnValue(of(armazenAtivos));
    
        service.obterArmazensAtivos().subscribe((arm) => {
            expect(arm.length).toEqual(2)
            arm.forEach(element => {
                expect(element.ativo).toEqual(true)
            });
        });

    });
});

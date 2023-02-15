// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 
import config from 'config';
import { ListarPercursosService } from 'src/app/servicos/listar-percursos.service';
import { of } from 'rxjs';
 
describe('ListarPercursosService', () => {
  
    let httpTestingController: HttpTestingController;
    let service: ListarPercursosService;
    
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
    
    it('should get', () => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
    
        httpTestingController = TestBed.get(HttpTestingController);
    
        service = TestBed.get(ListarPercursosService);

        service.listarPercursos(2,15,"001","002").subscribe();
    
        const testRequest = httpTestingController.expectOne(`${config.logistica_url}/api/Percursos/pagina?pag=2&num=15&orig=001&dest=002`);
         // @ts-ignore
        expect(testRequest.request.method).toEqual('GET');

        httpTestingController.verify();
    });

    it('deve receber uma lista de  percursos paginados', () => {

        let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    
        service = new ListarPercursosService(httpClientSpy);
    
        httpClientSpy.get.and.returnValue(of({
            count: 3,
            lista: percursoLista,
        }));
    
        service.listarPercursos(2,15,"001","013").subscribe((ent) => {
            expect(ent.lista.length).toEqual(3);
            expect(ent.count).toEqual(3)
        });
    });
});

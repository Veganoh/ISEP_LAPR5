// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 
import config from 'config';
import { ObterPlaneamentoService } from 'src/app/servicos/obter-planeamento.service';
import { CamiaoId } from 'src/app/domain/camiao/camiaoId';
import { NumeroAlgoritmo } from 'src/app/domain/planeamento/numeroAlgoritmo';
import { PlaneamentoRequest } from 'src/app/domain/planeamento/planeamentoRequest';
import { PlaneamentoMap } from 'src/app/mappers/planeamentoMap';
import { Rota } from 'src/app/domain/planeamento/rota';
import { of } from 'rxjs';
 
describe('ObterPlaneamentoService', () => {
  
    let httpTestingController: HttpTestingController;
    let service: ObterPlaneamentoService;

    let camiaoID = new CamiaoId("CA-10-10");
    let numeroAlgoritmo = NumeroAlgoritmo.cria(1).getValue();
    let data = new Date(2022-12-10);
    let planeamento = PlaneamentoRequest.cria({
      camiao: camiaoID,
      data : data,
      algoritmo: numeroAlgoritmo
    }).getValue();
    
    let rotaDto = {camiao: "CA-10-10",
        data : "2022-12-10",
        rota: ["005", "007", "005"]
    };
    
    it('should post', () => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
    
        httpTestingController = TestBed.get(HttpTestingController);
    
        service = TestBed.get(ObterPlaneamentoService);

        service.obterPlaneamento(planeamento).subscribe();
    
        const testRequest = httpTestingController.expectOne(config.logistica_url + "/api/planeamento");
         // @ts-ignore
        expect(testRequest.request.method).toEqual('POST');

        httpTestingController.verify();
    });

    it('deve receber uma ou mais rotas', () => {

        let httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

        service = new ObterPlaneamentoService(httpClientSpy);

        httpClientSpy.post.and.returnValue(of(rotaDto));

        service.obterPlaneamento(planeamento).subscribe((rot) => {
        expect(rot).toEqual(rotaDto)});
    });
});


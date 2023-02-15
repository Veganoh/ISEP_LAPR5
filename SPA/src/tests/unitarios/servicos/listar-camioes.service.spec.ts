// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 
import config from 'config';
import { ListarCamioesServico } from 'src/app/servicos/listar-camioes.service';
import { of } from 'rxjs';
 
describe('ListarCamioesServico', () => {
  
    let httpTestingController: HttpTestingController;
    let service: ListarCamioesServico;

    let camiaoLista = [
        {
            "id": "AA-00-00", 
            "tara": 800,
            "capacidadeCargaTotal": 1200,
            "camiaoBateria": 80,
            "autonomiaCamiao": 900,
            "carregamentoLento": 50,
            "carregamentoRapido": 10,
        },
        {
            "id": "BB-00-00", 
            "tara": 800,
            "capacidadeCargaTotal": 1200,
            "camiaoBateria": 80,
            "autonomiaCamiao": 900,
            "carregamentoLento": 50,
            "carregamentoRapido": 10,
        },
        {
            "id": "CC-00-00", 
            "tara": 800,
            "capacidadeCargaTotal": 1200,
            "camiaoBateria": 80,
            "autonomiaCamiao": 900,
            "carregamentoLento": 50,
            "carregamentoRapido": 10,
        }
    ]
    
    it('should get', () => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
    
        httpTestingController = TestBed.get(HttpTestingController);
    
        service = TestBed.get(ListarCamioesServico);

        service.obterCamioes().subscribe();
    
        const testRequest = httpTestingController.expectOne(config.logistica_url + "/api/camiao");
         // @ts-ignore
        expect(testRequest.request.method).toEqual('GET');

        httpTestingController.verify();
    });

    it('deve receber uma lista de camioes', () => {

        let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    
        service = new ListarCamioesServico(httpClientSpy);

        httpClientSpy.get.and.returnValue(of(camiaoLista));
    
        service.obterCamioes().subscribe((cam) => {
            expect(cam.length).toEqual(3)});
    });
});
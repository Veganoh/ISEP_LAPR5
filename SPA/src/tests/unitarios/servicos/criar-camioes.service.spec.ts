// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 
import { CriarCamioesService } from 'src/app/servicos/criar-camioes.service';
import config from 'config';
import { CamiaoDTO } from 'src/app/interfaces/camiaoDto';
import { CamiaoMap } from 'src/app/mappers/camiaoMap';
import { of } from 'rxjs';
 
describe('CriarCamioesService', () => {

  let httpTestingController: HttpTestingController;
  let service: CriarCamioesService;

  let camiaoDto = {
    "id": "AA-00-00", 
    "tara": 800,
    "capacidadeCargaTotal": 1200,
    "camiaoBateria": 80,
    "autonomiaCamiao": 900,
    "carregamentoLento": 50,
    "carregamentoRapido": 10,
    "ativo": true
  } as CamiaoDTO;
        
  let camiao = CamiaoMap.toDomain(camiaoDto);
  
  it('should send post', () => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);

    service = TestBed.get(CriarCamioesService);

    
    service.criarCamiao(camiao).subscribe();
  
    const testRequest = httpTestingController.expectOne(config.logistica_url + "/api/camiao");
    // @ts-ignore
    expect(testRequest.request.method).toEqual('POST');

    httpTestingController.verify();
  });

  it('deve receber um camiao', () => {

    let httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    service = new CriarCamioesService(httpClientSpy);

    httpClientSpy.post.and.returnValue(of(camiaoDto));

    service.criarCamiao(camiao).subscribe((cam) => {
        expect(cam.id).toEqual("AA-00-00")});
  });
});
// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 
import { CriarEnpacotamentosService } from 'src/app/servicos/criar-enpacotamentos.service';
import config from 'config';
import { EnpacotamentoEntrega } from 'src/app/domain/enpacotamento/empacotamentoEntrega';
import { Enpacotamento } from 'src/app/domain/enpacotamento/enpacotamento';
import { EnpacotamentoCoordenadas } from 'src/app/domain/enpacotamento/enpacotamentoCoordenadas';
import { EnpacotamentoTempos } from 'src/app/domain/enpacotamento/enpacotamentoTempos';
import { CamiaoId } from 'src/app/domain/camiao/camiaoId';
import { EnpacotamentoDto } from 'src/app/interfaces/enpacotamentoDto';
import { EnpacotamentoMap } from 'src/app/mappers/enpacotamentoMap';
import { of } from 'rxjs';
 
describe('CriarEnpacotamentosService', () => {
  let entrega = EnpacotamentoEntrega.cria("alt").getValue();
  let coordenadas = EnpacotamentoCoordenadas.cria(2,5,7).getValue();
  let tempos = EnpacotamentoTempos.cria(1,2).getValue();
  let matricula = new CamiaoId("CA-10-10");
  let enpacotamento: Enpacotamento = Enpacotamento.cria({entrega,matricula,tempos,coordenadas}).getValue();
  let enpacotamentoDto: EnpacotamentoDto = EnpacotamentoMap.toDTO(enpacotamento);


    let httpTestingController: HttpTestingController;
    let service: CriarEnpacotamentosService;
    
    
    it('should post', () => {
      
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
    
      httpTestingController = TestBed.get(HttpTestingController);
    
      service = TestBed.get(CriarEnpacotamentosService);
      service.criarEnpacotamento(enpacotamento).subscribe();
    
      const testRequest = httpTestingController.expectOne(config.logistica_url +  "/api/Enpacotamentos");
      // @ts-ignore
      expect(testRequest.request.method).toEqual('POST');

      httpTestingController.verify();
    });

    it('deve receber um enpacotamento', () => {

      let httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
  
      service = new CriarEnpacotamentosService(httpClientSpy);
  
      httpClientSpy.post.and.returnValue(of(enpacotamentoDto));
  
      service.criarEnpacotamento(enpacotamento).subscribe((enp) => {
          expect(enp).toEqual(enpacotamentoDto)});
    });
});

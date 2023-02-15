// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 
import { CriarEntregasServico } from 'src/app/servicos/criar-entregas.service';
import config from 'config';
import { Armazem_ID } from 'src/app/domain/entrega/armazem_id';
import { Data } from 'src/app/domain/entrega/data';
import { Entrega } from 'src/app/domain/entrega/entrega';
import { EntregaID } from 'src/app/domain/entrega/entregaId';
import { PesoEntrega } from 'src/app/domain/entrega/peso_entrega';
import { TempoColacacao } from 'src/app/domain/entrega/tempo_colocacao';
import { TempoRetirada } from 'src/app/domain/entrega/tempo_retirada';
import { EntregaMap } from 'src/app/mappers/entregaMap';
import { of } from 'rxjs';
 
describe('CriarEntregasServico', () => {
    const validPeso = 10;
    const validTempoCol = 10;
    const validTempoRet = 10;
    const validEntId = "asd";
    const validArmID = "As5";
    const validData = "10/12/2022";
  
    let httpTestingController: HttpTestingController;
    let service: CriarEntregasServico;
    
    let props = {
      data : Data.create(validData).getValue(),
      peso : PesoEntrega.create(validPeso).getValue(),
      arm_id : Armazem_ID.create(validArmID).getValue(),
      tempo_col: TempoColacacao.create(validTempoCol).getValue(),
      tempo_ret: TempoRetirada.create(validTempoRet).getValue()
    }

    let entrega = Entrega.cria(props, new EntregaID(validEntId)).getValue();

    let entregaDto = EntregaMap.toDTO(entrega);

    it('should post', () => {

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
  
      httpTestingController = TestBed.get(HttpTestingController);
  
      
      service = TestBed.get(CriarEntregasServico);
      
      service.criarEntrega(entrega).subscribe();
    
      const testRequest = httpTestingController.expectOne(config.gestao_armazens_url + "/api/Entregas");
      // @ts-ignore
      expect(testRequest.request.method).toEqual('POST');

      httpTestingController.verify();
    });

    it('deve receber uma entrega', () => {

      let httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
  
      service = new CriarEntregasServico(httpClientSpy);
  
      httpClientSpy.post.and.returnValue(of(entregaDto));
  
      service.criarEntrega(entrega).subscribe((enp) => {
          expect(enp.identificador).toEqual(validEntId)});
    });
});

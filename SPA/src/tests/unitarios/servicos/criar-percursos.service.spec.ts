// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 
import { CriarPercursosService } from 'src/app/servicos/criar-percursos.service';
import config from 'config';
import { PercursoMap } from 'src/app/mappers/PercursoMap';
import { of } from 'rxjs';
import { Percurso } from 'src/app/domain/percurso/percurso';
import IPercursoDTO from 'src/app/interfaces/IPercursoDTO';
 
describe('CriarPercursosService', () => {
  
    let httpTestingController: HttpTestingController;
    let service: CriarPercursosService;

    let percursoDTO = {
      id: "1",
      domainId: 1,
      armazemOrigem: "M01",
      armazemDestino: "M02",
      distancia: 80,
      tempoBase: 190,
      tempoExtra: 0,
      energiaGasta: 52
    } as IPercursoDTO;
    
    let percurso: Percurso = PercursoMap.toDomain(percursoDTO).getValue();
    
    it('should post', () => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
  
      httpTestingController = TestBed.get(HttpTestingController);
  
      service = TestBed.get(CriarPercursosService);
      
      
      service.criarPercurso(percurso).subscribe();
      
      const testRequest = httpTestingController.expectOne(config.logistica_url + "/api/Percursos");
      // @ts-ignore
      expect(testRequest.request.method).toEqual('POST');

      httpTestingController.verify();
    });


    it('deve receber um percurso', () => {

      let httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
  
      service = new CriarPercursosService(httpClientSpy);
  
      httpClientSpy.post.and.returnValue(of(percursoDTO));
  
      service.criarPercurso(percurso).subscribe((per) => {
          expect(per.id).toEqual("1")});
    });
});
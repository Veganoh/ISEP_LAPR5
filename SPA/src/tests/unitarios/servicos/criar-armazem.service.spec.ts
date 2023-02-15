// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 
import { CriarArmazensServico } from 'src/app/servicos/criar-armazens.service';
import { ArmazemDTO } from 'src/app/interfaces/armazemDto';
import { ArmazemMap } from 'src/app/mappers/armazemMap';
import config from 'config';
import { of } from 'rxjs';
 
describe('CriarArmazensServico', () => {
    const validAltidude = 10;
    const validLatitue = 10;
    const validLongitude = 10;
    const validDesignacao = "asd";
    const validID = "As5";
    const validEndereco = "aaa,aaa,1234-154";

    let httpTestingController: HttpTestingController;
    let service: CriarArmazensServico;

    let armazemDto = {
        identificador: validID,
        designacao: validDesignacao,
        endereco: validEndereco,
        latitude: validLatitue, 
        longitude: validLongitude,
        altitude: validAltidude,
        ativo: true
    } as ArmazemDTO
    
    let armazem = ArmazemMap.toDomain(armazemDto);

    it('should post', () => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
    
        httpTestingController = TestBed.get(HttpTestingController);
    
        service = TestBed.get(CriarArmazensServico);

        service.criarArmazem(armazem).subscribe();
    
        const testRequest = httpTestingController.expectOne(config.gestao_armazens_url + "/api/Armazens");
         // @ts-ignore
        expect(testRequest.request.method).toEqual('POST');

        httpTestingController.verify();
    });

    it('deve receber um armazem', () => {

        let httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    
        service = new CriarArmazensServico(httpClientSpy);

        httpClientSpy.post.and.returnValue(of(armazemDto));
            
        service.criarArmazem(armazem).subscribe((arm) => {
            expect(arm.identificador).toEqual(validID)});
    });
});
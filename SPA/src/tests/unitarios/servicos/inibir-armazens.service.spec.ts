// @ts-nocheck
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 
import { InibirArmazensService } from 'src/app/servicos/inibir-armazens.service';
import { ArmazemDTO } from 'src/app/interfaces/armazemDto';
import { ArmazemMap } from 'src/app/mappers/armazemMap';
import config from 'config';
import { of } from 'rxjs';
 
describe('InibirArmazensService', () => {
    const validAltidude = 10;
    const validLatitue = 10;
    const validLongitude = 10;
    const validDesignacao = "asd";
    const validID = "As5";
    const validEndereco = "aaa,aaa,1234-154";

    let httpTestingController: HttpTestingController;
    let service: InibirArmazensService;
    
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
    
    it('should patch', () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
    
        httpTestingController = TestBed.get(HttpTestingController);
    
        service = TestBed.get(InibirArmazensService);

        service.inibirOuAtivarArmazem(armazem).subscribe();
        
        const testRequest = httpTestingController.expectOne(config.gestao_armazens_url + `/api/Armazens/Inibir/${validID}`);
         // @ts-ignore
        expect(testRequest.request.method).toEqual('PATCH');
        httpTestingController.verify();
    });

    it('deve inibir um aramzem', () => {

        let httpClientSpy = jasmine.createSpyObj('HttpClient', ['patch']);
    
        service = new InibirArmazensService(httpClientSpy);
    
        armazemDto.ativo = false;
        httpClientSpy.patch.and.returnValue(of(armazemDto));
    
        service.inibirOuAtivarArmazem(armazem).subscribe((arm) => {
            expect(arm.ativo).toEqual(!armazem.isAtivo)});
    });
});

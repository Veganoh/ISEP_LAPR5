// @ts-nocheck
import { CriarArmazensServico } from 'src/app/servicos/criar-armazens.service';
import { ArmazemDTO } from 'src/app/interfaces/armazemDto';
import { ArmazemMap } from 'src/app/mappers/armazemMap';
import { of } from 'rxjs';
import { CriarArmazensComponent } from 'src/app/criar-armazens/criar-armazens.component';
import { HttpErrorResponse } from '@angular/common/http';
 
describe('CriarArmazensComponente', () => {
    const validAltidude = 10;
    const validLatitue = 10;
    const validLongitude = 10;
    const validDesignacao = "asd";
    const validID = "As5";
    const validEndereco = "aaa,aaa,1234-154";

    let service: CriarArmazensServico;
    let component: CriarArmazensComponent;

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

    let httpClientSpy:any = jasmine.createSpyObj('HttpClient', ['post']);

    beforeEach(() => {
        service = new CriarArmazensServico(httpClientSpy);

        component = new CriarArmazensComponent(service);

        component.profileForm.controls["identificador"].setValue(validID);
        component.profileForm.controls["designacao"].setValue(validDesignacao);
        component.profileForm.controls["endereco"].setValue(validEndereco);
        component.profileForm.controls["latitude"].setValue(validLatitue);
        component.profileForm.controls["longitude"].setValue(validLongitude);
        component.profileForm.controls["altitude"].setValue(validAltidude);
    });
    

    it('deve conseguir criar um armazem com sucesso', () => {
        
        httpClientSpy.post.and.returnValue(of(armazemDto));


        component.criarArmazem();

        expect(component.sucesso).toBeTruthy();
    });

    it('se não houver resposta não deve atualizar', () => {
          
        httpClientSpy.post.and.returnValue(of());

        component.criarArmazem();

        expect(component.sucesso).toBeFalse();
    });
});
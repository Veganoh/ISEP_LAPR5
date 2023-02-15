// @ts-nocheck
import { ObterPlaneamentoService } from 'src/app/servicos/obter-planeamento.service';
import { of } from 'rxjs';
import { ObterPlaneamentoComponent } from 'src/app/obter-planeamento/obter-planeamento.component';
 
describe('CriarArmazensComponente', () => {
    let service = jasmine.createSpyObj('ObterPlaneamentoService', ['obterPlaneamento']);
    let persisritService = jasmine.createSpyObj('PersistirPlaneamentoService', ['persistirPlaneamento']);
    let component: ObterPlaneamentoComponent;

    const camiao = "CA-10-10";
    const data = "2022-12-10";
    const rota = ["005", "007", "005"];

    let rotaDto = {
      camiao: camiao,
      data : data,
      rota: rota
    };


    beforeEach(() => {
        component = new ObterPlaneamentoComponent(service, persisritService);

        component.profileForm.controls["camiao"].setValue(camiao);
        component.profileForm.controls["data"].setValue(data);
        component.profileForm.controls["algoritmo"].setValue(2);
    });
    

    it('deve conseguir criar um armazem com sucesso', () => {
        
        service.obterPlaneamento.and.returnValue(of(rotaDto));
        persisritService.persistirPlaneamento.and.returnValue(of(rotaDto));

        expect(component).toBeTruthy();
    });

    it('se não houver resposta não deve atualizar', () => {
          
        service.obterPlaneamento.and.returnValue(of());
        persisritService.persistirPlaneamento.and.returnValue(of(rotaDto));


        component.obterPlaneamento();

        expect(component.rotas.length).toEqual(0);
    });
});
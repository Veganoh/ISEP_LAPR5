// @ts-nocheck
import { ObterPlaneamentoService } from 'src/app/servicos/obter-planeamento.service';
import { of } from 'rxjs';
import { ObterPlaneamentoComponent } from 'src/app/obter-planeamento/obter-planeamento.component';
import { PersistirPlaneamentoService } from 'src/app/servicos/persistir-planeamento.service';
 
describe('CriarArmazensComponente', () => {
    let service: ObterPlaneamentoService;
    let persisritService: PersistirPlaneamentoService;
    let component: ObterPlaneamentoComponent;

    const camiao = "CA-10-10";
    const data = "2022-12-10";
    const rota = ["005", "007", "005"];

    let rotaDto = {
      camiao: camiao,
      data : data,
      rota: rota
    };

    let httpClientSpy:any = jasmine.createSpyObj('HttpClient', ['post']);
    let httpPClientSpy:any = jasmine.createSpyObj('HttpClient', ['post']);

    beforeEach(() => {
        service = new ObterPlaneamentoService(httpClientSpy);
        persisritService = new PersistirPlaneamentoService(httpPClientSpy);

        component = new ObterPlaneamentoComponent(service, persisritService);

        component.profileForm.controls["camiao"].setValue(camiao);
        component.profileForm.controls["data"].setValue(data);
        component.profileForm.controls["algoritmo"].setValue(2);
    });
    

    it('deve conseguir criar um armazem com sucesso', () => {
        
        httpClientSpy.post.and.returnValue(of(rotaDto));
        httpPClientSpy.post.and.returnValue(of(rotaDto));

        expect(component).toBeTruthy();
    });

    it('se não houver resposta não deve atualizar', () => {
          
        httpClientSpy.post.and.returnValue(of());
        httpPClientSpy.post.and.returnValue(of(rotaDto));

        component.obterPlaneamento();

        expect(component.rotas.length).toEqual(0);
    });
});
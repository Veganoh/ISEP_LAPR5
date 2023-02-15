// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 
import config from 'config';
import { ListarEntregasServico } from 'src/app/servicos/listar-entregas';
import { of } from 'rxjs';
import { Entrega } from 'src/app/domain/entrega/entrega';
import { EntregaDTO } from 'src/app/interfaces/entregaDTO';
 
describe('ListarEntregasServico', () => {
  
    let httpTestingController: HttpTestingController;
    let service: ListarEntregasServico;
    
    let entregaLista: EntregaDTO[] = [
        {
            identificador:"002",
            data : "10/12/2022",
            peso_entrega :10,
            id_armazem : "005",
            tempo_colocacao: 10,
            tempo_retirada: 10
        },
        {
            identificador:"003",
            data : "10/12/2022",
            peso_entrega :10,
            id_armazem : "005",
            tempo_colocacao: 10,
            tempo_retirada: 10
        },
        {
            identificador:"004",
            data : "10/12/2022",
            peso_entrega :10,
            id_armazem : "005",
            tempo_colocacao: 10,
            tempo_retirada: 10
        }
    ]
    
        
    
    it('should get', () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
    
        httpTestingController = TestBed.get(HttpTestingController);
    
        service = TestBed.get(ListarEntregasServico);

        service.obterEntregas().subscribe();
    
        const testRequest = httpTestingController.expectOne(config.gestao_armazens_url + "/api/Entregas");
         // @ts-ignore
        expect(testRequest.request.method).toEqual('GET');

        httpTestingController.verify();
    });

    it('deve receber uma lista de entrgas', () => {

        let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    
        service = new ListarEntregasServico(httpClientSpy);
    
        httpClientSpy.get.and.returnValue(of(entregaLista));
    
        service.obterEntregas().subscribe((ent) => {
            expect(ent.length).toEqual(3)});
    });
});


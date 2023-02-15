// @ts-nocheck
import { CriarEntregasServico } from 'src/app/servicos/criar-entregas.service';
import { of } from 'rxjs';
import { CriarEntregasComponent } from 'src/app/criar-entregas/criar-entregas.component';
import { HttpErrorResponse } from '@angular/common/http';
import { EntregaDTO } from 'src/app/interfaces/entregaDTO';
 
describe('CriarEntregasComponent', () => {

    const validPeso = 10;
    const validTempoCol = 10;
    const validTempoRet = 10;
    const validEntId = "asd";
    const validArmID = "As5";
    const validData = "10/12/2022";

    let service: CriarEntregasServico;
    let component: CriarEntregasComponent;

    let entrega = {
      identificador: validEntId,
      data: validData,
      peso_entrega: validPeso,
      id_armazem: validArmID,
      tempo_colocacao: validTempoCol,
      tempo_retirada: validTempoRet,
    } as EntregaDTO;

    let httpClientSpy:any = jasmine.createSpyObj('HttpClient', ['post']);

    beforeEach(() => {
        service = new CriarEntregasServico(httpClientSpy);

        component = new CriarEntregasComponent(service);

        component.profileForm.controls["data"].setValue(validData);
        component.profileForm.controls["peso"].setValue(validPeso);
        component.profileForm.controls["arm_id"].setValue(validArmID);
        component.profileForm.controls["tempo_col"].setValue(validTempoCol);
        component.profileForm.controls["tempo_ret"].setValue(validTempoRet);
    });
    
    it('deve avisar sucesso', () => {
        
      httpClientSpy.post.and.returnValue(of(entrega));


      component.criarEntrega();

      expect(component.sucesso).toBeTruthy();
  });

  it('se não houver resposta não deve atualizar', () => {
        
      httpClientSpy.post.and.returnValue(of());

      component.criarEntrega();

      expect(component.sucesso).toBeFalse();
  });
});
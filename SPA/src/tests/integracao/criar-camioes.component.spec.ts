// @ts-nocheck
import { CriarCamioesService } from 'src/app/servicos/criar-camioes.service';
import { of } from 'rxjs';
import { CriarCamioesComponent } from 'src/app/criar-camioes/criar-camioes.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CamiaoDTO } from 'src/app/interfaces/camiaoDto';
 
describe('CriarCamioesComponent', () => {

    const validID = "AA-00-00";
    const validTara = 800;
    const validCapacidadeCargaTotal = 1200;
    const validCamiaoBateria = 80;
    const validAutonomiaCamiao = 900;
    const validCarregamentoLento = 50;
    const validCarregamentoRapido = 10;

    let service: CriarCamioesService;
    let component: CriarCamioesComponent;

    let camiaoDto = {
      id: validID,
      tara: validTara,
      capacidadeCargaTotal: validCapacidadeCargaTotal,
      camiaoBateria: validCamiaoBateria,
      autonomiaCamiao: validAutonomiaCamiao,
      carregamentoLento: validCarregamentoLento,
      carregamentoRapido: validCarregamentoRapido,
    } as CamiaoDTO;

    let httpClientSpy:any = jasmine.createSpyObj('HttpClient', ['post']);

    beforeEach(() => {
        service = new CriarCamioesService(httpClientSpy);

        component = new CriarCamioesComponent(service);

        component.profileForm.controls["id"].setValue(validID);
        component.profileForm.controls["tara"].setValue(validTara);
        component.profileForm.controls["capacidadeCargaTotal"].setValue(validCapacidadeCargaTotal);
        component.profileForm.controls["camiaoBateria"].setValue(validCamiaoBateria);
        component.profileForm.controls["autonomiaCamiao"].setValue(validAutonomiaCamiao);
        component.profileForm.controls["carregamentoLento"].setValue(validCarregamentoLento);
        component.profileForm.controls["carregamentoRapido"].setValue(validCarregamentoRapido);
    });
    

    it('deve conseguir criar um armazem com sucesso', () => {
        
        httpClientSpy.post.and.returnValue(of(camiaoDto));

        component.criarCamiao();

        expect(component.sucesso).toBeTruthy();
    });

    it('se não haver resposta não deve atualizar', () => {

        httpClientSpy.post.and.returnValue(of());

        component.criarCamiao();

        expect(component.sucesso).toBeFalse();
    });
});
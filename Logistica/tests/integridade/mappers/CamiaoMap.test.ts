import chai from 'chai';

import { CamiaoMap } from "../../../src/mappers/CamiaoMap";
import { Camiao } from "../../../src/domain/camiao/camiao";
import { Tara } from "../../../src/domain/camiao/camiaoTara";
import { CargaTotal } from "../../../src/domain/camiao/camiaoCargaTotal";
import { CamiaoBateria } from "../../../src/domain/camiao/camiaoBateria";
import { AutonomiaCamiao } from "../../../src/domain/camiao/camiaoAutonomia";
import { CarregamentoLento } from "../../../src/domain/camiao/camiaoCarregamentoLento";
import { CarregamentoRapido} from "../../../src/domain/camiao/camiaoCarregamentoRapido";
import { CamiaoAtivo } from '../../../src/domain/camiao/camiaoAtivo';

const expect = chai.expect;

describe('/Testes do CamiaoMap', () => {
    let tara = Tara.create(800).getValue();
    let capacidadeCargaTotal = CargaTotal.create(1200).getValue();
    let camiaoBateria = CamiaoBateria.create(80).getValue();
    let autonomiaCamiao = AutonomiaCamiao.create(900).getValue();
    let carregamentoLento = CarregamentoLento.create(50).getValue();
    let carregamentoRapido = CarregamentoRapido.create(10).getValue();
    let ativo = CamiaoAtivo.create(true).getValue();
    let camiao = Camiao.create({tara,capacidadeCargaTotal,camiaoBateria,autonomiaCamiao,carregamentoLento,carregamentoRapido,ativo});
    let camiaoDTO = CamiaoMap.toDTO(camiao.getValue());

    

    it('Verificar camiaoDTO válido',() => {
        expect(camiaoDTO).to.be.not.null;
    })

    it('Verificar camiaoDTO contêm o valor tara',() => {
        let esperado : number = 800;
        let obtido = camiaoDTO.tara;

        expect(esperado).to.be.equal(obtido);
    })

    it('Verificar camiaoDTO contêm o valor capacidadeCargaTotal',() => {
        let esperado : number = 1200;
        let obtido = camiaoDTO.capacidadeCargaTotal;

        expect(esperado).to.be.equal(obtido);
    })

    it('Verificar camiaoDTO contêm o valor camiaoBateria',() => {
        let esperado : number = 80;
        let obtido = camiaoDTO.camiaoBateria;

        expect(esperado).to.be.equal(obtido);
    })

    it('Verificar camiaoDTO contêm o valor autonomiaCamiao',() => {
        let esperado : number = 900;
        let obtido = camiaoDTO.autonomiaCamiao;

        expect(esperado).to.be.equal(obtido);
    })

    it('Verificar camiaoDTO contêm o valor carregamentoLento',() => {
        let esperado : number = 50;
        let obtido = camiaoDTO.carregamentoLento;

        expect(esperado).to.be.equal(obtido);
    })

    it('Verificar camiaoDTO contêm o valor carregamentoRapido',() => {
        let esperado : number = 10;
        let obtido = camiaoDTO.carregamentoRapido;

        expect(esperado).to.be.equal(obtido);
    })

    
});
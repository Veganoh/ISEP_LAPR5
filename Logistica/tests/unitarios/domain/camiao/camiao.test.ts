import 'reflect-metadata';

import { Camiao } from "../../../../src/domain/camiao/camiao";
import { Tara } from "../../../../src/domain/camiao/camiaoTara";
import { CargaTotal } from "../../../../src/domain/camiao/camiaoCargaTotal";
import { CamiaoBateria } from "../../../../src/domain/camiao/camiaoBateria";
import { AutonomiaCamiao } from "../../../../src/domain/camiao/camiaoAutonomia";
import { CarregamentoLento } from "../../../../src/domain/camiao/camiaoCarregamentoLento";
import { CarregamentoRapido} from "../../../../src/domain/camiao/camiaoCarregamentoRapido";
import { CamiaoAtivo } from '../../../../src/domain/camiao/camiaoAtivo';


describe('camiao unit test', function() {
    var expect = require('expect');
    let taraNumber : number = 200;
    let cargaTotalNumber : number = 600;
    let camiaoBateriaNumber : number = 80;
    let autonomiaCamiaoNumber : number = 100;
    let carregamentoLentoNumber : number = 40;
    let carregamentoRapidoNumber : number = 20;
    let ativoBoolean : boolean = true;

    let tara = Tara.create(taraNumber).getValue();
    let capacidadeCargaTotal : CargaTotal = CargaTotal.create(cargaTotalNumber).getValue();
    let camiaoBateria : CamiaoBateria = CamiaoBateria.create(camiaoBateriaNumber).getValue();
    let autonomiaCamiao : AutonomiaCamiao = AutonomiaCamiao.create(autonomiaCamiaoNumber).getValue();
    let carregamentoLento : CarregamentoLento = CarregamentoLento.create(carregamentoLentoNumber).getValue();
    let carregamentoRapido : CarregamentoRapido = CarregamentoRapido.create(carregamentoRapidoNumber).getValue();
    let ativo : CamiaoAtivo = CamiaoAtivo.create(ativoBoolean).getValue();

    
    it('create valid camiao', () => {
        let camiao = Camiao.create({
            tara: tara,
            capacidadeCargaTotal: capacidadeCargaTotal,
            camiaoBateria: camiaoBateria,
            autonomiaCamiao: autonomiaCamiao,
            carregamentoLento: carregamentoLento,
            carregamentoRapido: carregamentoRapido,
            ativo: ativo
        })
        expect(camiao.isSuccess).toEqual(true);
        expect(camiao.getValue().tara.value).toEqual(taraNumber);
        expect(camiao.getValue().capacidadeCargaTotal.value).toEqual(cargaTotalNumber);
        expect(camiao.getValue().camiaoBateria.value).toEqual(camiaoBateriaNumber);
        expect(camiao.getValue().autonomiaCamiao.value).toEqual(autonomiaCamiaoNumber);
        expect(camiao.getValue().carregamentoLento.value).toEqual(carregamentoLentoNumber);
        expect(camiao.getValue().carregamentoRapido.value).toEqual(carregamentoRapidoNumber);
        expect(camiao.getValue().ativo.isAtivo).toEqual(ativoBoolean);
    })
})

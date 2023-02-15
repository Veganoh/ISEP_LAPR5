import 'reflect-metadata';

import { CarregamentoRapido } from "../../../../src/domain/camiao/camiaoCarregamentoRapido";

describe('camiao carregamento rapido test', function(){
    var expect = require('expect');

    it('create valid carregamento rapido', () => {
        let carregamentoRapidoNumber : number = 200;
        let carregamentoRapido = CarregamentoRapido.create(carregamentoRapidoNumber);
        expect(carregamentoRapido.isSuccess).toEqual(true);
    })

    it('failed to create carregamento rapido', () => {
        let carregamentoRapidoNumber : number = -1;
        let carregamentoRapido = CarregamentoRapido.create(carregamentoRapidoNumber);
        expect(carregamentoRapido.error).toEqual("O carregamento rapido de um camiao nao pode ser nula ou negativa");
    })
})
import 'reflect-metadata';

import { CarregamentoLento } from "../../../../src/domain/camiao/camiaoCarregamentoLento";

describe('camiao carregamento lento test', function(){
    var expect = require('expect');

    it('create valid carregamento lento', () => {
        let carregamentoLentoNumber : number = 200;
        let carregamentoLento = CarregamentoLento.create(carregamentoLentoNumber);
        expect(carregamentoLento.isSuccess).toEqual(true);
    })

    it('failed to create carregamento lento', () => {
        let carregamentoLentoNumber : number = -1;
        let carregamentoLento = CarregamentoLento.create(carregamentoLentoNumber);
        expect(carregamentoLento.error).toEqual("O carregamento lento de um camiao nao pode ser nula ou negativa");
    })
})
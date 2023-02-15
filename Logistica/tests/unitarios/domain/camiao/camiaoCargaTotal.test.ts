import 'reflect-metadata';

import { CargaTotal } from "../../../../src/domain/camiao/camiaoCargaTotal";

describe('camiao carga total test', function(){
    var expect = require('expect');

    it('create valid carga total', () => {
        let cargaTotalNumber : number = 200;
        let cargaTotal = CargaTotal.create(cargaTotalNumber);
        expect(cargaTotal.isSuccess).toEqual(true);
    })

    it('failed to create carga total', () => {
        let cargaTotalNumber : number = -1;
        let cargaTotal = CargaTotal.create(cargaTotalNumber);
        expect(cargaTotal.error).toEqual("A carga total de um camiao nao pode ser nula ou negativa");
    })
})
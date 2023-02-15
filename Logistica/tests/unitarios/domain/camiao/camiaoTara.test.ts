import 'reflect-metadata';

import { Tara } from "../../../../src/domain/camiao/camiaoTara";

describe('camiao tara test', function(){
    var expect = require('expect');

    it('create valid tara', () => {
        let taraNumber : number = 200;
        let tara = Tara.create(taraNumber);
        expect(tara.isSuccess).toEqual(true);
    })

    it('failed to create tara', () => {
        let taraNumber : number = -1;
        let tara = Tara.create(taraNumber);
        expect(tara.error).toEqual("A tara de um camiao nao pode ser nula ou negativa");
    })
})
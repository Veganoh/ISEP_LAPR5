import 'reflect-metadata';

import { CamiaoBateria } from "../../../../src/domain/camiao/camiaoBateria";

describe('camiao autonomia test', function(){
    var expect = require('expect');

    it('create valid bateria', () => {
        let bateriaNumber : number = 200;
        let bateriaCamiao = CamiaoBateria.create(bateriaNumber);
        expect(bateriaCamiao.isSuccess).toEqual(true);
    })

    it('failed to create bateria', () => {
        let bateriaNumber : number = -1;
        let bateriaCamiao = CamiaoBateria.create(bateriaNumber);
        expect(bateriaCamiao.error).toEqual("A bateria de um camiao nao pode ser nula ou negativa");
    })
})
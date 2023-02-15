import 'reflect-metadata';

import { AutonomiaCamiao } from "../../../../src/domain/camiao/camiaoAutonomia";

describe('camiao autonomia test', function(){
    var expect = require('expect');

    it('create valid autonomia', () => {
        let autonomiaNumber : number = 200;
        let autonomiaCamiao = AutonomiaCamiao.create(autonomiaNumber);
        expect(autonomiaCamiao.isSuccess).toEqual(true);
    })

    it('failed to create autonomia', () => {
        let autonomiaNumber : number = -1;
        let autonomiaCamiao = AutonomiaCamiao.create(autonomiaNumber);
        expect(autonomiaCamiao.error).toEqual("A autonomia de um camiao nao pode ser nula ou negativa");
    })
})
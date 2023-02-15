import {Ativo} from "../../../src/app/domain/armazem/ativo";

describe('altitude unit test', function() {
    const expect = require('chai').expect;

    it('criar objeto de atividade verdadeiro', () => {
        let ativo = Ativo.create(true);

        expect(ativo.isSuccess).equal(true);
        expect(ativo.isFailure).equal(false);
        expect(ativo.getValue().isAtivo).equal(true);
    })

    it('criar objeto de atividade falso', () => {
        let ativo = Ativo.create(false);

        expect(ativo.isSuccess).equal(true);
        expect(ativo.isFailure).equal(false);
        expect(ativo.getValue().isAtivo).equal(false);
    })
})

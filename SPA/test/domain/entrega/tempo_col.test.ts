import {TempoColacacao} from "../../../src/app/domain/entrega/tempo_colocacao";

describe('Tempo colocacao de uma entrega unit test', function() {
    const expect = require('chai').expect;

    const validTemp = 10;
    const invalidTemp = -10;
    const errorMessage = "O tempo de colocação da entrega não pode ser zero nem negativo";

    it('criar Tempo colocacao valida', () => {
        let temp = TempoColacacao.create(validTemp);

        expect(temp.isSuccess).equal(true);
        expect(temp.isFailure).equal(false);
        expect(temp.getValue().value).equal(validTemp);
    })

    it('criar Tempo colocacao invalida', () => {
        let temp = TempoColacacao.create(invalidTemp);

        expect(temp.isSuccess).equal(false);
        expect(temp.isFailure).equal(true);
        expect(temp.error).equal(errorMessage);
    })
})

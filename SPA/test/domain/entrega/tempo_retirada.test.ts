import {TempoRetirada} from "../../../src/app/domain/entrega/tempo_retirada";

describe('Tempo retirada de uma entrega unit test', function() {
    const expect = require('chai').expect;

    const validTemp = 10;
    const invalidTemp = -10;
    const errorMessage = "O tempo de retirada da entrega não pode ser zero nem negativo";

    it('criar Tempo retirada valida', () => {
        let temp = TempoRetirada.create(validTemp);

        expect(temp.isSuccess).equal(true);
        expect(temp.isFailure).equal(false);
        expect(temp.getValue().value).equal(validTemp);
    })

    it('criar Tempo retirada invalida', () => {
        let temp = TempoRetirada.create(invalidTemp);

        expect(temp.isSuccess).equal(false);
        expect(temp.isFailure).equal(true);
        expect(temp.error).equal(errorMessage);
    })
})

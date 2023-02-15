import {PesoEntrega} from "../../../src/app/domain/entrega/peso_entrega";

describe('peso de uma entrega unit test', function() {
    const expect = require('chai').expect;

    const validPeso = 10;
    const invalidPeso = -10;
    const errorMessage = "O peso da entrega não pode ser zero nem negativo";

    it('criar Peso valida', () => {
        let peso = PesoEntrega.create(validPeso);

        expect(peso.isSuccess).equal(true);
        expect(peso.isFailure).equal(false);
        expect(peso.getValue().value).equal(validPeso);
    })

    it('criar Peso invalida', () => {
        let peso = PesoEntrega.create(invalidPeso);

        expect(peso.isSuccess).equal(false);
        expect(peso.isFailure).equal(true);
        expect(peso.error).equal(errorMessage);
    })
})

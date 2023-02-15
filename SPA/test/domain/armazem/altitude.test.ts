import {Altitude} from "../../../src/app/domain/armazem/altitude";

describe('altitude unit test', function() {
    const expect = require('chai').expect;

    const validAltidude = 10;
    const invalidAltidude = -10;
    const errorMessage = "A altitude de um armazem não pode ser negativa";

    it('criar Altitude valida', () => {
        let altitude = Altitude.create(validAltidude);

        expect(altitude.isSuccess).equal(true);
        expect(altitude.isFailure).equal(false);
        expect(altitude.getValue().value).equal(validAltidude);
    })

    it('criar Altitude invalida', () => {
        let altitude = Altitude.create(invalidAltidude);

        expect(altitude.isSuccess).equal(false);
        expect(altitude.isFailure).equal(true);
        expect(altitude.error).equal(errorMessage);
    })
})

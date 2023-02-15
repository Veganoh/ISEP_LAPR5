import {Coordenadas} from "../../../src/app/domain/armazem/coordenadas";

describe('camiao unit test', function() {
    const expect = require('chai').expect;

    const validLatitue = 10;
    const validLongitude = 10;
    const invalidLatitudeNegativa = -91;
    const invalidLongitudeNegativa  = -181;
    const invalidLatitudePositiva = 91;
    const invalidLongitudePositiva  = 181;
    const errorMessageLatitude = "latitude tem de estar entre -90 e 90 graus";
    const errorMessageLongitude = "longitude tem de estar entre -180 e 180 graus";

    it('criar coordenadas validas', () => {
        let coordenadas = Coordenadas.create(validLatitue, validLongitude);

        expect(coordenadas.isSuccess).equal(true);
        expect(coordenadas.isFailure).equal(false);
        expect(coordenadas.getValue().latitude).equal(validLatitue);
        expect(coordenadas.getValue().longitude).equal(validLongitude);
    })

    it('criar coordenadas validas latitude negativa', () => {
        let coordenadas = Coordenadas.create(invalidLongitudeNegativa, validLongitude);

        expect(coordenadas.isSuccess).equal(false);
        expect(coordenadas.isFailure).equal(true);
        expect(coordenadas.error).equal(errorMessageLatitude);
    })

    it('criar coordenadas validas latitude positiva', () => {
        let coordenadas = Coordenadas.create(invalidLongitudeNegativa, validLongitude);

        expect(coordenadas.isSuccess).equal(false);
        expect(coordenadas.isFailure).equal(true);
        expect(coordenadas.error).equal(errorMessageLatitude);
    })

    it('criar coordenadas validas longitude negativa', () => {
        let coordenadas = Coordenadas.create(validLatitue, invalidLongitudeNegativa);

        expect(coordenadas.isSuccess).equal(false);
        expect(coordenadas.isFailure).equal(true);
        expect(coordenadas.error).equal(errorMessageLongitude);
    })

    it('criar coordenadas validas longitude positiva', () => {
        let coordenadas = Coordenadas.create(validLatitue, invalidLongitudePositiva);

        expect(coordenadas.isSuccess).equal(false);
        expect(coordenadas.isFailure).equal(true);
        expect(coordenadas.error).equal(errorMessageLongitude);
    })
})

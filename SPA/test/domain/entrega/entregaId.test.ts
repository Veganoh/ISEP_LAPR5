import {EntregaID} from "../../../src/app/domain/entrega/entregaId";

describe('Entrega id unit test', function() {
    const expect = require('chai').expect;

    const validID = "Es5";
    const invalidIDEmpty = "";
    const invalidIDNull = null;

    it('criar EntregaID valido', () => {
        let Id = new EntregaID(validID);

        expect(Id.toString()).equal(validID);
    })
})
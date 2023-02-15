import {Data} from "../../../src/app/domain/entrega/data";

describe('Data unit test', function() {
    const expect = require('chai').expect;

    const validData = "10/10/2022";
    const invalidDataNull = null;
    const invalidData= ""
    const errorMessage = "A data de uma entrega não pode ser vazia";

    it('criar Data valida', () => {
        let data = Data.create(validData);

        expect(data.isSuccess).equal(true);
        expect(data.isFailure).equal(false);
        expect(data.getValue().getDateFormated()).equal("2022/10/10");
    })
    it('criar Data invalida null', () => {
        let data = Data.create(invalidDataNull!);

        expect(data.isSuccess).equal(false);
        expect(data.isFailure).equal(true);
        expect(data.error).equal(errorMessage);
    })
})

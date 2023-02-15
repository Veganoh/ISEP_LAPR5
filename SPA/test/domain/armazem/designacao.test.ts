import {Designacao} from "../../../src/app/domain/armazem/designacao";

describe('altitude unit test', function() {
    const expect = require('chai').expect;

    const validDesignacao = "asd";
    const invalidDesignacaoEmpty = "";
    const invalidDesignacaoNull = null;
    const invalidDesignacaoTooBig = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const errorMessage = "A designação de um armazem não pode ser vazia nem maior que 50 caracteres";

    it('criar Designacao valida', () => {
        let designacao = Designacao.create(validDesignacao);

        expect(designacao.isSuccess).equal(true);
        expect(designacao.isFailure).equal(false);
        expect(designacao.getValue().value).equal(validDesignacao);
    })

    it('criar Designacao invalida null', () => {
        let designacao = Designacao.create(invalidDesignacaoNull!);

        expect(designacao.isSuccess).equal(false);
        expect(designacao.isFailure).equal(true);
        expect(designacao.error).equal(errorMessage);
    })

    it('criar Designacao invalida vazia', () => {
        let designacao = Designacao.create(invalidDesignacaoEmpty);

        expect(designacao.isSuccess).equal(false);
        expect(designacao.isFailure).equal(true);
        expect(designacao.error).equal(errorMessage);
    })

    it('criar Designacao invalida muito grane', () => {
        let designacao = Designacao.create(invalidDesignacaoTooBig);

        expect(designacao.isSuccess).equal(false);
        expect(designacao.isFailure).equal(true);
        expect(designacao.error).equal(errorMessage);
    })
})

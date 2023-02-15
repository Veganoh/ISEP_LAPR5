import {Armazem_ID} from "../../../src/app/domain/entrega/armazem_id";

describe('Armazem ID de uma Entrega unit test', function() {
    const expect = require('chai').expect;

    const validID = "As5";
    const invalidIDEmpty = "";
    const invalidIDNull = null;
    const invalidIDTooBig = "asdf";
    const invalidIDTooSmall = "as";
    const invalidIDInvalidCharacter = "as,";
    const msgErro = "O identificador de um Armazem tem de ter 3 caracteres alfanuméricos";

    it('criar ArmazemID valido', () => {
        let id = Armazem_ID.create(validID);

        expect(id.isSuccess).equal(true);
        expect(id.isFailure).equal(false);
        expect(id.getValue().value).equal(validID);
    })

    it('criar ArmazemID invalido null', () => {
        let id = Armazem_ID.create(invalidIDNull!);

        expect(id.isSuccess).equal(false);
        expect(id.isFailure).equal(true);
        expect(id.error).equal(msgErro);
    })

    it('criar ArmazemID invalido empty', () => {
        let id = Armazem_ID.create(invalidIDEmpty);

        expect(id.isSuccess).equal(false);
        expect(id.isFailure).equal(true);
        expect(id.error).equal(msgErro);
    })

    it('criar ArmazemID invalido Too big', () => {
        let id = Armazem_ID.create(invalidIDTooBig);

        expect(id.isSuccess).equal(false);
        expect(id.isFailure).equal(true);
        expect(id.error).equal(msgErro);
    })

    it('criar ArmazemID invalido Too small', () => {
        let id = Armazem_ID.create(invalidIDTooSmall );

        expect(id.isSuccess).equal(false);
        expect(id.isFailure).equal(true);
        expect(id.error).equal(msgErro);
    })

    it('criar ArmazemID invalido character invalido', () => {
        let id = Armazem_ID.create(invalidIDInvalidCharacter);

        expect(id.isSuccess).equal(false);
        expect(id.isFailure).equal(true);
        expect(id.error).equal(msgErro);
    })
})
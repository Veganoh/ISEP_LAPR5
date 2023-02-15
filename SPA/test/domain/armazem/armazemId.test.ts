import {ArmazemID} from "../../../src/app/domain/armazem/armazemId";

describe('altitude unit test', function() {
    const expect = require('chai').expect;

    const validID = "As5";
    const invalidIDEmpty = "";
    const invalidIDNull = null;
    const invalidIDTooBig = "asdf";
    const invalidIDTooSmall = "as";
    const invalidIDInvalidCharacter = "as,";
    
    const errorMessage = "A designação de um armazem não pode ser vazia nem maior que 50 caracteres";

    it('criar ArmazemID valido', () => {
        let Id = new ArmazemID(validID);

        expect(Id.toString()).equal(validID);
    })

    it('criar ArmazemID invalido null', () => {
        expect(function(){new ArmazemID(invalidIDNull!);}).to.throw("O identificador de um Armazem tem de ter 3 caracteres alfanuméricos");
    })

    it('criar ArmazemID invalido empty', () => {
        expect(function(){new ArmazemID(invalidIDEmpty);}).to.throw("O identificador de um Armazem tem de ter 3 caracteres alfanuméricos");
    })

    it('criar ArmazemID invalido Too big', () => {
        expect(function(){new ArmazemID(invalidIDTooBig);}).to.throw("O identificador de um Armazem tem de ter 3 caracteres alfanuméricos");
    })

    it('criar ArmazemID invalido Too small', () => {
        expect(function(){new ArmazemID(invalidIDTooSmall);}).to.throw("O identificador de um Armazem tem de ter 3 caracteres alfanuméricos");
    })

    it('criar ArmazemID invalido character invalido', () => {
        expect(function(){new ArmazemID(invalidIDInvalidCharacter);}).to.throw("O identificador de um Armazem tem de ter 3 caracteres alfanuméricos");
    })
})
import {Endereco} from "../../../src/app/domain/armazem/endereco";

describe('endereco unit test', function() {
    const expect = require('chai').expect;

    const validEndereco = "aaa,aaa,1234-154";
    const invalidEnderecoEmpty = "";
    const invalidEnderecoNull = null;
    const invalidEnderecoWrongformat1 = "aaa,aaa,123-154";
    const invalidEnderecoWrongformat2 = "aaa,123-154";
    const invalidEnderecoWrongformat3 = "aaa,aaa";
    const errorMessage = "Este formato de endeço não é suportado";

    it('criar Endereco valida', () => {
        let endereco = Endereco.create(validEndereco);

        expect(endereco.isSuccess).equal(true);
        expect(endereco.isFailure).equal(false);
        expect(endereco.getValue().value).equal(validEndereco);
    })

    it('criar Endereco invalida null', () => {
        let endereco = Endereco.create(invalidEnderecoNull!);

        expect(endereco.isSuccess).equal(false);
        expect(endereco.isFailure).equal(true);
        expect(endereco.error).equal(errorMessage);
    })

    it('criar Endereco invalida vazia', () => {
        let endereco = Endereco.create(invalidEnderecoEmpty);

        expect(endereco.isSuccess).equal(false);
        expect(endereco.isFailure).equal(true);
        expect(endereco.error).equal(errorMessage);
    })

    it('criar Endereco invalida formato errado 1', () => {
        let endereco = Endereco.create(invalidEnderecoWrongformat1);

        expect(endereco.isSuccess).equal(false);
        expect(endereco.isFailure).equal(true);
        expect(endereco.error).equal(errorMessage);
    })

    it('criar Endereco invalida formato errado 2', () => {
        let endereco = Endereco.create(invalidEnderecoWrongformat2);

        expect(endereco.isSuccess).equal(false);
        expect(endereco.isFailure).equal(true);
        expect(endereco.error).equal(errorMessage);
    })

    it('criar Endereco invalida formato errado 3', () => {
        let endereco = Endereco.create(invalidEnderecoWrongformat3);

        expect(endereco.isSuccess).equal(false);
        expect(endereco.isFailure).equal(true);
        expect(endereco.error).equal(errorMessage);
    })
})

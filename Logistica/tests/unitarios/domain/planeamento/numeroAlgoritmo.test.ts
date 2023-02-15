process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import { NumeroAlgoritmo } from "../../../../src/domain/planeamento/numeroAlgoritmo";

describe('/Testes Unitários do value object NumeroAlgoritmo', () => {

    it('Testa criar algoritmo 1 com sucesso...', () => {
        let algoritmo = NumeroAlgoritmo.cria(1);
        
        expect(algoritmo.isSuccess).to.be.true;
        expect(algoritmo.isFailure).to.be.false;
    })

    it('Testa criar algoritmo 2 com sucesso...', () => {
        let algoritmo = NumeroAlgoritmo.cria(2);
        
        expect(algoritmo.isSuccess).to.be.true;
        expect(algoritmo.isFailure).to.be.false;
    })

    it('Testa criar algoritmo 3 com sucesso...', () => {
        let algoritmo = NumeroAlgoritmo.cria(3);
        
        expect(algoritmo.isSuccess).to.be.true;
        expect(algoritmo.isFailure).to.be.false;
    })

    it('Testa criar algoritmo 4 com sucesso...', () => {
        let algoritmo = NumeroAlgoritmo.cria(4);
        
        expect(algoritmo.isSuccess).to.be.true;
        expect(algoritmo.isFailure).to.be.false;
    })

    it('Testa valor...', () => {
        let algoritmo = NumeroAlgoritmo.cria(4);
        
        let valorEsperado = 4;
        let valorObtido = algoritmo.getValue().value;

        expect(valorObtido).to.be.equal(valorEsperado);
    })

    it('Testa se falha a criar por ser null...', () => {
        // @ts-ignore: Unreachable code error
        let algoritmo = NumeroAlgoritmo.cria(null);;
        
        expect(algoritmo.isSuccess).to.be.false;
        expect(algoritmo.isFailure).to.be.true;
        expect(algoritmo.error).to.exist;
    })

    it('Testa se falha a criar por ser undefined...', () => {
        let numero;
        let algoritmo = NumeroAlgoritmo.cria(numero);
        
        expect(algoritmo.isSuccess).to.be.false;
        expect(algoritmo.isFailure).to.be.true;
        expect(algoritmo.error).to.exist;
    })

    it('Testa falha a criar por ser diferente aos algoritmos guardados...', () => {
        let algoritmo = NumeroAlgoritmo.cria(10);
        
        expect(algoritmo.isSuccess).to.be.false;
        expect(algoritmo.isFailure).to.be.true;
        expect(algoritmo.error).to.exist;
    })
})
process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import { PercursoTempoExtra } from "../../../../src/domain/percurso/percursoTempoExtra";

describe('/Testes Unitários do value object PercursoTempoExtra', () => {

    it('Testa criar com sucesso...', () => {
        let tempoExtra = PercursoTempoExtra.cria(120);
        
        expect(tempoExtra.isSuccess).to.be.true;
        expect(tempoExtra.isFailure).to.be.false;
    })

    it('Testa criar com sucesso com valor 0...', () => {
        let tempoExtra = PercursoTempoExtra.cria(0);
        
        expect(tempoExtra.isSuccess).to.be.true;
        expect(tempoExtra.isFailure).to.be.false;
    })

    it('Testa valor...', () => {
        let tempoExtra = PercursoTempoExtra.cria(120);
        
        let valorEsperado = 120;
        let valorObtido = tempoExtra.getValue().value;

        expect(valorObtido).to.be.equal(valorEsperado);
    })

    it('Testa se falha a criar por ser null...', () => {
        // @ts-ignore: Unreachable code error
        let tempoExtra = PercursoTempoExtra.cria(null);
        
        expect(tempoExtra.isSuccess).to.be.false;
        expect(tempoExtra.isFailure).to.be.true;
        expect(tempoExtra.error).to.exist;
    })

    it('Testa se falha a criar por ser undefined...', () => {
        let tempo;
        let tempoExtra = PercursoTempoExtra.cria(tempo);
        
        expect(tempoExtra.isSuccess).to.be.false;
        expect(tempoExtra.isFailure).to.be.true;
        expect(tempoExtra.error).to.exist;
    })

    it('Testa falha a criar por ser negativo...', () => {
        let tempoExtra = PercursoTempoExtra.cria(-1);
        
        expect(tempoExtra.isSuccess).to.be.false;
        expect(tempoExtra.isFailure).to.be.true;
        expect(tempoExtra.error).to.exist;
    })

    it('Testa falha a criar por ter valores decimais...', () => {
        let tempoExtra = PercursoTempoExtra.cria(120.50);
        
        expect(tempoExtra.isSuccess).to.be.false;
        expect(tempoExtra.isFailure).to.be.true;
        expect(tempoExtra.error).to.exist;
    })
})
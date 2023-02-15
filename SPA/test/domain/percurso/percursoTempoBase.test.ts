import { expect } from 'chai';
import { PercursoTempoBase } from "../../../src/app/domain/percurso/percursoTempoBase";

describe('/Testes Unitários do value object PercursoTempoBase', () => {

    it('Testa criar com sucesso...', () => {
        let tempoBase = PercursoTempoBase.cria(120);
        
        expect(tempoBase.isSuccess).to.be.true;
        expect(tempoBase.isFailure).to.be.false;
    })

    it('Testa valor...', () => {
        let tempoBase = PercursoTempoBase.cria(120);
        
        let valorEsperado = 120;
        let valorObtido = tempoBase.getValue().value;

        expect(valorObtido).to.be.equal(valorEsperado);
    })

    it('Testa se falha a criar com valor 0...', () => {
        let tempoBase = PercursoTempoBase.cria(0);
        
        expect(tempoBase.isSuccess).to.be.false;
        expect(tempoBase.isFailure).to.be.true;
    })

    it('Testa se falha a criar por ser null...', () => {
        // @ts-ignore: Unreachable code error
        let tempoBase = PercursoTempoBase.cria(null);
        
        expect(tempoBase.isSuccess).to.be.false;
        expect(tempoBase.isFailure).to.be.true;
        expect(tempoBase.error).to.exist;
    })
    
    it('Testa se falha a criar por ser undefined...', () => {
        let tempo;
        // @ts-ignore: Unreachable code error
        let tempoBase = PercursoTempoBase.cria(tempo);
        
        expect(tempoBase.isSuccess).to.be.false;
        expect(tempoBase.isFailure).to.be.true;
        expect(tempoBase.error).to.exist;
    })

    it('Testa falha a criar por ser negativo...', () => {
        let tempoBase = PercursoTempoBase.cria(-1);
        
        expect(tempoBase.isSuccess).to.be.false;
        expect(tempoBase.isFailure).to.be.true;
        expect(tempoBase.error).to.exist;
    })

    it('Testa falha a criar por ter valores decimais...', () => {
        let tempoBase = PercursoTempoBase.cria(120.50);
        
        expect(tempoBase.isSuccess).to.be.false;
        expect(tempoBase.isFailure).to.be.true;
        expect(tempoBase.error).to.exist;
    })
})
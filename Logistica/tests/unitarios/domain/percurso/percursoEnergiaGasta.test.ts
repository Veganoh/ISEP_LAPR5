process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import { PercursoEnergiaGasta } from "../../../../src/domain/percurso/percursoEnergiaGasta";

describe('/Testes Unitários do value object PercursoEnergiaGasta', () => {

    it('Testa criar com sucesso...', () => {
        let energiaGasta = PercursoEnergiaGasta.cria(10);
        
        expect(energiaGasta.isSuccess).to.be.true;
        expect(energiaGasta.isFailure).to.be.false;
    })

    it('Testa valor...', () => {
        let energiaGasta = PercursoEnergiaGasta.cria(10);
        
        let valorEsperado = 10;
        let valorObtido = energiaGasta.getValue().value;

        expect(valorObtido).to.be.equal(valorEsperado);
    })

    it('Testa se falha a criar por ser null...', () => {
        // @ts-ignore: Unreachable code error
        let energiaGasta = PercursoEnergiaGasta.cria(null);
        
        expect(energiaGasta.isSuccess).to.be.false;
        expect(energiaGasta.isFailure).to.be.true;
        expect(energiaGasta.error).to.exist;
    })

    it('Testa se falha a criar por ser undefined...', () => {
        let energia;
        let energiaGasta = PercursoEnergiaGasta.cria(energia);
        
        expect(energiaGasta.isSuccess).to.be.false;
        expect(energiaGasta.isFailure).to.be.true;
        expect(energiaGasta.error).to.exist;
    })

    it('Testa falha a criar por ser 0...', () => {
        let energiaGasta = PercursoEnergiaGasta.cria(0);
        
        expect(energiaGasta.isSuccess).to.be.false;
        expect(energiaGasta.isFailure).to.be.true;
        expect(energiaGasta.error).to.exist;
    })

    it('Testa falha a criar por ser negativo...', () => {
        let energiaGasta = PercursoEnergiaGasta.cria(-1);
        
        expect(energiaGasta.isSuccess).to.be.false;
        expect(energiaGasta.isFailure).to.be.true;
        expect(energiaGasta.error).to.exist;
    })
})
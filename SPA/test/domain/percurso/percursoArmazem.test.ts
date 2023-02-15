import { expect } from 'chai';
import { PercursoArmazem } from "../../../src/app/domain/percurso/percursoArmazem";

describe('/Testes Unitários do value object PercursoArmazem', () => {

    it('Testa criar com sucesso...', () => {
        let armazem = PercursoArmazem.cria('M01');
        
        expect(armazem.isSuccess).to.be.true;
        expect(armazem.isFailure).to.be.false;
    })

    it('Testa criar com sucesso com valor só números...', () => {
        let armazem = PercursoArmazem.cria('001');
        
        expect(armazem.isSuccess).to.be.true;
        expect(armazem.isFailure).to.be.false;
    })

    it('Testa criar com sucesso com valor só letras...', () => {
        let armazem = PercursoArmazem.cria('ARM');
        
        expect(armazem.isSuccess).to.be.true;
        expect(armazem.isFailure).to.be.false;
    })

    it('Testa valor...', () => {
        let armazem = PercursoArmazem.cria('M01');
        
        let valorEsperado = 'M01';
        let valorObtido = armazem.getValue().value;

        expect(valorObtido).to.be.equal(valorEsperado);
    })

    it('Testa se falha a criar por ser null...', () => {
        // @ts-ignore: Unreachable code error
        let armazem = PercursoArmazem.cria(null);
        
        expect(armazem.isSuccess).to.be.false;
        expect(armazem.isFailure).to.be.true;
        expect(armazem.error).to.exist;
    })
    
    it('Testa se falha a criar por ser undefined...', () => {
        let tempo;
        // @ts-ignore: Unreachable code error
        let armazem = PercursoArmazem.cria(tempo);
        
        expect(armazem.isSuccess).to.be.false;
        expect(armazem.isFailure).to.be.true;
        expect(armazem.error).to.exist;
    })

    it('Testa falha a criar por ter caracteres a mais...', () => {
        let armazem = PercursoArmazem.cria('M001');
        
        expect(armazem.isSuccess).to.be.false;
        expect(armazem.isFailure).to.be.true;
        expect(armazem.error).to.exist;
    })

    it('Testa falha a criar por ter caracteres a menos...', () => {
        let armazem = PercursoArmazem.cria('M1');
        
        expect(armazem.isSuccess).to.be.false;
        expect(armazem.isFailure).to.be.true;
        expect(armazem.error).to.exist;
    })

    it('Testa falha a criar por ter simbolos...', () => {
        let armazem = PercursoArmazem.cria('M_1');
        
        expect(armazem.isSuccess).to.be.false;
        expect(armazem.isFailure).to.be.true;
        expect(armazem.error).to.exist;
    })
})
import { expect } from 'chai';
import { Percurso } from "../../../src/app/domain/percurso/percurso";
import { PercursoId } from "../../../src/app/domain/percurso/percursoId";
import { PercursoArmazem } from "../../../src/app/domain/percurso/percursoArmazem";
import { PercursoDistancia } from "../../../src/app/domain/percurso/percursoDistancia";
import { PercursoEnergiaGasta } from "../../../src/app/domain/percurso/percursoEnergiaGasta";
import { PercursoTempoBase } from "../../../src/app/domain/percurso/percursoTempoBase";
import { PercursoTempoExtra } from "../../../src/app/domain/percurso/percursoTempoExtra";
import { UniqueEntityID } from 'src/app/core/domain/UniqueEntityID';
const sinon = require('sinon');

describe('/Testes Unitários da entidade Percurso', () => {
    let percursoId: UniqueEntityID | undefined;
    let propsStub: any;
    let armazemOrigStub: any;
    let armazemDestStub: any;
    let energiaGastaStub: any;
    let distanciaStub: any;
    let tempoBaseStub: any;
    let tempoExtraStub: any;

    beforeAll(function(done) {
        percursoId = new PercursoId(1);

        armazemOrigStub = sinon.stub(PercursoArmazem.prototype, 'value').get(function getterFn() { return "M01"; });
        armazemDestStub = sinon.stub(PercursoArmazem.prototype, 'value').get(function getterFn() { return "M02"; });
        energiaGastaStub = sinon.stub(PercursoEnergiaGasta.prototype, 'value').get(function getterFn() { return 45; });
        distanciaStub = sinon.stub(PercursoDistancia.prototype, 'value').get(function getterFn() { return 80; });
        tempoBaseStub = sinon.stub(PercursoTempoBase.prototype, 'value').get(function getterFn() { return 120; });
        tempoExtraStub = sinon.stub(PercursoTempoExtra.prototype, 'value').get(function getterFn() { return 0; });

        propsStub = {
            armazemOrigem : armazemOrigStub,
            armazemDestino : armazemDestStub,
            energiaGasta : energiaGastaStub,
            distancia : distanciaStub,
            tempoBase : tempoBaseStub,
            tempoExtra : tempoExtraStub
        }

        done();
    });

    it('Devia criar com sucesso...', () => {
        let percurso = Percurso.cria(propsStub, percursoId);
        
        expect(percurso.isSuccess).to.be.true;
        expect(percurso.isFailure).to.be.false;
    })

    it('Devia criar com sucesso sem id...', () =>{
        let percurso = Percurso.cria(propsStub);
        
        expect(percurso.isSuccess).to.be.true;
        expect(percurso.isFailure).to.be.false;
    })

    it('Devia falhar por ser null...', () => {
        // @ts-ignore: Unreachable code error
        const percurso = Percurso.cria(null);

        expect(percurso.isFailure).to.be.true;
        expect(percurso.isSuccess).to.be.false;
    }) 

    it('Devia falhar por faltar armazemOrigem...', () => {
        let propsStubBad = {
            armazemDestino : armazemDestStub,
            energiaGasta : energiaGastaStub,
            distancia : distanciaStub,
            tempoBase : tempoBaseStub,
            tempoExtra : tempoExtraStub
        }

        // @ts-ignore: Unreachable code error
        let percurso = Percurso.cria(propsStubBad);
        
        expect(percurso.isFailure).to.be.true;
        expect(percurso.isSuccess).to.be.false;
    })

    it('Devia falhar por faltar armazemDestino...', () => {
        let propsStubBad = {
            armazemOrigem : armazemOrigStub,
            energiaGasta : energiaGastaStub,
            distancia : distanciaStub,
            tempoBase : tempoBaseStub,
            tempoExtra : tempoExtraStub
        }

        // @ts-ignore: Unreachable code error
        let percurso = Percurso.cria(propsStubBad);
        
        expect(percurso.isFailure).to.be.true;
        expect(percurso.isSuccess).to.be.false;
    })

    it('Devia falhar por faltar energiaGasta...', () => {
        let propsStubBad = {
            armazemOrigem : armazemOrigStub,
            armazemDestino : armazemDestStub,
            distancia : distanciaStub,
            tempoBase : tempoBaseStub,
            tempoExtra : tempoExtraStub
        }

        // @ts-ignore: Unreachable code error
        let percurso = Percurso.cria(propsStubBad);
        
        expect(percurso.isFailure).to.be.true;
        expect(percurso.isSuccess).to.be.false;
    })

    it('Devia falhar por faltar distancia...', () => {
        let propsStubBad = {
            armazemOrigem : armazemOrigStub,
            armazemDestino : armazemDestStub,
            energiaGasta : energiaGastaStub,
            tempoBase : tempoBaseStub,
            tempoExtra : tempoExtraStub
        }

        // @ts-ignore: Unreachable code error
        let percurso = Percurso.cria(propsStubBad);
        
        expect(percurso.isFailure).to.be.true;
        expect(percurso.isSuccess).to.be.false;
    })

    it('Devia falhar por faltar tempoBase...', () => {
        let propsStubBad = {
            armazemOrigem : armazemOrigStub,
            armazemDestino : armazemDestStub,
            energiaGasta : energiaGastaStub,
            distancia : distanciaStub,
            tempoExtra : tempoExtraStub
        }

        // @ts-ignore: Unreachable code error
        let percurso = Percurso.cria(propsStubBad);
        
        expect(percurso.isFailure).to.be.true;
        expect(percurso.isSuccess).to.be.false;
    })

    it('Devia falhar por faltar tempoExtra...', () => {
        let propsStubBad = {
            armazemOrigem : armazemOrigStub,
            armazemDestino : armazemDestStub,
            energiaGasta : energiaGastaStub,
            distancia : distanciaStub,
            tempoBase : tempoBaseStub
        }

        // @ts-ignore: Unreachable code error
        let percurso = Percurso.cria(propsStubBad);
        
        expect(percurso.isFailure).to.be.true;
        expect(percurso.isSuccess).to.be.false;
    })

    it('Devia falhar por armazem de Origem e armazem de Destino serem iguais...', () => {
        let propsStubBad = {
            armazemOrigem : armazemOrigStub,
            armazemDestino : armazemOrigStub,
            energiaGasta : energiaGastaStub,
            distancia : distanciaStub,
            tempoBase : tempoBaseStub,
            tempoExtra : tempoExtraStub
        }

        // @ts-ignore: Unreachable code error
        let percurso = Percurso.cria(propsStubBad);
        
        expect(percurso.isFailure).to.be.true;
        expect(percurso.isSuccess).to.be.false;
    })

    it('Devia retornar valor certo para ArmazemOrigem...', () => {
        let percurso = Percurso.cria(propsStub, percursoId);
        let esperado = propsStub.armazemOrigem;
        let obtido = percurso.getValue().armazemOrigem;
        
        expect(obtido).to.be.equal(esperado);
        expect(percurso.isFailure).to.be.false;
        expect(percurso.isSuccess).to.be.true;
    })

    it('Devia retornar valor certo para ArmazemDestino...', () => {
        let percurso = Percurso.cria(propsStub, percursoId);
        let esperado = propsStub.armazemDestino;
        let obtido = percurso.getValue().armazemDestino;
        
        expect(obtido).to.be.equal(esperado);
        expect(percurso.isFailure).to.be.false;
        expect(percurso.isSuccess).to.be.true;
    })

    it('Devia retornar valor certo para EnergiaGasta...', () => {
        let percurso = Percurso.cria(propsStub, percursoId);
        let esperado = propsStub.energiaGasta;
        let obtido = percurso.getValue().energiaGasta;
        
        expect(obtido).to.be.equal(esperado);
        expect(percurso.isFailure).to.be.false;
        expect(percurso.isSuccess).to.be.true;
    })

    it('Devia retornar valor certo para Distancia...', () => {
        let percurso = Percurso.cria(propsStub, percursoId);
        let esperado = propsStub.distancia;
        let obtido = percurso.getValue().distancia;
        
        expect(obtido).to.be.equal(esperado);
        expect(percurso.isFailure).to.be.false;
        expect(percurso.isSuccess).to.be.true;
    })

    it('Devia retornar valor certo para TempoBase...', () => {
        let percurso = Percurso.cria(propsStub, percursoId);
        let esperado = propsStub.tempoBase;
        let obtido = percurso.getValue().tempoBase;
        
        expect(obtido).to.be.equal(esperado);
        expect(percurso.isFailure).to.be.false;
        expect(percurso.isSuccess).to.be.true;
    })

    it('Devia retornar valor certo para TempoExtra...', () => {
        let percurso = Percurso.cria(propsStub, percursoId);
        let esperado = propsStub.tempoExtra;
        let obtido = percurso.getValue().tempoExtra;
        
        expect(obtido).to.be.equal(esperado);
        expect(percurso.isFailure).to.be.false;
        expect(percurso.isSuccess).to.be.true;
    })
})
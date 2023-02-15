process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import { PlaneamentoRequest } from "../../../../src/domain/planeamento/planeamentoRequest";
import { NumeroAlgoritmo } from "../../../../src/domain/planeamento/numeroAlgoritmo";
import { CamiaoId } from "../../../../src/domain/camiao/camiaoId";

const sinon = require('sinon');

describe('/Testes Unitários da entidade PlaneamentoRequest', () => {
    
    let propsStub;
    let camiaoIDStub;
    let numeroAlgoritmoStub;
    let data = new Date(2022-12-10);

    beforeAll(function(done) {
        camiaoIDStub = new CamiaoId("CA-10-10");
        numeroAlgoritmoStub = sinon.stub(NumeroAlgoritmo.prototype, 'value').get(function getterFn() { return 1; });

        propsStub = {
            camiao: camiaoIDStub,
            data : data,
            algoritmo: numeroAlgoritmoStub
        }

        done();
    });

    it('Devia criar com sucesso...', () => {
        let planeamentoRequest = PlaneamentoRequest.cria(propsStub);
        
        expect(planeamentoRequest.isSuccess).to.be.true;
        expect(planeamentoRequest.isFailure).to.be.false;
    })

    it('Devia falhar por ser null...', () => {
        // @ts-ignore: Unreachable code error
        const planeamentoRequest = PlaneamentoRequest.cria(null);

        expect(planeamentoRequest.isFailure).to.be.true;
        expect(planeamentoRequest.isSuccess).to.be.false;
    }) 

    it('Devia falhar por faltar camiao...', () => {
        let propsStubBad = {
            data : data,
            algoritmo: numeroAlgoritmoStub
        }

        // @ts-ignore: Unreachable code error
        let planeamentoRequest = PlaneamentoRequest.cria(propsStubBad);
        
        expect(planeamentoRequest.isFailure).to.be.true;
        expect(planeamentoRequest.isSuccess).to.be.false;
    })

    it('Devia falhar por faltar data...', () => {
        let propsStubBad = {
            camiao: camiaoIDStub,
            algoritmo: numeroAlgoritmoStub
        }

        // @ts-ignore: Unreachable code error
        let planeamentoRequest = PlaneamentoRequest.cria(propsStubBad);
        
        expect(planeamentoRequest.isFailure).to.be.true;
        expect(planeamentoRequest.isSuccess).to.be.false;
    })

    it('Devia falhar por faltar algoritmo...', () => {
        let propsStubBad = {
            camiao: camiaoIDStub,
            data : data
        }

        // @ts-ignore: Unreachable code error
        let planeamentoRequest = PlaneamentoRequest.cria(propsStubBad);
        
        expect(planeamentoRequest.isFailure).to.be.true;
        expect(planeamentoRequest.isSuccess).to.be.false;
    })

    it('Devia retornar valor certo para camiaoID...', () => {
        let planeamentoRequest = PlaneamentoRequest.cria(propsStub);
        let esperado = propsStub.camiao;
        let obtido = planeamentoRequest.getValue().camiao;
        
        expect(obtido).to.be.equal(esperado);
        expect(planeamentoRequest.isFailure).to.be.false;
        expect(planeamentoRequest.isSuccess).to.be.true;
    })

    it('Devia retornar valor certo para data...', () => {
        let planeamentoRequest = PlaneamentoRequest.cria(propsStub);
        let esperado = propsStub.data;
        let obtido = planeamentoRequest.getValue().data;
        
        expect(obtido).to.be.equal(esperado);
        expect(planeamentoRequest.isFailure).to.be.false;
        expect(planeamentoRequest.isSuccess).to.be.true;
    })

    it('Devia retornar valor certo para algoritmo...', () => {
        let planeamentoRequest = PlaneamentoRequest.cria(propsStub);
        let esperado = propsStub.algoritmo;
        let obtido = planeamentoRequest.getValue().algoritmo;
        
        expect(obtido).to.be.equal(esperado);
        expect(planeamentoRequest.isFailure).to.be.false;
        expect(planeamentoRequest.isSuccess).to.be.true;
    })
})
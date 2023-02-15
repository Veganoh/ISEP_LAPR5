process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import { CamiaoId } from '../../../../src/domain/camiao/camiaoId';
import { Rota } from "../../../../src/domain/planeamento/rota";

const sinon = require('sinon');

describe('/Testes Unitários da entidade Rota', () => {
    
    let propsStub;
    let rotastub;
    let camiaostub;
    let datastub;

    beforeAll(function(done) {

        rotastub = ["001", "002", "003", "004"];
        camiaostub = new CamiaoId("CA-10-10");
        datastub = new Date("2022-12-10");

        propsStub = {
            camiao: camiaostub,
            data: datastub,
            rota: rotastub
        }

        done();
    });

    it('Devia criar com sucesso...', () => {
        let rota = Rota.cria(propsStub);
        
        expect(rota.isSuccess).to.be.true;
        expect(rota.isFailure).to.be.false;
    })

    it('Devia falhar por ser null...', () => {
        // @ts-ignore: Unreachable code error
        const rota = Rota.cria(null);

        expect(rota.isFailure).to.be.true;
        expect(rota.isSuccess).to.be.false;
    }) 

    it('Devia falhar por faltar lista de armazens...', () => {
        let propsStubBad = {
            camiao: camiaostub,
            data: datastub,
        }

        // @ts-ignore: Unreachable code error
        let rota = Rota.cria(propsStubBad);
        
        expect(rota.isFailure).to.be.true;
        expect(rota.isSuccess).to.be.false;
    })

    it('Devia falhar por faltar lista de camiaoID...', () => {
        let propsStubBad = {
            data: datastub,
            rota: rotastub
        }

        // @ts-ignore: Unreachable code error
        let rota = Rota.cria(propsStubBad);
        
        expect(rota.isFailure).to.be.true;
        expect(rota.isSuccess).to.be.false;
    })

    it('Devia falhar por faltar lista de data...', () => {
        let propsStubBad = {
            camiao: camiaostub,
            rota: rotastub
        }

        // @ts-ignore: Unreachable code error
        let rota = Rota.cria(propsStubBad);
        
        expect(rota.isFailure).to.be.true;
        expect(rota.isSuccess).to.be.false;
    })

    it('Devia retornar valor certo para os valores...', () => {
        let rota = Rota.cria(propsStub);
        let esperado = propsStub.rota;
        let obtido = rota.getValue().rota;
        
        expect(obtido).to.be.equal(esperado);

        let esperado1 = propsStub.camiao.toString();
        let obtido1 = rota.getValue().camiao.toString();

        expect(obtido1).to.be.equal(esperado1);

        let esperado2 = propsStub.data.toString();
        let obtido2 = rota.getValue().data.toString();

        expect(obtido2).to.be.equal(esperado2);

        expect(rota.isFailure).to.be.false;
        expect(rota.isSuccess).to.be.true;
    })
})
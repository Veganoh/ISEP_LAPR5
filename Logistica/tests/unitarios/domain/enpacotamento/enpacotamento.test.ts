process.env.NODE_ENV = 'test';


import { expect } from 'chai';
import { Enpacotamento } from "../../../../src/domain/enpacotamento/enpacotamento";
import { EnpacotamentoId } from "../../../../src/domain/enpacotamento/enpacotamentoId";
import { EnpacotamentoEntrega } from "../../../../src/domain/enpacotamento/empacotamentoEntrega";
import { EnpacotamentoCoordenadas } from "../../../../src/domain/enpacotamento/enpacotamentoCoordenadas"; 
import { EnpacotamentoTempos } from '../../../../src/domain/enpacotamento/enpacotamentoTempos';
import { CamiaoId } from '../../../../src/domain/camiao/camiaoId';

const sinon = require('sinon');

describe('/Testes Unitários da entidade Enpacotamento', () => {
    let enpacotamentoId;
    let propsStub;
    let entregaStub;
    let matriculaStub;
    let tempoColocacaoStub;
    let tempoRetiradaStub;
    let coordenadaXStub;
    let coordenadaYStub;
    let coordenadaZStub;

    beforeEach(function(done) {
        enpacotamentoId = new EnpacotamentoId(1);

        entregaStub = sinon.stub(EnpacotamentoEntrega.prototype,'value').get(function getterFn(){ return "E01"});
        matriculaStub = new CamiaoId("CA-10-10");

        tempoColocacaoStub = sinon.stub(EnpacotamentoTempos.prototype,'colocacao').get(function getterFn(){ return 2});
        tempoRetiradaStub = sinon.stub(EnpacotamentoTempos.prototype,'retirada').get(function getterFn(){ return 3});

        coordenadaXStub = sinon.stub(EnpacotamentoCoordenadas.prototype,'valueX').get(function getterFn(){ return 2});
        coordenadaYStub = sinon.stub(EnpacotamentoCoordenadas.prototype,'valueY').get(function getterFn(){ return 5});
        coordenadaZStub = sinon.stub(EnpacotamentoCoordenadas.prototype,'valueZ').get(function getterFn(){ return 9});



        propsStub = {
            entrega : entregaStub,
            matricula : matriculaStub,
            tempos : {tempoColocacaoStub,tempoRetiradaStub},
            coordenadas : {coordenadaXStub,coordenadaYStub,coordenadaZStub}
        }
        done();
    });
    
    it('1. Deve criar com sucesso...', () => {
        let enpacotamento = Enpacotamento.cria(propsStub,enpacotamentoId);

        expect(enpacotamento.isSuccess).to.be.true;
        expect(enpacotamento.isFailure).to.be.false;
    })

    it('2. Deve criar com sucesso sem id...', () => {
        let enpacotamento = Enpacotamento.cria(propsStub);

        expect(enpacotamento.isSuccess).to.be.true;
        expect(enpacotamento.isFailure).to.be.false;
    })

    it('3. Deve falhar por ser null...', () => {
        // @ts-ignore: Unreachable code error
        let enpacotamento = Enpacotamento.cria(null);

        expect(enpacotamento.isSuccess).to.be.false;
        expect(enpacotamento.isFailure).to.be.true;
    })

    it('4.Devia falhar por faltar entrega...', () => {
        let propsStubBad = {
            matricula : matriculaStub,
            tempos :  {tempoColocacaoStub,tempoRetiradaStub},
            coordenadas : {coordenadaXStub,coordenadaYStub,coordenadaZStub}
        }
        // @ts-ignore: Unreachable code error
        let percurso = Enpacotamento.cria(propsStubBad);
        
        expect(percurso.isFailure).to.be.true;
        expect(percurso.isSuccess).to.be.false;
    })

    it('5.Devia falhar por faltar coordenadas...', () => {
        let propsStubBad = {
            entrega : entregaStub,
            matricula : matriculaStub,
            tempos :  {tempoColocacaoStub,tempoRetiradaStub},
        }
        // @ts-ignore: Unreachable code error
        let percurso = Enpacotamento.cria(propsStubBad);
        
        expect(percurso.isFailure).to.be.true;
        expect(percurso.isSuccess).to.be.false;
    })

    it('6.Devia retornar valor certo para entrega...', () => {
        let entrega = Enpacotamento.cria(propsStub, enpacotamentoId);
        let esperado = propsStub.entrega;
        let obtido = entrega.getValue().entrega;
        
        expect(obtido).to.be.equal(esperado);
        expect(entrega.isFailure).to.be.false;
        expect(entrega.isSuccess).to.be.true;
    })

    it('7.Devia retornar valor certo para coordenada...', () => {
        let entrega = Enpacotamento.cria(propsStub, enpacotamentoId);
        let esperado = propsStub.coordenadas;
        let obtido = entrega.getValue().coordenadas;
        
        expect(obtido).to.be.equal(esperado);
        expect(entrega.isFailure).to.be.false;
        expect(entrega.isSuccess).to.be.true;
    })



});

import chai from 'chai';
import { EnpacotamentoEntrega } from '../../../src/app/domain/enpacotamento/empacotamentoEntrega';

const expect = chai.expect;

describe('/Testes Unitários do value object EnpacotamentoEntrega', () => {


    it('1.Deve verificar se a entrega válida é criada com sucesso...',() => {
        let entregaEnpacotamento = EnpacotamentoEntrega.cria("abc");
        expect(entregaEnpacotamento.isSuccess).to.be.true;
        expect(entregaEnpacotamento.isFailure).to.be.false;
    })

    it('2.Deve verificar se a entrega inválida null é criada com insucesso...',() => {
        // @ts-ignore : Unreachable code error
        let entregaEnpacotamento = EnpacotamentoEntrega.cria(null);
        expect(entregaEnpacotamento.isSuccess).to.be.false;
        expect(entregaEnpacotamento.isFailure).to.be.true;
        expect(entregaEnpacotamento.error).to.exist;
    })

    it('3.Deve verificar se a entrega possui o valor correto...',() => {
        let esperado : string = "abc";
        let entregaEnpacotamento = EnpacotamentoEntrega.cria(esperado);
        let obtido = entregaEnpacotamento.getValue().value;

        expect(esperado).to.be.equal(obtido);
    })
    
})
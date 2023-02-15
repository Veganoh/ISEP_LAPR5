import chai from 'chai';
import { EnpacotamentoTempos } from '../../../src/app/domain/enpacotamento/enpacotamentoTempos';
const expect = chai.expect;

describe('/Testes Unitários do value object EnpacotamentoCoordenadas', () => {

    const tempoValido = 30;
    const tempoInvalido = -10;

    it('1.Deve verificar se os tempos válidos são criados com sucesso...',() => {
        let enpacotametnoTempos = EnpacotamentoTempos.cria(tempoValido,tempoValido);
        expect(enpacotametnoTempos.isSuccess).to.be.true;
        expect(enpacotametnoTempos.isFailure).to.be.false;
    })

    it('2.Deve verificar se o tempo colocação inválido é criado com insucesso...',() => {
        let enpacotametnoTempos = EnpacotamentoTempos.cria(tempoInvalido,tempoValido);
        expect(enpacotametnoTempos.isSuccess).to.be.false;
        expect(enpacotametnoTempos.isFailure).to.be.true;
    })

    it('3.Deve verificar se o tempo retirada inválido é criado com insucesso...',() => {
        let enpacotametnoTempos = EnpacotamentoTempos.cria(tempoValido,tempoInvalido);
        expect(enpacotametnoTempos.isSuccess).to.be.false;
        expect(enpacotametnoTempos.isFailure).to.be.true;
    })

    it('5.Deve verificar se a entrega possui o valor correto...',() => {
        let esperadoColocacao : number = 30;
        let esperadoRetirada : number = 30;


        let enpacotametnoTempos = EnpacotamentoTempos.cria(tempoValido,tempoValido);
        let obtidoColocacao = enpacotametnoTempos.getValue().colocacao;
        let obtidoRetirada = enpacotametnoTempos.getValue().retirada;

        expect(esperadoColocacao).to.be.equal(obtidoColocacao);
        expect(esperadoRetirada).to.be.equal(obtidoRetirada);
    })

    it('6.Deve verificar se a coordenada inválida null é criada com insucesso...',() => {
        // @ts-ignore : Unreachable code error
        let enpacotametnoTempos = EnpacotamentoTempos.cria(null);
        expect(enpacotametnoTempos.isSuccess).to.be.false;
        expect(enpacotametnoTempos.isFailure).to.be.true;
    })
})
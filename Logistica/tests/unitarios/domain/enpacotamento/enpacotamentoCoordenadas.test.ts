import chai from 'chai';
import { EnpacotamentoCoordenadas } from "../../../../src/domain/enpacotamento/enpacotamentoCoordenadas";

const expect = chai.expect;

describe('/Testes Unitários do value object EnpacotamentoCoordenadas', () => {


    it('1,Deve verificar se a coordenada válida é criada com sucesso...',() => {
        let entregaCoordenada = EnpacotamentoCoordenadas.cria(5,3,2);
        expect(entregaCoordenada.isSuccess).to.be.true;
        expect(entregaCoordenada.isFailure).to.be.false;
    })

    it('2,Deve verificar se a coordenada X inválida é criada com insucesso...',() => {
        let entregaCoordenada = EnpacotamentoCoordenadas.cria(10,2,3);
        expect(entregaCoordenada.isSuccess).to.be.false;
        expect(entregaCoordenada.isFailure).to.be.true;
    })

    it('3,Deve verificar se a coordenada Y inválida é criada com insucesso...',() => {
        let entregaCoordenada = EnpacotamentoCoordenadas.cria(5,-2,3);
        expect(entregaCoordenada.isSuccess).to.be.false;
        expect(entregaCoordenada.isFailure).to.be.true;
    })

    it('4,Deve verificar se a coordenada Z inválida é criada com insucesso...',() => {
        let entregaCoordenada = EnpacotamentoCoordenadas.cria(9,2,0);
        expect(entregaCoordenada.isSuccess).to.be.false;
        expect(entregaCoordenada.isFailure).to.be.true;
    })

    it('5.Deve verificar se as coordenadas possuem o valor correto...',() => {
        let esperadoX : number = 3;
        let esperadoY : number = 2;
        let esperadoZ : number = 7;

        let entregaCoordenada = EnpacotamentoCoordenadas.cria(3,2,7);
        let obtidoX = entregaCoordenada.getValue().valueX;
        let obtidoY = entregaCoordenada.getValue().valueY;
        let obtidoZ = entregaCoordenada.getValue().valueZ;

        expect(esperadoX).to.be.equal(obtidoX);
        expect(esperadoY).to.be.equal(obtidoY);
        expect(esperadoZ).to.be.equal(obtidoZ);
    })

    it('6.Deve verificar se a coordenada inválida null é criada com insucesso...',() => {
        // @ts-ignore : Unreachable code error
        let entregaCoordenada = EnpacotamentoCoordenadas.cria(null);
        expect(entregaCoordenada.isSuccess).to.be.false;
        expect(entregaCoordenada.isFailure).to.be.true;
    })
})
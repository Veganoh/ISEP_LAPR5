import { expect } from 'chai';
import { Enpacotamento } from '../../src/app/domain/enpacotamento/enpacotamento';
import { EnpacotamentoEntrega } from '../../src/app/domain/enpacotamento/empacotamentoEntrega';
import { EnpacotamentoCoordenadas } from '../../src/app/domain/enpacotamento/enpacotamentoCoordenadas';
import { EnpacotamentoTempos } from '../../src/app/domain/enpacotamento/enpacotamentoTempos';
import { CamiaoId } from '../../src/app/domain/camiao/camiaoId';
import { EnpacotamentoMap } from '../../src/app/mappers/enpacotamentoMap';

describe('/Testes do mapper do Enpacotamento ', () => {

    let entrega = EnpacotamentoEntrega.cria("alt").getValue();
    let coordenadas = EnpacotamentoCoordenadas.cria(2,5,7).getValue();
    let tempos = EnpacotamentoTempos.cria(1,2).getValue();
    let matricula = new CamiaoId("CA-10-10");
    let enpacotamento = Enpacotamento.cria({entrega,matricula,tempos,coordenadas});
    let enpacotamentoDTO = EnpacotamentoMap.toDTO(enpacotamento.getValue());

    it('1.Deve verificar se o enpacotamentoDTO válido é criado com sucesso...',() => {
        expect(enpacotamentoDTO).to.be.not.null;
    })

    it('2.Deve verificar se o enpacotamentoDTO contêm o valor correto de entrega...',() => {
        let esperado : string = "alt";
        let obtido = enpacotamentoDTO.entrega;

        expect(esperado).to.be.equal(obtido);
    })

    it('3.Deve verificar se o enpacotamentoDTO contêm o valor correto de coordenada X...',() => {
        let esperado : number = 2;
        let obtido = enpacotamentoDTO.coordenadaX;

        expect(esperado).to.be.equal(obtido);
    })

    it('4.Deve verificar se o enpacotamentoDTO contêm o valor correto de coordenada Y...',() => {
        let esperado : number = 5;
        let obtido = enpacotamentoDTO.coordenadaY;

        expect(esperado).to.be.equal(obtido);
    })

    it('5.Deve verificar se o enpacotamentoDTO contêm o valor correto de coordenada Y...',() => {
        let esperado : number = 7;
        let obtido = enpacotamentoDTO.coordenadaZ;

        expect(esperado).to.be.equal(obtido);
    })

    it('6.Deve verificar se o enpacotamento válido é criado com sucesso...',() => {
        let enpacotamentoTest = EnpacotamentoMap.toDomain(enpacotamentoDTO);
        expect(enpacotamentoTest).to.be.not.null;
    })

    it('7.Deve verificar se o enpacotamento contêm o valor correto de entrega...',() => {
        let esperado : string = "alt";
        let enpacotamentoTest = EnpacotamentoMap.toDomain(enpacotamentoDTO);
        let obtido = enpacotamentoTest.entrega.value;
        expect(esperado).to.be.equal(obtido);
    })

    it('8.Deve verificar se o enpacotamento contêm o valor correto de coordenada X...',() => {
        let esperado : number = 2;
        let enpacotamentoTest = EnpacotamentoMap.toDomain(enpacotamentoDTO);
        let obtido = enpacotamentoTest.coordenadas.valueX;
        expect(esperado).to.be.equal(obtido);
    })

    it('9.Deve verificar se o enpacotamento contêm o valor correto de coordenada Y...',() => {
        let esperado : number = 5;
        let enpacotamentoTest = EnpacotamentoMap.toDomain(enpacotamentoDTO);
        let obtido = enpacotamentoTest.coordenadas.valueY;
        expect(esperado).to.be.equal(obtido);
    })

    it('10.Deve verificar se o enpacotamento contêm o valor correto de coordenada Z...',() => {
        let esperado : number = 7;
        let enpacotamentoTest = EnpacotamentoMap.toDomain(enpacotamentoDTO);
        let obtido = enpacotamentoTest.coordenadas.valueZ;
        expect(esperado).to.be.equal(obtido);
    })
})
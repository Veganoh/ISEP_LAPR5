import { expect } from 'chai';
import { Enpacotamento } from '../../../src/app/domain/enpacotamento/enpacotamento';
import { EnpacotamentoEntrega } from '../../../src/app/domain/enpacotamento/empacotamentoEntrega';
import { EnpacotamentoCoordenadas } from '../../../src/app/domain/enpacotamento/enpacotamentoCoordenadas';
import { EnpacotamentoTempos } from '../../../src/app/domain/enpacotamento/enpacotamentoTempos';
import { CamiaoId } from '../../../src/app/domain/camiao/camiaoId';


describe('/Testes da entidade Enpacotamento', () => {

    
    let entrega = EnpacotamentoEntrega.cria("alt").getValue();
    let coordenada = EnpacotamentoCoordenadas.cria(2,5,7).getValue();
    let tempos = EnpacotamentoTempos.cria(1,2).getValue();
    let matricula = new CamiaoId("CA-10-10");
    let enpacotamento = Enpacotamento.cria({
        entrega:entrega,
        matricula: matricula,
        tempos: tempos,
        coordenadas: coordenada
    });
    
    it('1.Deve verificar se o enpacotamento válido é criado com sucesso...',() => {
        expect(enpacotamento.isSuccess).to.be.true;
        expect(enpacotamento.isFailure).to.be.false;
    })

    it('2.Deve verificar se o enpacotamento contêm o valor correto de entrega...',() => {
        let esperado : string = "alt";
        let obtido = enpacotamento.getValue().entrega.value;

        expect(esperado).to.be.equal(obtido);
    })

    it('3.Deve verificar se o enpacotamento contêm o valor correto de coordenada X...',() => {
        let esperado : number = 2;
        let obtido = enpacotamento.getValue().coordenadas.valueX;

        expect(esperado).to.be.equal(obtido);
    })

    it('4.Deve verificar se o enpacotamento contêm o valor correto de coordenada Y...',() => {
        let esperado : number = 5;
        let obtido = enpacotamento.getValue().coordenadas.valueY;

        expect(esperado).to.be.equal(obtido);
    })
    it('5.Deve verificar se o enpacotamento contêm o valor correto de coordenada Z...',() => {
        let esperado : number = 7;
        let obtido = enpacotamento.getValue().coordenadas.valueZ;

        expect(esperado).to.be.equal(obtido);
    })
})
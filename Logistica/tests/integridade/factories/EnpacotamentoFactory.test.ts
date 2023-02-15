import chai from 'chai';

import { EnpacotamentoFactory} from "../../../src/factories/EnpacotamentoFactory";
import  IEnpacotamentoDTO from "../../../src/dto/IEnpacotamentoDTO";


const expect = chai.expect;

describe('/Testes da EnpacotamentoFactory', () => {

    let id : string = '1';
    let enpacotamentoId : number = 1;
    let entrega : string = "ABC";
    let matricula: string = 'CA-10-10';
    let tempoColocacao: number = 2;
    let tempoRetirada: number = 4;
    let coordenadaX : number = 4;
    let coordenadaY : number = 3;
    let coordenadaZ : number = 6;
    
    let enpacotamentoDTO : IEnpacotamentoDTO = {
        id, enpacotamentoId,entrega,matricula,tempoColocacao,tempoRetirada,coordenadaX,coordenadaY,coordenadaZ,
    }

    it('1.Deve verificar se o enpacotamento válido é criado com sucesso...',() => {
        
        let enpacotamento = EnpacotamentoFactory.criarEnpacotamentoComDTO(enpacotamentoDTO);
        expect(enpacotamento.isSuccess).to.be.true;
        expect(enpacotamento.isFailure).to.be.false;
    })

    it('2.Deve verificar se o enpacotamento contêm o valor correto de entrega...',() => {
        let esperado : string = "ABC";
        let enpacotamento = EnpacotamentoFactory.criarEnpacotamentoComDTO(enpacotamentoDTO);
        let obtido = enpacotamento.getValue().entrega.value;

        expect(esperado).to.be.equal(obtido);
    })

    it('3.Deve verificar se o enpacotamento contêm o valor correto de coordenada X...',() => {
        let esperado : number = 4;
        let enpacotamento = EnpacotamentoFactory.criarEnpacotamentoComDTO(enpacotamentoDTO);
        let obtido = enpacotamento.getValue().coordenadas.valueX;

        expect(esperado).to.be.equal(obtido);
    })

    it('4.Deve verificar se o enpacotamento contêm o valor correto de coordenada Y...',() => {
        let esperado : number = 3;
        let enpacotamento = EnpacotamentoFactory.criarEnpacotamentoComDTO(enpacotamentoDTO);
        let obtido = enpacotamento.getValue().coordenadas.valueY;

        expect(esperado).to.be.equal(obtido);
    })

    it('5.Deve verificar se o enpacotamento contêm o valor correto de coordenada Z...',() => {
        let esperado : number = 6;
        let enpacotamento = EnpacotamentoFactory.criarEnpacotamentoComDTO(enpacotamentoDTO);
        let obtido = enpacotamento.getValue().coordenadas.valueZ;

        expect(esperado).to.be.equal(obtido);
    })

    it('6.Deve verificar se o enpacotamento com coordenada X inválida é criado com insucesso...',() => {
        
        enpacotamentoDTO = {id,enpacotamentoId,entrega,matricula,tempoColocacao,tempoRetirada,coordenadaX : -1,coordenadaY,coordenadaZ}

        let enpacotamento = EnpacotamentoFactory.criarEnpacotamentoComDTO(enpacotamentoDTO);
        expect(enpacotamento.isSuccess).to.be.false;
        expect(enpacotamento.isFailure).to.be.true;
    })

    it('7.Deve verificar se o enpacotamento com coordenada Y inválida é criado com insucesso...',() => {
        
        enpacotamentoDTO = {id,enpacotamentoId,entrega,matricula,tempoColocacao,tempoRetirada,coordenadaX,coordenadaY: 25,coordenadaZ}

        let enpacotamento = EnpacotamentoFactory.criarEnpacotamentoComDTO(enpacotamentoDTO);
        expect(enpacotamento.isSuccess).to.be.false;
        expect(enpacotamento.isFailure).to.be.true;
    })

    it('9.Deve verificar se o enpacotamento com coordenada Z inválida é criado com insucesso...',() => {
        
        enpacotamentoDTO = {id,enpacotamentoId,entrega,matricula,tempoColocacao,tempoRetirada,coordenadaX,coordenadaY,coordenadaZ : -3}

        let enpacotamento = EnpacotamentoFactory.criarEnpacotamentoComDTO(enpacotamentoDTO);
        expect(enpacotamento.isSuccess).to.be.false;
        expect(enpacotamento.isFailure).to.be.true;
    })
})

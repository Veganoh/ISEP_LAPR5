import { expect } from 'chai';
import { Percurso } from "../../src/app/domain/percurso/percurso";
import { PercursoId } from "../../src/app/domain/percurso/percursoId";
import { PercursoArmazem } from "../../src/app/domain/percurso/percursoArmazem";
import { PercursoDistancia } from "../../src/app/domain/percurso/percursoDistancia";
import { PercursoEnergiaGasta } from "../../src/app/domain/percurso/percursoEnergiaGasta";
import { PercursoTempoBase } from "../../src/app/domain/percurso/percursoTempoBase";
import { PercursoTempoExtra } from "../../src/app/domain/percurso/percursoTempoExtra";
import { Result } from '../../src/app/core/logic/Result';
import { percursoFactory } from '../../src/app/factories/percursoFactory';
import IPercursoDTO from '../../src/app/interfaces/IPercursoDTO';
const sinon = require('sinon');

describe('/Testes Unitários da factory Percurso', () => {
    let percursoId;
    let percursoDTO: IPercursoDTO;
    let armazemOrigStub: PercursoArmazem | undefined;
    let armazemDestStub: PercursoArmazem | undefined;
    let energiaGastaStub: PercursoEnergiaGasta | undefined;
    let distanciaStub: PercursoDistancia | undefined;
    let tempoBaseStub: PercursoTempoBase | undefined;
    let tempoExtraStub: PercursoTempoExtra | undefined;


    beforeAll(function(done) {
        percursoId = new PercursoId(1);

        armazemOrigStub = sinon.stub(PercursoArmazem.prototype, 'value').get(function getterFn() { return "M01"; });
        armazemDestStub = sinon.stub(PercursoArmazem.prototype, 'value').get(function getterFn() { return "M02"; });
        energiaGastaStub = sinon.stub(PercursoEnergiaGasta.prototype, 'value').get(function getterFn() { return 45; });
        distanciaStub = sinon.stub(PercursoDistancia.prototype, 'value').get(function getterFn() { return 80; });
        tempoBaseStub = sinon.stub(PercursoTempoBase.prototype, 'value').get(function getterFn() { return 120; });
        tempoExtraStub = sinon.stub(PercursoTempoExtra.prototype, 'value').get(function getterFn() { return 0; });
        

        percursoDTO = {
            id: "1",
            domainId: 1,
            armazemOrigem: "M01",
            armazemDestino: "M02",
            distancia: 80,
            tempoBase: 190,
            tempoExtra: 0,
            energiaGasta: 52
        };

        done();
    });

    afterEach(function(done) {
        sinon.restore();

        done();
    });

    it('Devia criar com sucesso...', () => {
        sinon.stub(PercursoArmazem, 'cria')
            .onFirstCall().returns( Result.ok<PercursoArmazem>(armazemOrigStub))
            .onSecondCall().returns( Result.ok<PercursoArmazem>(armazemDestStub));
        sinon.stub(PercursoEnergiaGasta, 'cria').returns( Result.ok<PercursoEnergiaGasta>(energiaGastaStub));
        sinon.stub(PercursoDistancia, 'cria').returns( Result.ok<PercursoDistancia>(distanciaStub));
        sinon.stub(PercursoTempoBase, 'cria').returns( Result.ok<PercursoTempoBase>(tempoBaseStub));
        sinon.stub(PercursoTempoExtra, 'cria').returns( Result.ok<PercursoTempoExtra>(tempoExtraStub));

        let percurso = percursoFactory.criarPercursoComDTO(percursoDTO);
        
        expect(percurso.isSuccess).to.be.true;
        expect(percurso.isFailure).to.be.false;
        expect(percurso.getValue()).to.not.be.undefined;
    })

    it('Devia falhar por falha no armazem origem...', () => {
        sinon.stub(PercursoArmazem, 'cria').onFirstCall().returns( Result.fail( "mensagem erro"));

        let percurso = percursoFactory.criarPercursoComDTO(percursoDTO);
        
        expect(percurso.isSuccess).to.be.false;
        expect(percurso.isFailure).to.be.true;
    })

    it('Devia falhar por falha no armazem destino...', () => {
        sinon.stub(PercursoArmazem, 'cria')
            .onFirstCall().returns( Result.ok<PercursoArmazem>(armazemOrigStub))
            .onSecondCall().returns( Result.fail( "mensagem erro") );

        let percurso = percursoFactory.criarPercursoComDTO(percursoDTO);
        
        expect(percurso.isSuccess).to.be.false;
        expect(percurso.isFailure).to.be.true;
    })

    it('Devia falhar por falha na energiaGasta...', () => {
        sinon.stub(PercursoArmazem, 'cria')
            .onFirstCall().returns( Result.ok<PercursoArmazem>(armazemOrigStub))
            .onSecondCall().returns( Result.ok<PercursoArmazem>(armazemDestStub));
        sinon.stub(PercursoEnergiaGasta, 'cria').returns( Result.fail( "mensagem erro") );

        let percurso = percursoFactory.criarPercursoComDTO(percursoDTO);
        
        expect(percurso.isSuccess).to.be.false;
        expect(percurso.isFailure).to.be.true;
    })

    it('Devia falhar por falha no Distancia...', () => {
        sinon.stub(PercursoArmazem, 'cria')
            .onFirstCall().returns( Result.ok<PercursoArmazem>(armazemOrigStub))
            .onSecondCall().returns( Result.ok<PercursoArmazem>(armazemDestStub));
        sinon.stub(PercursoEnergiaGasta, 'cria').returns( Result.ok<PercursoEnergiaGasta>(energiaGastaStub) );
        sinon.stub(PercursoDistancia, 'cria').returns( Result.fail( "mensagem erro") );

        let percurso = percursoFactory.criarPercursoComDTO(percursoDTO);
        
        expect(percurso.isSuccess).to.be.false;
        expect(percurso.isFailure).to.be.true;
    })

    it('Devia falhar por falha no tempoBase...', () => {
        sinon.stub(PercursoArmazem, 'cria')
            .onFirstCall().returns( Result.ok<PercursoArmazem>(armazemOrigStub))
            .onSecondCall().returns( Result.ok<PercursoArmazem>(armazemDestStub));
        sinon.stub(PercursoEnergiaGasta, 'cria').returns( Result.ok<PercursoEnergiaGasta>(energiaGastaStub) );
        sinon.stub(PercursoDistancia, 'cria').returns( Result.ok<PercursoDistancia>(distanciaStub));
        sinon.stub(PercursoTempoBase, 'cria').returns( Result.fail( "mensagem erro") );

        let percurso = percursoFactory.criarPercursoComDTO(percursoDTO);
        
        expect(percurso.isSuccess).to.be.false;
        expect(percurso.isFailure).to.be.true;
    })

    it('Devia falhar por falha no tempoExtra...', () => {
        sinon.stub(PercursoArmazem, 'cria')
            .onFirstCall().returns( Result.ok<PercursoArmazem>(armazemOrigStub))
            .onSecondCall().returns( Result.ok<PercursoArmazem>(armazemDestStub));
        sinon.stub(PercursoEnergiaGasta, 'cria').returns( Result.ok<PercursoEnergiaGasta>(energiaGastaStub) );
        sinon.stub(PercursoDistancia, 'cria').returns( Result.ok<PercursoDistancia>(distanciaStub));
        sinon.stub(PercursoTempoBase, 'cria').returns( Result.ok<PercursoTempoBase>(tempoBaseStub));
        sinon.stub(PercursoTempoExtra, 'cria').returns( Result.fail( "mensagem erro"));

        let percurso = percursoFactory.criarPercursoComDTO(percursoDTO);
        
        expect(percurso.isSuccess).to.be.false;
        expect(percurso.isFailure).to.be.true;
    })
})
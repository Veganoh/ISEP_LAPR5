import 'reflect-metadata';

import { expect } from 'chai';
import * as sinon from 'sinon';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import EnpacotamentoService from "../../../src/services/enpacotamentoService";
import { Enpacotamento } from "../../../src/domain/enpacotamento/enpacotamento";
import { EnpacotamentoFactory } from '../../../src/factories/EnpacotamentoFactory';
import { EnpacotamentoMap } from '../../../src/mappers/EnpacotamentoMap';
import IEnpacotamentoRepo from '../../../src/services/IRepos/IEnpacotamentoRepo';
import IEntregaRepo from '../../../src/services/IRepos/IEntregaRepo';
import ICamiaoRepo from '../../../src/services/IRepos/ICamiaoRepo';
import {Camiao} from "../../../src/domain/camiao/camiao";


describe('Testes Unitários para o Serviço de Enpacotamento', function() {

    let enpacotamentoSchemaInstance;
    let enpacotamentoRepoClass;
    let enpacotamentoRepoInstance;
    let entregaRepoClass;
    let camiaoSchemaInstance;
    let camiaoRepoClass;
    let camiaoRepoInstance;
    let entregaRepoInstance;
    let camiao;
    let camiaoDTO;
    let enpacotamentoDTO;
    let enpacotamento;

    beforeEach(function(done){
        enpacotamentoSchemaInstance = require("../../../src/persistence/schemas/enpacotamentoSchema").default;
        Container.set("enpacotamentoSchema", enpacotamentoSchemaInstance);

        camiaoSchemaInstance = require("../../../src/persistence/schemas/camiaoSchema").default;
        Container.set("camiaoSchema", camiaoSchemaInstance);

        enpacotamentoRepoClass = require("../../../src/repos/enpacotamentoRepo").default;
        enpacotamentoRepoInstance = Container.get(enpacotamentoRepoClass);
        Container.set("EnpacotamentoRepo",enpacotamentoRepoInstance);

        entregaRepoClass = require("../../../src/repos/entregaRepo").default;
        entregaRepoInstance = Container.get(entregaRepoClass);
        Container.set("EntregaRepo",entregaRepoInstance);

        camiaoRepoClass = require("../../../src/repos/camiaoRepo").default;
        camiaoRepoInstance = Container.get(camiaoRepoClass);
        Container.set("CamiaoRepo",camiaoRepoInstance);

        enpacotamentoDTO = {
            domainId: 1,
            entrega: 'E01',
            matricula: 'CA-10-10',
            tempoColocacao: 2,
            tempoRetirada: 4,
            coordenadaX: 3,
            coordenadaY: 5,
            coordenadaZ: 6,
        };

        camiaoDTO = {
            id: "CA-10-10",
            tara: 800,
            capacidadeCargaTotal: 1200,
            camiaoBateria: 80,
            autonomiaCamiao: 900,
            carregamentoLento: 0,
            carregamentoRapido: 52
        };

        camiao = Camiao.create(camiaoDTO, camiaoDTO.id);

        enpacotamento = Enpacotamento.cria(enpacotamentoDTO,enpacotamentoDTO.domainId);
        sinon.stub(EnpacotamentoFactory,"criarEnpacotamentoComDTO").returns(Result.ok<Enpacotamento>(enpacotamento));
        sinon.stub(EnpacotamentoMap,"toDTO").returns( enpacotamentoDTO);

        done();
    });

    afterEach(function(done){
        sinon.restore();
        done();
    })

    it('1.Devia retornar um DTO ao criar...', async function () {
		sinon.stub(entregaRepoInstance, "exists").returns( true );
        sinon.stub(camiaoRepoInstance,"findByDomainId").returns(camiao);
        sinon.stub(enpacotamentoRepoInstance, "exists").returns( false );
        sinon.stub(enpacotamentoRepoInstance, "save").returns( null );

		const serv = new EnpacotamentoService(enpacotamentoRepoInstance as IEnpacotamentoRepo, entregaRepoInstance as IEntregaRepo, camiaoRepoInstance as ICamiaoRepo);

		let resultadoObtido = await serv.criarEnpacotamento( enpacotamentoDTO );
        let valorObtido = resultadoObtido.getValue();

        entregaRepoInstance.exists.restore();
        camiaoRepoInstance.findByDomainId.restore();
        enpacotamentoRepoInstance.save.restore();
        enpacotamentoRepoInstance.exists.restore();

        
        expect(resultadoObtido.isSuccess).to.be.true;
        expect(valorObtido).to.be.equal( enpacotamentoDTO );
	});

    it('2.Devia retornar um Result.fail ao criar por não existir uma entrega...', async function () {
		sinon.stub(entregaRepoInstance, "exists").returns( false );
        sinon.stub(enpacotamentoRepoInstance, "save").returns( null );

		const serv = new EnpacotamentoService(enpacotamentoRepoInstance as IEnpacotamentoRepo, entregaRepoInstance as IEntregaRepo, camiaoRepoInstance as ICamiaoRepo);

		let resultadoObtido = await serv.criarEnpacotamento( enpacotamentoDTO );

        entregaRepoInstance.exists.restore();
        enpacotamentoRepoInstance.save.restore();
        
        expect(resultadoObtido.isFailure).to.be.true;
	});

    
    it('3.Devia retornar um DTO ao editar...', async function () {
        sinon.stub(enpacotamentoRepoInstance, "findByDomainId").returns( enpacotamento );
        sinon.stub(enpacotamentoRepoInstance, "save").returns( null );

		const serv = new EnpacotamentoService(enpacotamentoRepoInstance as IEnpacotamentoRepo, entregaRepoInstance as IEntregaRepo, camiaoRepoInstance as ICamiaoRepo);

		let resultadoObtido = await serv.editarEnpacotamento( enpacotamentoDTO );
        let valorObtido = resultadoObtido.getValue();

        enpacotamentoRepoInstance.findByDomainId.restore();
        enpacotamentoRepoInstance.save.restore();
        
        expect(resultadoObtido.isSuccess).to.be.true;
		expect(valorObtido).to.be.equal( enpacotamentoDTO );
	}); 
    
    

    it('4.Devia falhar ao editar por não encontrar enpacotamento...', async function () {
        sinon.stub(enpacotamentoRepoInstance, "findByDomainId").returns( null );
        sinon.stub(enpacotamentoRepoInstance, "save").returns( null );

		const serv = new EnpacotamentoService(enpacotamentoRepoInstance as IEnpacotamentoRepo, entregaRepoInstance as IEntregaRepo, camiaoRepoInstance as ICamiaoRepo);

		let resultadoObtido = await serv.editarEnpacotamento( enpacotamentoDTO );

        enpacotamentoRepoInstance.findByDomainId.restore();
        enpacotamentoRepoInstance.save.restore();
        
        expect(resultadoObtido.isFailure).to.be.true;
	});
    

    it('5.Devia retornar uma lista de DTO ao listar Todos...', async function () {
        let lista = [enpacotamento];
        sinon.stub(enpacotamentoRepoInstance, "encontraTodosEnpacotamentos").returns( lista );

		const serv = new EnpacotamentoService(enpacotamentoRepoInstance as IEnpacotamentoRepo, entregaRepoInstance as IEntregaRepo, camiaoRepoInstance as ICamiaoRepo);

		let resultadoObtido = await serv.encontraTodosEnpacotamentos();
        let valorObtido = resultadoObtido.getValue();

        enpacotamentoRepoInstance.encontraTodosEnpacotamentos.restore();
        
        expect(resultadoObtido.isSuccess).to.be.true;
		expect(valorObtido.pop()).to.be.equal( enpacotamentoDTO );
        expect(valorObtido.length).to.be.equal(0);
	});

    it('6.Devia falhar ao listar Todos por não encontrar nenhum...', async function () {
        sinon.stub(enpacotamentoRepoInstance, "encontraTodosEnpacotamentos").returns( null );

		const serv = new EnpacotamentoService(enpacotamentoRepoInstance as IEnpacotamentoRepo, entregaRepoInstance as IEntregaRepo, camiaoRepoInstance as ICamiaoRepo);

		let resultadoObtido = await serv.encontraTodosEnpacotamentos();

        enpacotamentoRepoInstance.encontraTodosEnpacotamentos.restore();
        
        expect(resultadoObtido.isFailure).to.be.true;
	});
})
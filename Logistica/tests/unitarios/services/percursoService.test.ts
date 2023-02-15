import 'reflect-metadata';

import { expect } from 'chai';
import * as sinon from 'sinon';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import PercursoService from "../../../src/services/percursoService";
import { Percurso } from "../../../src/domain/percurso/percurso";
import { percursoFactory } from '../../../src/factories/percursoFactory';
import { PercursoMap } from '../../../src/mappers/PercursoMap';
import IPercursoRepo from '../../../src/services/IRepos/IPercursoRepo';
import IArmazemRepo from '../../../src/services/IRepos/IArmazemRepo';

describe('Testes Unitários para o Serviço de Percurso', function () {
    let percursoSchemaInstance;
    let percursoRepoClass;
    let percursoRepoInstance;
    let armazemRepoClass;
    let armazemRepoInstance;
    let percursoDTO;
    let percurso;

	beforeAll(function(done) {
        percursoSchemaInstance = require("../../../src/persistence/schemas/percursoSchema").default;
		Container.set("percursoSchema", percursoSchemaInstance);

		percursoRepoClass = require("../../../src/repos/percursoRepo").default;
		percursoRepoInstance = Container.get(percursoRepoClass);
		Container.set("PercursoRepo", percursoRepoInstance);

        armazemRepoClass = require("../../../src/repos/armazemRepo").default;
		armazemRepoInstance = Container.get(armazemRepoClass);
		Container.set("ArmazemRepo", armazemRepoInstance);

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

        percurso = Percurso.cria(percursoDTO, percursoDTO.id);

        sinon.stub(percursoFactory, "criarPercursoComDTO").returns( Result.ok<Percurso>( percurso ));
        sinon.stub(PercursoMap, "toDTO").returns( percursoDTO );

        done();
    });

    it('Devia retornar um DTO ao criar...', async function () {
		sinon.stub(armazemRepoInstance, "exists").returns( true );
        sinon.stub(percursoRepoInstance, "save").returns( null );

		const serv = new PercursoService(percursoRepoInstance as IPercursoRepo, armazemRepoInstance as IArmazemRepo);

		let resultadoObtido = await serv.criarPercurso( percursoDTO );
        let valorObtido = resultadoObtido.getValue();

        armazemRepoInstance.exists.restore();
        percursoRepoInstance.save.restore();
        
        expect(resultadoObtido.isSuccess).to.be.true;
        expect(valorObtido).to.be.equal( percursoDTO );
	});

    it('Devia retornar um Result.fail ao criar por não existirem os armazens...', async function () {
		sinon.stub(armazemRepoInstance, "exists").returns( false );
        sinon.stub(percursoRepoInstance, "save").returns( null );

		const serv = new PercursoService(percursoRepoInstance as IPercursoRepo, armazemRepoInstance as IArmazemRepo);

		let resultadoObtido = await serv.criarPercurso( percursoDTO );

        armazemRepoInstance.exists.restore();
        percursoRepoInstance.save.restore();
        
        expect(resultadoObtido.isFailure).to.be.true;
	});

    it('Devia retornar um DTO ao editar...', async function () {
        sinon.stub(percursoRepoInstance, "findByArmazens").returns( percurso );
        sinon.stub(percursoRepoInstance, "save").returns( null );

		const serv = new PercursoService(percursoRepoInstance as IPercursoRepo, armazemRepoInstance as IArmazemRepo);

		let resultadoObtido = await serv.editarPercurso( percursoDTO );
        let valorObtido = resultadoObtido.getValue();

        percursoRepoInstance.findByArmazens.restore();
        percursoRepoInstance.save.restore();
        
        expect(resultadoObtido.isSuccess).to.be.true;
		expect(valorObtido).to.be.equal( percursoDTO );
	});

    it('Devia falhar ao editar por não encontrar percurso...', async function () {
        sinon.stub(percursoRepoInstance, "findByArmazens").returns( null );
        sinon.stub(percursoRepoInstance, "save").returns( null );

		const serv = new PercursoService(percursoRepoInstance as IPercursoRepo, armazemRepoInstance as IArmazemRepo);

		let resultadoObtido = await serv.editarPercurso( percursoDTO );

        percursoRepoInstance.findByArmazens.restore();
        percursoRepoInstance.save.restore();
        
        expect(resultadoObtido.isFailure).to.be.true;
	});

    it('Devia retornar uma lista de DTO ao listar Todos...', async function () {
        let lista = [percurso];
        sinon.stub(percursoRepoInstance, "findAll").returns( lista );

		const serv = new PercursoService(percursoRepoInstance as IPercursoRepo, armazemRepoInstance as IArmazemRepo);

		let resultadoObtido = await serv.listarTodosPercursos();
        let valorObtido = resultadoObtido.getValue();

        percursoRepoInstance.findAll.restore();
        
        expect(resultadoObtido.isSuccess).to.be.true;
		expect(valorObtido.pop()).to.be.equal( percursoDTO );
        expect(valorObtido.length).to.be.equal(0);
	});

    it('Devia falhar ao listar Todos por não encontrar nenhum...', async function () {
        sinon.stub(percursoRepoInstance, "findAll").returns( null );

		const serv = new PercursoService(percursoRepoInstance as IPercursoRepo, armazemRepoInstance as IArmazemRepo);

		let resultadoObtido = await serv.listarTodosPercursos();

        percursoRepoInstance.findAll.restore();
        
        expect(resultadoObtido.isFailure).to.be.true;
	});

    it('Devia retornar um DTO ao listar por Id...', async function () {
        sinon.stub(percursoRepoInstance, "findByDomainId").returns( percurso );

		const serv = new PercursoService(percursoRepoInstance as IPercursoRepo, armazemRepoInstance as IArmazemRepo);

		let resultadoObtido = await serv.listarPercursoPorId( percursoDTO.domainId );
        let valorObtido = resultadoObtido.getValue();

        percursoRepoInstance.findByDomainId.restore();
        
        expect(resultadoObtido.isSuccess).to.be.true;
		expect(valorObtido).to.be.equal( percursoDTO );
	});

    it('Devia falhar ao listar por Id por não encontrar nenhum...', async function () {
        sinon.stub(percursoRepoInstance, "findByDomainId").returns( null );

		const serv = new PercursoService(percursoRepoInstance as IPercursoRepo, armazemRepoInstance as IArmazemRepo);

		let resultadoObtido = await serv.listarPercursoPorId( percursoDTO.domainId );

        percursoRepoInstance.findByDomainId.restore();
        
        expect(resultadoObtido.isFailure).to.be.true;
	});

    it('Devia retornar um DTO ao listar por Armazens...', async function () {
        sinon.stub(percursoRepoInstance, "findByArmazens").returns( percurso );

		const serv = new PercursoService(percursoRepoInstance as IPercursoRepo, armazemRepoInstance as IArmazemRepo);

		let resultadoObtido = await serv.listarPercursoPorArmazens( percursoDTO.armazemOrigem, percursoDTO.armazemDestino );
        let valorObtido = resultadoObtido.getValue();

        percursoRepoInstance.findByArmazens.restore();
        
        expect(resultadoObtido.isSuccess).to.be.true;
		expect(valorObtido).to.be.equal( percursoDTO );
	});

    it('Devia falhar ao listar por Armazens por não encontrar nenhum...', async function () {
        sinon.stub(percursoRepoInstance, "findByArmazens").returns( null );

		const serv = new PercursoService(percursoRepoInstance as IPercursoRepo, armazemRepoInstance as IArmazemRepo);

		let resultadoObtido = await serv.listarPercursoPorArmazens( percursoDTO.armazemOrigem, percursoDTO.armazemDestino );

        percursoRepoInstance.findByArmazens.restore();
        
        expect(resultadoObtido.isFailure).to.be.true;
	});
});



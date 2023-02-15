import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import IPercursoService from "../../../src/services/IServices/IPercursoService";
import PercursoController from "../../../src/controllers/percursoController";
import IPercursoDTO from '../../../src/dto/IPercursoDTO';
import { percursoFactory } from '../../../src/factories/percursoFactory';

describe('Testes de Integridade para o Controller de Percurso', function () {
    let percursoSchemaInstance;
    let percursoRepoClass;
    let percursoRepoInstance;
    let armazemRepoClass;
    let armazemRepoInstance;
    let percursoServiceClass;
    let percursoServiceInstance;
    let body;
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

		percursoServiceClass = require("../../../src/services/percursoService").default;
		percursoServiceInstance = Container.get(percursoServiceClass);
		Container.set("percursoService", percursoServiceInstance);

		percursoServiceInstance = Container.get("percursoService");

        body = {
            domainId: 1,
            armazemOrigem: "M01",
            armazemDestino: "M02",
            distancia: 80,
            tempoBase: 190,
            tempoExtra: 0,
            energiaGasta: 52
        };

        percurso = percursoFactory.criarPercursoComDTO(body).getValue();

        done();
    });

    afterEach(function(done) {
        sinon.restore();

        done();
    });

    it('Devia retornar um json com a informação do criar...', async function () {
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(armazemRepoInstance, "exists").returns( true );
        sinon.stub(percursoRepoInstance, "save").returns( null );

		const ctrl = new PercursoController(percursoServiceInstance as IPercursoService);

		await ctrl.criarPercurso(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "armazemOrigem": "M01",
                "armazemDestino": "M02",
                "distancia": 80,
                "tempoBase": 190,
                "tempoExtra": 0,
                "energiaGasta": 52
            }));
	});

    it('Devia retornar um erro 402 ao criar...', async function () {
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(armazemRepoInstance, "exists").returns( false );
        sinon.stub(percursoRepoInstance, "save").returns( null );

		const ctrl = new PercursoController(percursoServiceInstance as IPercursoService);

		await ctrl.criarPercurso(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match( 402));
	});

    it('Devia retornar um json com a informação do editar...', async function () {
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(percursoRepoInstance, "findByArmazens").returns( percurso );
        sinon.stub(percursoRepoInstance, "save").returns( null );

		const ctrl = new PercursoController(percursoServiceInstance as IPercursoService);

		await ctrl.editarPercurso(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "armazemOrigem": "M01",
                "armazemDestino": "M02",
                "distancia": 80,
                "tempoBase": 190,
                "tempoExtra": 0,
                "energiaGasta": 52
            }));
	});
    
    it('Devia retornar um erro 404 ao editar...', async function () {
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(percursoRepoInstance, "findByArmazens").returns( null );
        sinon.stub(percursoRepoInstance, "save").returns( null );

		const ctrl = new PercursoController(percursoServiceInstance as IPercursoService);

		await ctrl.editarPercurso(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match( 404));
	});

    it('Devia retornar um json com a informação do listar todos...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		let lista = [percurso];
        sinon.stub(percursoRepoInstance, "findAll").returns( lista );

		const ctrl = new PercursoController(percursoServiceInstance as IPercursoService);

		await ctrl.listarTodosPercursos(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
	});

    it('Devia retornar um erro 404 ao listar todos...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(percursoRepoInstance, "findAll").returns( null );

		const ctrl = new PercursoController(percursoServiceInstance as IPercursoService);

		await ctrl.listarTodosPercursos(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match( 404));
	});

    it('Devia retornar um json com a informação do listar por Id...', async function () {
        let req: Partial<Request> = {
            params: { id : "1" }
        };

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(percursoServiceInstance, "listarPercursoPorId").returns( Result.ok<IPercursoDTO>( 
            {
                "id": body.domainId, 
                "domainId": body.domainId, 
                "armazemOrigem": "M01",
                "armazemDestino": "M02",
                "distancia": 80,
                "tempoBase": 190,
                "tempoExtra": 0,
                "energiaGasta": 52
            }));

		const ctrl = new PercursoController(percursoServiceInstance as IPercursoService);

		await ctrl.listarPercursoPorId(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "armazemOrigem": "M01",
                "armazemDestino": "M02",
                "distancia": 80,
                "tempoBase": 190,
                "tempoExtra": 0,
                "energiaGasta": 52
            }));

        percursoServiceInstance.listarPercursoPorId.restore();
	});

    it('Devia retornar um erro 404 ao listar por Id...', async function () {
        let req: Partial<Request> = {
            params: { id : "1" }
        };

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(percursoRepoInstance, "findByDomainId").returns( null );

		const ctrl = new PercursoController(percursoServiceInstance as IPercursoService);

		await ctrl.listarPercursoPorId(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match( 404));
	});

    it('Devia retornar um json com a informação do listar por Armazens...', async function () {
        let req: Partial<Request> = {
            query: {origem : "M01", destino: "M02"}
        };

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(percursoRepoInstance, "findByArmazens").returns( percurso );

		const ctrl = new PercursoController(percursoServiceInstance as IPercursoService);

		await ctrl.listarPercursoPorArmazens(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "armazemOrigem": "M01",
                "armazemDestino": "M02",
                "distancia": 80,
                "tempoBase": 190,
                "tempoExtra": 0,
                "energiaGasta": 52
            }));
	});

    it('Devia retornar um erro 404 ao listar por Armazens...', async function () {
        let req: Partial<Request> = {
            query: {origem : "M01", destino: "M02"}
        };

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(percursoRepoInstance, "findByArmazens").returns( null );

		const ctrl = new PercursoController(percursoServiceInstance as IPercursoService);

		await ctrl.listarPercursoPorArmazens(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match( 404));
	});
});



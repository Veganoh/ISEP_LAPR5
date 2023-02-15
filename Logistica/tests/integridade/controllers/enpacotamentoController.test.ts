import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import IEnpacotamentoService from "../../../src/services/IServices/IEnpacotamentoService";
import EnpacotamentoController from "../../../src/controllers/enpacotamentoController";
import { EnpacotamentoFactory } from '../../../src/factories/EnpacotamentoFactory';
import {CamiaoMap} from '../../../src/mappers/CamiaoMap';

describe('Testes de Integridade para o Controller do Enpacotamento',function() {

    let enpacotamentoSchemaInstance;
    let enpacotamentoRepoClass;
    let enpacotamentoRepoInstance;
    let entregaRepoClass;
    let entregaRepoInstance;
    let enpacotamentoServiceClass;
    let enpacotamentoServiceInstance;
    let camiaoSchemaInstance;
    let camiaoRepoClass;
    let camiaoRepoInstance;
    let camiao;
    let body;
    let body1;
    let enpacotamento;

    beforeEach(function(done) {
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

        enpacotamentoServiceClass = require("../../../src/services/enpacotamentoService").default;
		enpacotamentoServiceInstance = Container.get(enpacotamentoServiceClass);
		Container.set("enpacotamentoService", enpacotamentoServiceInstance);

        enpacotamentoServiceInstance = Container.get("enpacotamentoService");

        body1 = {domainId: 'CA-10-10',tara: 800,capacidadeCargaTotal: 1200,camiaoBateria: 80, autonomiaCamiao: 900,carregamentoLento: 50,carregamentoRapido: 10,ativo: true};
        camiao = CamiaoMap.toDomain(body1);

        body = {domainId: -1,entrega: 'E01',matricula: 'CA-10-10',tempoColocacao: 2,tempoRetirada:4,coordenadaX: 3,coordenadaY: 5,coordenadaZ: 6,};
        enpacotamento = EnpacotamentoFactory.criarEnpacotamentoComDTO(body).getValue();

        done();
    });

    afterEach(function(done) {
        sinon.restore();

        done();
    });

    it('1. Deve retornar um JSON com a informação do criar...', async function () {
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(entregaRepoInstance, "exists").returns( true );
        sinon.stub(camiaoRepoInstance, "findByDomainId").returns(camiao);
        sinon.stub(enpacotamentoRepoInstance, "save").returns( null );
        sinon.stub(enpacotamentoRepoInstance, "exists").returns( false );


        const ctrl = new EnpacotamentoController(enpacotamentoServiceInstance as IEnpacotamentoService);

        await ctrl.criarEnpacotamento(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(   
            {
                "enpacotamentoId": req.body.domainId, 
                "entrega": "E01",
                "matricula": "CA-10-10",
                "tempoColocacao": 2,
                "tempoRetirada":4,
                "coordenadaX": 3,
                "coordenadaY": 5,
                "coordenadaZ": 6,
            }));
        
	});

    it('2. Deve retornar um erro 402 ao criar...', async function () {
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(entregaRepoInstance, "exists").returns( false );
        sinon.stub(enpacotamentoRepoInstance, "save").returns( null );

		const ctrl = new EnpacotamentoController(enpacotamentoServiceInstance as IEnpacotamentoService);

		await ctrl.criarEnpacotamento(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match( 402));
	});

    it('3. Deve retornar um json com a informação do editar...', async function () {
        let req: Partial<Request> = {};
		req.body = {
            domainId: -1,
            matricula: "CA-10-10",
            tempoColocacao: 2,
            tempoRetirada: 4,
            coordenadaX: 3,
            coordenadaY: 5,
            coordenadaZ: 6,
        };

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(enpacotamentoRepoInstance, "findByDomainId").returns( enpacotamento );
        sinon.stub(enpacotamentoRepoInstance, "save").returns( null );

		const ctrl = new EnpacotamentoController(enpacotamentoServiceInstance as IEnpacotamentoService);

		await ctrl.editarEnpacotamento(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "enpacotamentoId": req.body.domainId, 
                "entrega": "E01",
                "matricula": "CA-10-10",
                "tempoColocacao": 2,
                "tempoRetirada":4,
                "coordenadaX": 3,
                "coordenadaY": 5,
                "coordenadaZ": 6,
            }));
	});

    it('4. Deve retornar um erro 404 ao editar...', async function () {
        let req: Partial<Request> = {};
        req.body = {
            domainId: 1,
            matricula: "CA-10-10",
            tempoColocacao: 2,
            tempoRetirada: 4,
            coordenadaX: 3,
            coordenadaY: 5,
            coordenadaZ: 6,
        };

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(enpacotamentoRepoInstance, "findByDomainId").returns( null );
        sinon.stub(enpacotamentoRepoInstance, "save").returns( null );

		const ctrl = new EnpacotamentoController(enpacotamentoServiceInstance as IEnpacotamentoService);

		await ctrl.editarEnpacotamento(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match(404));
	});

    it('5.Deve retornar um json com a informação do listar todos...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        let lista = [enpacotamento];
        sinon.stub(enpacotamentoRepoInstance, "encontraTodosEnpacotamentos").returns( lista );

		const ctrl = new EnpacotamentoController(enpacotamentoServiceInstance as IEnpacotamentoService);

		await ctrl.encontraTodosEnpacotamentos(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
	});

    it('6. Deve retornar um erro 404 ao listar todos...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			status: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

        sinon.stub(enpacotamentoRepoInstance, "encontraTodosEnpacotamentos").returns( null );


		const ctrl = new EnpacotamentoController(enpacotamentoServiceInstance as IEnpacotamentoService);

		await ctrl.encontraTodosEnpacotamentos(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match(404));
	});

    it('7. Deve retornar um erro 404 ao listar por Id...', async function () {
        let req: Partial<Request> = {
            params: { id : "1" }
        };

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(enpacotamentoRepoInstance, "findByDomainId").returns( null );

		const ctrl = new EnpacotamentoController(enpacotamentoServiceInstance as IEnpacotamentoService);

		await ctrl.encontraEnpacotamento(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match(404));
        
	});
})
import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';

import ICamiaoService from "../../../src/services/IServices/ICamiaoService";
import CamiaoController from "../../../src/controllers/camiaoController";
import {ICamiaoDTO} from '../../../src/dto/ICamiaoDTO';

describe('camiao controller tests', function () {
    let camiaoSchemaInstance;
    let camiaoRepoClass;
    let camiaoRepoInstance;
    let camiaoServiceClass;
    let camiaoServiceInstance;
    let body;

    beforeAll(function(done) {
        camiaoSchemaInstance = require("../../../src/persistence/schemas/camiaoSchema").default;
		Container.set("camiaoSchema", camiaoSchemaInstance);

        camiaoRepoClass = require("../../../src/repos/camiaoRepo").default;
		camiaoRepoInstance = Container.get(camiaoRepoClass);
		Container.set("CamiaoRepo", camiaoRepoInstance);

        camiaoServiceClass = require("../../../src/services/camiaoService").default;
		camiaoServiceInstance = Container.get(camiaoServiceClass);
		Container.set("camiaoService", camiaoServiceInstance);

        camiaoServiceInstance = Container.get("camiaoService");

        body = {
            domainId: "AA-00-00",
            tara: 800,
            capacidadeCargaTotal: 1200,
            camiaoBateria: 80,
            autonomiaCamiao: 900,
            carregamentoLento: 50,
            carregamentoRapido: 10,
            ativo: "true"
        };

        done();
    });

    it('Devia retornar um json com a informação do criar...', async function () {
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(camiaoServiceInstance, "createCamiao").returns( Result.ok<ICamiaoDTO>( 
            {
                "id": "AA-00-00", 
                "tara": 800,
                "capacidadeCargaTotal": 1200,
                "camiaoBateria": 80,
                "autonomiaCamiao": 900,
                "carregamentoLento": 50,
                "carregamentoRapido": 10,
                "ativo": true
            }));

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.createCamiao(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "ativo": true,
                "autonomiaCamiao": 900,
                "camiaoBateria": 80,
                "capacidadeCargaTotal": 1200,
                "carregamentoLento": 50,
                "carregamentoRapido": 10,
                "id": req.body.domainId,
                "tara": 800,
            }));
        
        camiaoServiceInstance.createCamiao.restore();
	});

    it('Devia retornar um erro 402 ao criar...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(camiaoServiceInstance, "createCamiao").returns( Result.fail( "error message" ));

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.createCamiao(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match( 402));
        
        camiaoServiceInstance.createCamiao.restore();
	});

    it('Devia retornar um json com a informação do editar...', async function () {
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(camiaoServiceInstance, "updateCamiao").returns( Result.ok<ICamiaoDTO>( 
            {
                "id": "AA-00-00", 
                "tara": 800,
                "capacidadeCargaTotal": 1200,
                "camiaoBateria": 80,
                "autonomiaCamiao": 900,
                "carregamentoLento": 50,
                "carregamentoRapido": 10,
                "ativo": true
            }));

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.updateCamiao(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "ativo": true,
                "autonomiaCamiao": 900,
                "camiaoBateria": 80,
                "capacidadeCargaTotal": 1200,
                "carregamentoLento": 50,
                "carregamentoRapido": 10,
                "id": req.body.domainId,
                "tara": 800,
            }));

        camiaoServiceInstance.updateCamiao.restore();
	});

    it('Devia retornar um erro 404 ao editar...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(camiaoServiceInstance, "updateCamiao").returns( Result.fail( "error message" ));

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.updateCamiao(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match( 404));
        
        camiaoServiceInstance.updateCamiao.restore();
	});

    it('Devia retornar um json com a informação do listar todos...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(camiaoServiceInstance, "encontraTodosCamioes").returns( Result.ok<ICamiaoDTO>( 
            {
                "id": "AA-00-00", 
                "tara": 800,
                "capacidadeCargaTotal": 1200,
                "camiaoBateria": 80,
                "autonomiaCamiao": 900,
                "carregamentoLento": 50,
                "carregamentoRapido": 10,
                "ativo": true
            }));

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.encontraTodosCamioes(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "ativo": true,
                "autonomiaCamiao": 900,
                "camiaoBateria": 80,
                "capacidadeCargaTotal": 1200,
                "carregamentoLento": 50,
                "carregamentoRapido": 10,
                "id": "AA-00-00",
                "tara": 800,
            }));

        camiaoServiceInstance.encontraTodosCamioes.restore();
	});

    it('Devia retornar um erro 404 ao listar todos...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(camiaoServiceInstance, "encontraTodosCamioes").returns( Result.fail( "error message" ));

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.encontraTodosCamioes(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match( 404));
        
        camiaoServiceInstance.encontraTodosCamioes.restore();
	});

    it('Devia retornar um json com a informação do get por Id...', async function () {
        let req: Partial<Request> = {
            params: { id : "AA-00-00" }
        };

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(camiaoServiceInstance, "getCamiao").returns( Result.ok<ICamiaoDTO>( 
            {
                "id": "AA-00-00", 
                "tara": 800,
                "capacidadeCargaTotal": 1200,
                "camiaoBateria": 80,
                "autonomiaCamiao": 900,
                "carregamentoLento": 50,
                "carregamentoRapido": 10,
                "ativo": true
            }));

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.getCamiao(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "ativo": true,
                "autonomiaCamiao": 900,
                "camiaoBateria": 80,
                "capacidadeCargaTotal": 1200,
                "carregamentoLento": 50,
                "carregamentoRapido": 10,
                "id": "AA-00-00",
                "tara": 800,
            }));

        camiaoServiceInstance.getCamiao.restore();
	});

    it('Devia retornar um erro 404 ao listar por Id...', async function () {
        let req: Partial<Request> = {
            params: { id : "AA-00-00" }
        };

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(camiaoServiceInstance, "getCamiao").returns( Result.fail( "error message" ));

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.getCamiao(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match( 404));
        
        camiaoServiceInstance.getCamiao.restore();
	});
});
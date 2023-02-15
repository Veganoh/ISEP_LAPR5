import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';

import {CamiaoMap} from "../../../src/mappers/CamiaoMap";
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
    let camiao;

    beforeAll(function(done){
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
            ativo: true
        };

        camiao = CamiaoMap.toDomain(body);
        done();
    });

    afterEach(function(done) {
        sinon.restore();

        done();
    });

    it('Devia retornar um json com a informação do listar todos...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		let lista = [camiao];
        sinon.stub(camiaoRepoInstance, "encontraTodosCamioes").returns( lista );

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.encontraTodosCamioes(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
	});




    
    /*it('Devia retornar um json com a informação do criar...', async function () {
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(camiaoRepoInstance, "save").returns( null );

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.createCamiao(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "autonomiaCamiao": 900,
                "camiaoBateria": 80,
                "capacidadeCargaTotal": 1200,
                "carregamentoLento": 50,
                "carregamentoRapido": 10,
                "id": body.domainId,
                "tara": 800,
            }));
	});

    it('Devia retornar um erro 402 ao criar...', async function () {
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(camiaoRepoInstance, "save").returns( null );

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.createCamiao(<Request>req, <Response>res, <NextFunction>next);

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

        sinon.stub(camiaoRepoInstance, "save").returns( null );

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.updateCamiao(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "autonomiaCamiao": 900,
                "camiaoBateria": 80,
                "capacidadeCargaTotal": 1200,
                "carregamentoLento": 50,
                "carregamentoRapido": 10,
                "id": body.domainId,
                "tara": 800,
            }));
	});

    it('Devia retornar um erro 404 ao editar...', async function () {
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(camiaoRepoInstance, "save").returns( null );

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.updateCamiao(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match( 404));
	});*/

    /*it('Devia retornar um erro 404 ao listar todos...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

        sinon.stub(camiaoRepoInstance, "encontraTodosCamioes").returns( null );

		const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

		await ctrl.encontraTodosCamioes(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match( 404));
	});*/
});
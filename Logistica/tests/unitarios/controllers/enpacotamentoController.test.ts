import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import IEnpacotamentoService from "../../../src/services/IServices/IEnpacotamentoService";
import EnpacotamentoController from "../../../src/controllers/enpacotamentoController";
import  IEnpacotamentoDTO  from '../../../src/dto/IEnpacotamentoDTO';


describe('Testes Unitários para o Controller do Enpacotamento',function() {

    let enpacotamentoSchemaInstance;
    let enpacotamentoRepoClass;
    let enpacotamentoRepoInstance;
    let entregaRepoClass;
    let camiaoSchemaInstance;
    let entregaRepoInstance;
    let camiaoRepoClass;
    let camiaoRepoInstance;
    let enpacotamentoServiceClass;
    let enpacotamentoServiceInstance;
    let body;

  
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

        body = {domainId: 1,entrega: 'E01',matricula: 'CA-10-10',tempoColocacao: 2,tempoRetirada:4,coordenadaX: 3,coordenadaY: 5,coordenadaZ: 6,};

        done();
    });

    it('1. Deve retornar um JSON com a informação do criar...', async function () {
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(enpacotamentoServiceInstance, "criarEnpacotamento").returns( Result.ok<IEnpacotamentoDTO>( 
            {
                "id":body.domainId,
                "enpacotamentoId": body.domainId, 
                "entrega": "E01",
                "matricula": "CA-10-10",
                "tempoColocacao": 2,
                "tempoRetirada":4,
                "coordenadaX": 3,
                "coordenadaY": 5,
                "coordenadaZ": 6,
            }));

		const ctrl = new EnpacotamentoController(enpacotamentoServiceInstance as IEnpacotamentoService);

		await ctrl.criarEnpacotamento(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "id":body.domainId,
                "enpacotamentoId": body.domainId,    
                "entrega": "E01",
                "matricula": "CA-10-10",
                "tempoColocacao": 2,
                "tempoRetirada":4,
                "coordenadaX": 3,
                "coordenadaY": 5,
                "coordenadaZ": 6,
            }));
        
        enpacotamentoServiceInstance.criarEnpacotamento.restore();
	});
    
    it('2. Deve retornar um erro 402 ao criar...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(enpacotamentoServiceInstance, "criarEnpacotamento").returns( Result.fail( "error message" ));

		const ctrl = new EnpacotamentoController(enpacotamentoServiceInstance as IEnpacotamentoService);

		await ctrl.criarEnpacotamento(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match(402));
        
        enpacotamentoServiceInstance.criarEnpacotamento.restore();
	});

    
    
    it('3. Deve retornar um json com a informação do editar...', async function () {
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
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(enpacotamentoServiceInstance, "editarEnpacotamento").returns( Result.ok<IEnpacotamentoDTO>( 
            {
                "id":body.domainId,
                "enpacotamentoId": body.domainId,                
                "entrega": "E01",
                "matricula": "CA-10-10",
                "tempoColocacao": 2,
                "tempoRetirada":4,
                "coordenadaX": 3,
                "coordenadaY": 5,
                "coordenadaZ": 6,
            }));

		const ctrl = new EnpacotamentoController(enpacotamentoServiceInstance as IEnpacotamentoService);

		await ctrl.editarEnpacotamento(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "id":body.domainId,
                "enpacotamentoId": body.domainId,    
                "entrega": "E01",
                "matricula": "CA-10-10",
                "tempoColocacao": 2,
                "tempoRetirada":4,
                "coordenadaX": 3,
                "coordenadaY": 5,
                "coordenadaZ": 6,
            }));

        enpacotamentoServiceInstance.editarEnpacotamento.restore();
	});
    
    it('4. Deve retornar um erro 404 ao editar...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(enpacotamentoServiceInstance, "editarEnpacotamento").returns( Result.fail( "error message" ));

		const ctrl = new EnpacotamentoController(enpacotamentoServiceInstance as IEnpacotamentoService);

		await ctrl.editarEnpacotamento(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match(404));
        
        enpacotamentoServiceInstance.editarEnpacotamento.restore();
	});

    it('5.Deve retornar um json com a informação do listar todos...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(enpacotamentoServiceInstance, "encontraTodosEnpacotamentos").returns( Result.ok<IEnpacotamentoDTO>( 
            {
                "id":body.domainId,
                "enpacotamentoId": body.domainId,    
                "entrega": "E01",
                "matricula": "CA-10-10",
                "tempoColocacao": 2,
                "tempoRetirada":4,
                "coordenadaX": 3,
                "coordenadaY": 5,
                "coordenadaZ": 6,
            }));

		const ctrl = new EnpacotamentoController(enpacotamentoServiceInstance as IEnpacotamentoService);

		await ctrl.encontraTodosEnpacotamentos(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "id":body.domainId,
                "enpacotamentoId": body.domainId,    
                "entrega": "E01",
                "matricula": "CA-10-10",
                "tempoColocacao": 2,
                "tempoRetirada":4,
                "coordenadaX": 3,
                "coordenadaY": 5,
                "coordenadaZ": 6,
            }));

        enpacotamentoServiceInstance.encontraTodosEnpacotamentos.restore();
	});

    it('6. Deve retornar um erro 404 ao listar todos...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(enpacotamentoServiceInstance, "encontraTodosEnpacotamentos").returns( Result.fail( "error message" ));

		const ctrl = new EnpacotamentoController(enpacotamentoServiceInstance as IEnpacotamentoService);

		await ctrl.encontraTodosEnpacotamentos(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match( 404));
        
        enpacotamentoServiceInstance.encontraTodosEnpacotamentos.restore();
	});

    it('7. Deve retornar um json com a informação do listar por Id...', async function () {
        let req: Partial<Request> = {
            params: { domainId : "1" }
        };

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(enpacotamentoServiceInstance, "encontraEnpacotamento").returns( Result.ok<IEnpacotamentoDTO>( 
            {
                "id":body.domainId,
                "enpacotamentoId": body.domainId,    
                "entrega": "E01",
                "matricula": "CA-10-10",
                "tempoColocacao": 2,
                "tempoRetirada":4,
                "coordenadaX": 3,
                "coordenadaY": 5,
                "coordenadaZ": 6,
            }));

		const ctrl = new EnpacotamentoController(enpacotamentoServiceInstance as IEnpacotamentoService);

		await ctrl.encontraEnpacotamento(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "id":body.domainId,
                "enpacotamentoId": body.domainId, 
                "entrega": "E01",
                "matricula": "CA-10-10",
                "tempoColocacao": 2,
                "tempoRetirada":4,
                "coordenadaX": 3,
                "coordenadaY": 5,
                "coordenadaZ": 6,
            }));

            enpacotamentoServiceInstance.encontraEnpacotamento.restore();
	});

    it('8. Deve retornar um erro 404 ao listar por Id...', async function () {
        let req: Partial<Request> = {
            params: { id : "1" }
        };

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(enpacotamentoServiceInstance, "encontraEnpacotamento").returns( Result.fail( "error message" ));

		const ctrl = new EnpacotamentoController(enpacotamentoServiceInstance as IEnpacotamentoService);

		await ctrl.encontraEnpacotamento(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match( 404));
        
        enpacotamentoServiceInstance.encontraEnpacotamento.restore();
	});
});



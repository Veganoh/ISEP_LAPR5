import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';

import ICamiaoService from "../../../src/services/IServices/ICamiaoService";
import PlaneamentoController from "../../../src/controllers/planeamentoController";
import {ICamiaoDTO} from '../../../src/dto/ICamiaoDTO';
import IRotaDTO from '../../../src/dto/IRotaDTO';
import IPlaneamentoService from '../../../src/services/IServices/IPlanemanetoService';

describe('camiao controller tests', function () {
    let rotaSchemaInstance;
    let camiaoSchemaInstance;
    let camiaoRepoClass;
    let camiaoRepoInstance;
    let armazemRepoClass;
    let armazemRepoInstance;
    let planeamentoRepoClass;
    let planeamentoRepoInstance;
    let planeamentoServiceClass;
    let planeamentoServiceInstance;
    let rotaDTO;
    let rotaDTOLista;
    let body;
    let bodyFrota;

    beforeAll(function(done) {
        rotaSchemaInstance = require("../../../src/persistence/schemas/rotaSchema").default;
		Container.set("rotaSchema", rotaSchemaInstance);

        camiaoSchemaInstance = require("../../../src/persistence/schemas/camiaoSchema").default;
		Container.set("camiaoSchema", camiaoSchemaInstance);

        camiaoRepoClass = require("../../../src/repos/camiaoRepo").default;
		camiaoRepoInstance = Container.get(camiaoRepoClass);
		Container.set("CamiaoRepo", camiaoRepoInstance);

        armazemRepoClass = require("../../../src/repos/armazemRepo").default;
		armazemRepoInstance = Container.get(armazemRepoClass);
		Container.set("ArmazemRepo", armazemRepoInstance);

        planeamentoRepoClass = require("../../../src/repos/planeamentoRepo").default;
		planeamentoRepoInstance = Container.get(planeamentoRepoClass);
		Container.set("PlaneamentoRepo", planeamentoRepoInstance);

        planeamentoServiceClass = require("../../../src/services/planeamentoService").default;
		planeamentoServiceInstance = Container.get(planeamentoServiceClass);
		Container.set("planeamentoService", planeamentoServiceInstance);

        planeamentoServiceInstance = Container.get("planeamentoService");

        body = {
            camiaoId: "CA-10-10",
            data: "2022/12/07",
            algoritmo: 3
        };

        bodyFrota = {
            camiaoId: "CA-10-10",
            data: "2022/12/07",
            algoritmo: 6
        };

        rotaDTO = {
            
            camiao: "CA-10-10",
            data: "2022/12/07",
            rota: ["001", "002", "003", "004"]
        };

        rotaDTOLista = [
            {
                camiao: "CA-10-10",
                data: "2022/12/07",
                rota: ["001", "002", "003", "004"]
            },
            {
                camiao: "CA-10-10",
                data: "2022/12/07",
                rota: ["005", "006", "007", "008"]
            },
            {
                camiao: "CA-10-10",
                data: "2022/12/07",
                rota: ["009", "010", "011", "012"]
            }
        ];


        done();
    });

    it('Devia retornar um json com a informação da rota...', async function () {
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(planeamentoServiceInstance, "obterRota").returns( Result.ok<IRotaDTO>( 
            {
                camiao: "CA-10-10",
                data: "2022/12/07",
                rota: ["001", "002", "003", "004"]
            }));

		const ctrl = new PlaneamentoController(planeamentoServiceInstance as IPlaneamentoService);

		await ctrl.obterPlaneamento(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                rota: ["001", "002", "003", "004"]
            }));
        
        planeamentoServiceInstance.obterRota.restore();
	});

    it('Deve retornar um erro 402 ao criar...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(planeamentoServiceInstance, "obterRota").returns( Result.fail( "error message" ));

		const ctrl = new PlaneamentoController(planeamentoServiceInstance as IPlaneamentoService);

		await ctrl.obterPlaneamento(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match(402));
        
        planeamentoServiceInstance.obterRota.restore();
	});

    it('Devia retornar um json com a informação da rota...', async function () {
        let req: Partial<Request> = {};
		req.body = bodyFrota;

        let res: Partial<Response> = {
			json: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(planeamentoServiceInstance, "obterRotaFrota").returns( Result.ok<IRotaDTO[]>( 
            [
                {
                    camiao: "CA-10-10",
                    data: "2022/12/07",
                    rota: ["001", "002", "003", "004"]
                },
                {
                    camiao: "CA-10-10",
                    data: "2022/12/07",
                    rota: ["005", "006", "007", "008"]
                },
                {
                    camiao: "CA-10-10",
                    data: "2022/12/07",
                    rota: ["009", "010", "011", "012"]
                }
            ]));

		const ctrl = new PlaneamentoController(planeamentoServiceInstance as IPlaneamentoService);

		await ctrl.obterPlaneamentoFrota(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            [
                {
                    camiao: "CA-10-10",
                    data: "2022/12/07",
                    rota: ["001", "002", "003", "004"]
                },
                {
                    camiao: "CA-10-10",
                    data: "2022/12/07",
                    rota: ["005", "006", "007", "008"]
                },
                {
                    camiao: "CA-10-10",
                    data: "2022/12/07",
                    rota: ["009", "010", "011", "012"]
                }
            ]));
        
        planeamentoServiceInstance.obterRotaFrota.restore();
	});

    it('Deve retornar um erro 402 ao criar...', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			status: sinon.spy()
        };

		let next: Partial<NextFunction> = () => {};

		sinon.stub(planeamentoServiceInstance, "obterRotaFrota").returns( Result.fail( "error message" ));

		const ctrl = new PlaneamentoController(planeamentoServiceInstance as IPlaneamentoService);

		await ctrl.obterPlaneamentoFrota(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, sinon.match(402));
        
        planeamentoServiceInstance.obterRotaFrota.restore();
	});
   
});
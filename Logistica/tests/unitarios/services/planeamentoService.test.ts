import 'reflect-metadata';

import { expect } from 'chai';
import * as sinon from 'sinon';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';

import PlaneamentoService from "../../../src/services/planeamentoService";
import { Camiao } from "../../../src/domain/camiao/camiao";
import { CamiaoMap } from '../../../src/mappers/CamiaoMap';
import { RotaMap } from '../../../src/mappers/RotaMap';
import ICamiaoRepo from '../../../src/services/IRepos/ICamiaoRepo';
import IPlaneamentoRepo from '../../../src/services/IRepos/IPlanemanetoRepo';
import { PlaneamentoMap } from '../../../src/mappers/planeamentRequestMap';
import { PlaneamentoRequest } from '../../../src/domain/planeamento/planeamentoRequest';
import IArmazemRepo from '../../../src/services/IRepos/IArmazemRepo';

describe('Testes Unitários para o Serviço de Camiao', function () {
    let rotaSchemaInstance;
    let camiaoSchemaInstance;
    let camiaoRepoClass;
    let camiaoRepoInstance;
    let armazemRepoClass;
    let armazemRepoInstance;
    let planeamentoRepoClass;
    let planeamentoRepoInstance;
    let planeamentoDTO;
    let planeamentoFrotaDTO;
    let planeamentoResquest;
    let rotaDTO;
    let rotaDTOLista;

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
		Container.set("CamiaoRepo", planeamentoRepoInstance);

        planeamentoDTO = {
            camiaoId: "CA-10-10",
            data: "2022/12/07",
            algoritmo: 3
        };

        planeamentoFrotaDTO= {
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

        planeamentoResquest = PlaneamentoRequest.cria(planeamentoDTO);
        

        sinon.stub(RotaMap, "toDTO").returns( rotaDTO );
        sinon.stub(RotaMap, "toDTOLista").returns( rotaDTOLista );
        sinon.stub(PlaneamentoMap, "toDomain").returns( planeamentoResquest );

        done();
    });

    it('Devia retornar um DTO ao criar...', async function () {
        sinon.stub(camiaoRepoInstance, "existId").returns( true );
        sinon.stub(planeamentoRepoInstance, "calcularRota").returns( rotaDTO );

		const serv = new PlaneamentoService(camiaoRepoInstance as ICamiaoRepo, armazemRepoInstance as IArmazemRepo, planeamentoRepoInstance as IPlaneamentoRepo);

		let resultadoObtido = await serv.obterRota( planeamentoDTO );
        let valorObtido = resultadoObtido.getValue();

        camiaoRepoInstance.existId.restore();
        planeamentoRepoInstance.calcularRota.restore();
        
        expect(resultadoObtido.isSuccess).to.be.true;
        expect(valorObtido).to.be.equal( rotaDTO );
	});

    it('Devia retornar um Result.fail ao criar por não existir o camião...', async function () {
        sinon.stub(camiaoRepoInstance, "existId").returns( false );
        sinon.stub(planeamentoRepoInstance, "calcularRota").returns( rotaDTO );

		const serv = new PlaneamentoService(camiaoRepoInstance as ICamiaoRepo, armazemRepoInstance as IArmazemRepo, planeamentoRepoInstance as IPlaneamentoRepo);

		let resultadoObtido = await serv.obterRota( planeamentoDTO );

        camiaoRepoInstance.existId.restore();
        planeamentoRepoInstance.calcularRota.restore();
        
        expect(resultadoObtido.isFailure).to.be.true;
	});

    it('Devia retornar um Result.fail ao criar por um dos valores ser invalido...', async function () {
        sinon.stub(camiaoRepoInstance, "existId").returns( true );
        sinon.stub(planeamentoRepoInstance, "calcularRota").returns( null );

		const serv = new PlaneamentoService(camiaoRepoInstance as ICamiaoRepo, armazemRepoInstance as IArmazemRepo, planeamentoRepoInstance as IPlaneamentoRepo);

		let resultadoObtido = await serv.obterRota( planeamentoDTO );

        camiaoRepoInstance.existId.restore();
        planeamentoRepoInstance.calcularRota.restore();
        
        expect(resultadoObtido.isFailure).to.be.true;
	});

    it('Devia retornar uma lista DTO ao criar...', async function () {
        sinon.stub(camiaoRepoInstance, "existId").returns( true );
        sinon.stub(planeamentoRepoInstance, "calcularRotaFrota").returns( rotaDTOLista );

		const serv = new PlaneamentoService(camiaoRepoInstance as ICamiaoRepo, armazemRepoInstance as IArmazemRepo, planeamentoRepoInstance as IPlaneamentoRepo);

		let resultadoObtido = await serv.obterRotaFrota( planeamentoFrotaDTO );
        let valorObtido = resultadoObtido.getValue();

        camiaoRepoInstance.existId.restore();
        planeamentoRepoInstance.calcularRotaFrota.restore();
        
        expect(resultadoObtido.isSuccess).to.be.true;
        expect(valorObtido).to.be.equal( rotaDTOLista );
	});

    it('Devia retornar um Result.fail ao criar por não existir o camião...', async function () {
        sinon.stub(camiaoRepoInstance, "existId").returns( false );
        sinon.stub(planeamentoRepoInstance, "calcularRotaFrota").returns( rotaDTO );

		const serv = new PlaneamentoService(camiaoRepoInstance as ICamiaoRepo, armazemRepoInstance as IArmazemRepo, planeamentoRepoInstance as IPlaneamentoRepo);

		let resultadoObtido = await serv.obterRota( planeamentoFrotaDTO );

        camiaoRepoInstance.existId.restore();
        planeamentoRepoInstance.calcularRotaFrota.restore();
        
        expect(resultadoObtido.isFailure).to.be.true;
	});

    it('Devia retornar um Result.fail ao criar por um dos valores ser invalido...', async function () {
        sinon.stub(camiaoRepoInstance, "existId").returns( true );
        sinon.stub(planeamentoRepoInstance, "calcularRotaFrota").returns( null );

		const serv = new PlaneamentoService(camiaoRepoInstance as ICamiaoRepo, armazemRepoInstance as IArmazemRepo, planeamentoRepoInstance as IPlaneamentoRepo);

		let resultadoObtido = await serv.obterRota( planeamentoFrotaDTO );

        camiaoRepoInstance.existId.restore();
        planeamentoRepoInstance.calcularRotaFrota.restore();
        
        expect(resultadoObtido.isFailure).to.be.true;
	});
});
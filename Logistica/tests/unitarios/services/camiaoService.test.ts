import 'reflect-metadata';

import { expect } from 'chai';
import * as sinon from 'sinon';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';

import CamiaoService from "../../../src/services/camiaoService";
import { Camiao } from "../../../src/domain/camiao/camiao";
import { CamiaoMap } from '../../../src/mappers/CamiaoMap';
import ICamiaoRepo from '../../../src/services/IRepos/ICamiaoRepo';

describe('Testes Unitários para o Serviço de Camiao', function () {
    let camiaoSchemaInstance;
    let camiaoRepoClass;
    let camiaoRepoInstance;
    let camiaoDTO;
    let camiao;

    beforeAll(function(done) {
        camiaoSchemaInstance = require("../../../src/persistence/schemas/camiaoSchema").default;
		Container.set("camiaoSchema", camiaoSchemaInstance);

		camiaoRepoClass = require("../../../src/repos/camiaoRepo").default;
		camiaoRepoInstance = Container.get(camiaoRepoClass);
		Container.set("CamiaoRepo", camiaoRepoInstance);

        camiaoDTO = {
            id: "AA-00-00",
            tara: 800,
            capacidadeCargaTotal: 1200,
            camiaoBateria: 80,
            autonomiaCamiao: 900,
            carregamentoLento: 0,
            carregamentoRapido: 52,
            ativo: true
        };

        camiao = Camiao.create(camiaoDTO, camiaoDTO.id);

        sinon.stub(CamiaoMap, "toDTO").returns( camiaoDTO );

        done();
    });

    it('Devia retornar um DTO ao criar...', async function () {
        sinon.stub(camiaoRepoInstance, "save").returns( null );

		const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);

		let resultadoObtido = await serv.createCamiao( camiaoDTO );
        let valorObtido = resultadoObtido.getValue();

        camiaoRepoInstance.save.restore();
        
        expect(resultadoObtido.isSuccess).to.be.true;
        expect(valorObtido).to.be.equal( camiaoDTO );
	});

    it('Devia retornar uma lista de DTO ao listar Todos...', async function () {
        let lista = [camiao];
        sinon.stub(camiaoRepoInstance, "encontraTodosCamioes").returns( lista );

		const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);

		let resultadoObtido = await serv.encontraTodosCamioes();
        let valorObtido = resultadoObtido.getValue();

        camiaoRepoInstance.encontraTodosCamioes.restore();
        
        expect(resultadoObtido.isSuccess).to.be.true;
		expect(valorObtido.pop()).to.be.equal( camiaoDTO );
        expect(valorObtido.length).to.be.equal(0);
	});

    it('Devia retornar um DTO ao procurar por Id...', async function () {
        sinon.stub(camiaoRepoInstance, "findByDomainId").returns( camiao );

		const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);

		let resultadoObtido = await serv.getCamiao( camiaoDTO.id );
        let valorObtido = resultadoObtido.getValue();

        camiaoRepoInstance.findByDomainId.restore();
        
        expect(resultadoObtido.isSuccess).to.be.true;
		expect(valorObtido).to.be.equal( camiaoDTO );
	});

    it('Devia falhar ao procurar por Id por não encontrar nenhum...', async function () {
        sinon.stub(camiaoRepoInstance, "findByDomainId").returns( null );

		const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);

		let resultadoObtido = await serv.getCamiao( camiaoDTO.id );

        camiaoRepoInstance.findByDomainId.restore();
        
        expect(resultadoObtido.isFailure).to.be.true;
	});
});
import {Armazem_ID} from "../../../src/app/domain/entrega/armazem_id";
import {Data} from "../../../src/app/domain/entrega/data";
import {EntregaID} from "../../../src/app/domain/entrega/entregaId";
import {PesoEntrega} from "../../../src/app/domain/entrega/peso_entrega";
import {TempoColacacao} from "../../../src/app/domain/entrega/tempo_colocacao";
import {TempoRetirada} from "../../../src/app/domain/entrega/tempo_retirada";
import {Entrega} from "../../../src/app/domain/entrega/entrega";

describe('Entrega unit test', function() {
    const expect = require('chai').expect;

    const validPeso = 10;
    const validTempoCol = 10;
    const validTempoRet = 10;
    const validEntId = "asd";
    const validArmID = "As5";
    const validData = "10/12/2022";

    it('criar Armazem valido', () => {

        let props = {
            data : Data.create(validData).getValue(),
            peso : PesoEntrega.create(validPeso).getValue(),
            arm_id : Armazem_ID.create(validArmID).getValue(),
            tempo_col: TempoColacacao.create(validTempoCol).getValue(),
            tempo_ret: TempoRetirada.create(validTempoRet).getValue()
        }

        let entrega = Entrega.cria(props, new EntregaID(validEntId));

        expect(entrega.isSuccess).equal(true);
        expect(entrega.isFailure).equal(false);

        expect(entrega.getValue().id.toString()).equal(validEntId);
        expect(entrega.getValue().data.getDateFormated()).equal("2022/12/10");
        expect(entrega.getValue().peso.value).equal(validPeso);
        expect(entrega.getValue().arm_id.value).equal(validArmID);
        expect(entrega.getValue().tempo_col.value).equal(validTempoCol);
        expect(entrega.getValue().tempo_ret.value).equal(validTempoRet);
    })

    it('criar Entrega invalido, data nulla', () => {
        
        let props = {
            data : null,
            peso : PesoEntrega.create(validPeso).getValue(),
            arm_id : Armazem_ID.create(validArmID).getValue(),
            tempo_col: TempoColacacao.create(validTempoCol).getValue(),
            tempo_ret: TempoRetirada.create(validTempoRet).getValue()
        }
        // @ts-ignore: Unreachable code error
        let entrega = Entrega.cria(props, new EntregaID(validEntId));

        expect(entrega.isSuccess).equal(false);
        expect(entrega.isFailure).equal(true);
        expect(entrega.error).equal("A Data de uma entrega não pode ser nula");
    })

    it('criar Entrega invalido, Peso nullo', () => {

        let props = {
            data : Data.create(validData).getValue(),
            peso : null,
            arm_id : Armazem_ID.create(validArmID).getValue(),
            tempo_col: TempoColacacao.create(validTempoCol).getValue(),
            tempo_ret: TempoRetirada.create(validTempoRet).getValue()
        }
        // @ts-ignore: Unreachable code error
        let entrega = Entrega.cria(props, new EntregaID(validEntId));

        expect(entrega.isSuccess).equal(false);
        expect(entrega.isFailure).equal(true);
        expect(entrega.error).equal("O Peso da entrega não pode ser nulo");
    })

    it('criar Entrega invalido, Armazem id nula', () => {

        let props = {
            data : Data.create(validData).getValue(),
            peso : PesoEntrega.create(validPeso).getValue(),
            arm_id : null,
            tempo_col: TempoColacacao.create(validTempoCol).getValue(),
            tempo_ret: TempoRetirada.create(validTempoRet).getValue()
        }
        // @ts-ignore: Unreachable code error
        let entrega = Entrega.cria(props, new EntregaID(validEntId));

        expect(entrega.isSuccess).equal(false);
        expect(entrega.isFailure).equal(true);
        expect(entrega.error).equal("O id do armazém onde vai ser feita a entrega tem de ser preenchida");
    })

    it('criar Entrega invalido, Tempo Colocacao nullo', () => {

        let props = {
            data : Data.create(validData).getValue(),
            peso : PesoEntrega.create(validPeso).getValue(),
            arm_id : Armazem_ID.create(validArmID).getValue(),
            tempo_col: null,
            tempo_ret: TempoRetirada.create(validTempoRet).getValue()
        }
        // @ts-ignore: Unreachable code error
        let entrega = Entrega.cria(props, new EntregaID(validEntId));

        expect(entrega.isSuccess).equal(false);
        expect(entrega.isFailure).equal(true);
        expect(entrega.error).equal("O tempo de colocação de uma entrega não pode ser nulo");
    })

    it('criar Entrega invalido, Tempo Retirada nullo', () => {

        let props = {
            data : Data.create(validData).getValue(),
            peso : PesoEntrega.create(validPeso).getValue(),
            arm_id : Armazem_ID.create(validArmID).getValue(),
            tempo_col: TempoColacacao.create(validTempoCol).getValue(),
            tempo_ret: null
        }
        // @ts-ignore: Unreachable code error
        let entrega = Entrega.cria(props, new EntregaID(validEntId));

        expect(entrega.isSuccess).equal(false);
        expect(entrega.isFailure).equal(true);
        expect(entrega.error).equal("O tempo de retirada de uma entrega não pode ser nulo");
    })

    it('criar Entrega invalido, sem informação', () => {
        // @ts-ignore: Unreachable code error
        let entrega = Entrega.cria(null, new EntregaID(validEntId));

        expect(entrega.isSuccess).equal(false);
        expect(entrega.isFailure).equal(true);
        expect(entrega.error).equal("Não podem existir campos indefinidos ou null para criar uma entrega!");
    })
})

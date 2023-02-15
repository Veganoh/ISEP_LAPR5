import {Armazem_ID} from "../../src/app/domain/entrega/armazem_id";
import {Data} from "../../src/app/domain/entrega/data";
import {EntregaID} from "../../src/app/domain/entrega/entregaId";
import {PesoEntrega} from "../../src/app/domain/entrega/peso_entrega";
import {TempoColacacao} from "../../src/app/domain/entrega/tempo_colocacao";
import {TempoRetirada} from "../../src/app/domain/entrega/tempo_retirada";
import {Entrega} from "../../src/app/domain/entrega/entrega";

import {EntregaMap} from "../../src/app/mappers/entregaMap";
import {EntregaDTO} from "../../src/app/interfaces/entregaDTO";

describe('altitude unit test', function() {
    const expect = require('chai').expect;

    
    const validPeso = 10;
    const validTempoCol = 10;
    const validTempoRet = 10;
    const validEntId = "asd";
    const validArmID = "As5";
    const validData = "10/12/2022";

    it('criar DTO a partir de Entrega', () => {

        let props = {
            data : Data.create(validData).getValue(),
            peso : PesoEntrega.create(validPeso).getValue(),
            arm_id : Armazem_ID.create(validArmID).getValue(),
            tempo_col: TempoColacacao.create(validTempoCol).getValue(),
            tempo_ret: TempoRetirada.create(validTempoRet).getValue()
        }

        let entrega = Entrega.cria(props, new EntregaID(validEntId));

        let entregaDto = EntregaMap.toDTO(entrega.getValue());

        expect(entrega.getValue().id.toString()).equal(entregaDto.identificador);
        expect(entrega.getValue().data.getDateFormated()).equal(entregaDto.data);
        expect(entrega.getValue().peso.value).equal(entregaDto.peso_entrega);
        expect(entrega.getValue().arm_id.value).equal(entregaDto.id_armazem);
        expect(entrega.getValue().tempo_col.value).equal(entregaDto.tempo_colocacao);
        expect(entrega.getValue().tempo_ret.value).equal(entregaDto.tempo_retirada);
    })

    it('criar entrega a partir de DTO', () => {

        let entregaDto = {
            identificador:validEntId,
            data : validData,
            peso_entrega :validPeso,
            id_armazem : validArmID,
            tempo_colocacao: validTempoCol,
            tempo_retirada: validTempoRet
        } as EntregaDTO

        let entrega = EntregaMap.toDomain(entregaDto);

       

        expect(entrega.id.toString()).equal(entregaDto.identificador);
        expect(entrega.data.getDateFormated()).equal("2022/12/10");
        expect(entrega.arm_id.value).equal(entregaDto.id_armazem);
        expect(entrega.tempo_col.value).equal(entregaDto.tempo_colocacao);
        expect(entrega.tempo_ret.value).equal(entregaDto.tempo_retirada);
    })
})

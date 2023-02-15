import {Armazem} from "../../src/app/domain/armazem/armazem";
import {Altitude} from "../../src/app/domain/armazem/altitude";
import {ArmazemID} from "../../src/app/domain/armazem/armazemId";
import {Coordenadas} from "../../src/app/domain/armazem/coordenadas";
import {Designacao} from "../../src/app/domain/armazem/designacao";
import {Endereco} from "../../src/app/domain/armazem/endereco";
import {ArmazemMap} from "../../src/app/mappers/armazemMap";
import {ArmazemDTO} from "../../src/app/interfaces/armazemDto";
import { Ativo } from "../../src/app/domain/armazem/ativo";

describe('altitude unit test', function() {
    const expect = require('chai').expect;

    const validAltidude = 10;
    const validLatitue = 10;
    const validLongitude = 10;
    const validDesignacao = "asd";
    const validID = "As5";
    const validEndereco = "aaa,aaa,1234-154";

    it('criar DTO a partir de Armazem', () => {

        let props = {
            designacao: Designacao.create(validDesignacao).getValue(),
            endereco: Endereco.create(validEndereco).getValue(),
            coordenadas: Coordenadas.create(validLatitue, validLongitude).getValue(),
            altitude: Altitude.create(validAltidude).getValue(),
            ativo: Ativo.create(true).getValue()
        }

        let armazem = Armazem.cria(props, new ArmazemID(validID));

        let armazemDto = ArmazemMap.toDTO(armazem.getValue());

        expect(armazem.getValue().id.toString()).equal(armazemDto.identificador);
        expect(armazem.getValue().designacao.value).equal(armazemDto.designacao);
        expect(armazem.getValue().endereco.value).equal(armazemDto.endereco);
        expect(armazem.getValue().coordenadas.latitude).equal(armazemDto.latitude);
        expect(armazem.getValue().coordenadas.longitude).equal(armazemDto.longitude);
        expect(armazem.getValue().altitude.value).equal(armazemDto.altitude);
        expect(armazem.getValue().isAtivo).equal(armazemDto.ativo);
    })

    it('criar armazem a partir de DTO', () => {

        let armazemDto = {
            identificador: validID,
            designacao: validDesignacao,
            endereco: validEndereco,
            latitude: validLatitue, 
            longitude: validLongitude,
            altitude: validAltidude,
            ativo: true
        } as ArmazemDTO

        let armazem = ArmazemMap.toDomain(armazemDto);

       

        expect(armazem.id.toString()).equal(armazemDto.identificador);
        expect(armazem.designacao.value).equal(armazemDto.designacao);
        expect(armazem.endereco.value).equal(armazemDto.endereco);
        expect(armazem.coordenadas.latitude).equal(armazemDto.latitude);
        expect(armazem.coordenadas.longitude).equal(armazemDto.longitude);
        expect(armazem.altitude.value).equal(armazemDto.altitude);
        expect(armazem.isAtivo).equal(armazemDto.ativo);
    })
})

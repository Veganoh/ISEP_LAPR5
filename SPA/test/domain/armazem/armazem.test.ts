import {Armazem} from "../../../src/app/domain/armazem/armazem";
import {Altitude} from "../../../src/app/domain/armazem/altitude";
import {ArmazemID} from "../../../src/app/domain/armazem/armazemId";
import {Coordenadas} from "../../../src/app/domain/armazem/coordenadas";
import {Designacao} from "../../../src/app/domain/armazem/designacao";
import {Endereco} from "../../../src/app/domain/armazem/endereco";
import { Ativo } from "../../../src/app/domain/armazem/ativo";

describe('altitude unit test', function() {
    const expect = require('chai').expect;

    const validAltidude = 10;
    const validLatitue = 10;
    const validLongitude = 10;
    const validDesignacao = "asd";
    const validID = "As5";
    const validEndereco = "aaa,aaa,1234-154";

    it('criar Armazem valido', () => {

        let props = {
            designacao: Designacao.create(validDesignacao).getValue(),
            endereco: Endereco.create(validEndereco).getValue(),
            coordenadas: Coordenadas.create(validLatitue, validLongitude).getValue(),
            altitude: Altitude.create(validAltidude).getValue(),
            ativo: Ativo.create(true).getValue()
        }

        let armazem = Armazem.cria(props, new ArmazemID(validID));

        expect(armazem.isSuccess).equal(true);
        expect(armazem.isFailure).equal(false);

        expect(armazem.getValue().id.toString()).equal(validID);
        expect(armazem.getValue().designacao.value).equal(validDesignacao);
        expect(armazem.getValue().endereco.value).equal(validEndereco);
        expect(armazem.getValue().coordenadas.latitude).equal(validLatitue);
        expect(armazem.getValue().coordenadas.longitude).equal(validLongitude);
        expect(armazem.getValue().altitude.value).equal(validAltidude);
        expect(armazem.getValue().isAtivo).equal(true);
    })

    it('criar Armazem invalido, designação nulla', () => {

        let props = {
            designacao: null,
            endereco: Endereco.create(validEndereco).getValue(),
            coordenadas: Coordenadas.create(validLatitue, validLongitude).getValue(),
            altitude: Altitude.create(validAltidude).getValue(),
            ativo: Ativo.create(true).getValue()
        }

        // @ts-ignore: Unreachable code error
        let armazem = Armazem.cria(props, new ArmazemID(validID));

        expect(armazem.isSuccess).equal(false);
        expect(armazem.isFailure).equal(true);
        expect(armazem.error).equal("Designacão de um armazem não pode ser nula");
    })

    it('criar Armazem invalido, Endereço nullo', () => {

        let props = {
            designacao: Designacao.create(validDesignacao).getValue(),
            endereco: null,
            coordenadas: Coordenadas.create(validLatitue, validLongitude).getValue(),
            altitude: Altitude.create(validAltidude).getValue(),
            ativo: Ativo.create(true).getValue()
        }

        // @ts-ignore: Unreachable code error
        let armazem = Armazem.cria(props, new ArmazemID(validID));

        expect(armazem.isSuccess).equal(false);
        expect(armazem.isFailure).equal(true);
        expect(armazem.error).equal("Endereço do armazem não pode ser nulo");
    })

    it('criar Armazem invalido, Coordenada nula', () => {

        let props = {
            designacao: Designacao.create(validDesignacao).getValue(),
            endereco: Endereco.create(validEndereco).getValue(),
            coordenadas: null,
            altitude: Altitude.create(validAltidude).getValue(),
            ativo: Ativo.create(true).getValue()
        }

        // @ts-ignore: Unreachable code error
        let armazem = Armazem.cria(props, new ArmazemID(validID));

        expect(armazem.isSuccess).equal(false);
        expect(armazem.isFailure).equal(true);
        expect(armazem.error).equal("Coordenadas tem de ser preenchidas");
    })

    it('criar Armazem invalido, Altitude nullo', () => {

        let props = {
            designacao: Designacao.create(validDesignacao).getValue(),
            endereco: Endereco.create(validEndereco).getValue(),
            coordenadas: Coordenadas.create(validLatitue, validLongitude).getValue(),
            altitude: null,
            ativo: Ativo.create(true).getValue()
        }

        // @ts-ignore: Unreachable code error
        let armazem = Armazem.cria(props, new ArmazemID(validID));

        expect(armazem.isSuccess).equal(false);
        expect(armazem.isFailure).equal(true);
        expect(armazem.error).equal("A altitude de um armazem não pode ser nula");
    })

    it('criar Armazem invalido, ID nullo', () => {

        let props = {
            designacao: Designacao.create(validDesignacao).getValue(),
            endereco: Endereco.create(validEndereco).getValue(),
            coordenadas: Coordenadas.create(validLatitue, validLongitude).getValue(),
            altitude: Altitude.create(validAltidude).getValue(),
            ativo: Ativo.create(true).getValue()
        }

        // @ts-ignore: Unreachable code error
        let armazem = Armazem.cria(props, null);

        expect(armazem.isSuccess).equal(false);
        expect(armazem.isFailure).equal(true);
        expect(armazem.error).equal("O id do armazem não pode ser nulo");
    })

    it('criar Armazem invalido, Atividade nulla', () => {

        let props = {
            designacao: Designacao.create(validDesignacao).getValue(),
            endereco: Endereco.create(validEndereco).getValue(),
            coordenadas: Coordenadas.create(validLatitue, validLongitude).getValue(),
            altitude: Altitude.create(validAltidude).getValue(),
        }

        // @ts-ignore: Unreachable code error
        let armazem = Armazem.cria(props,  new ArmazemID(validID));

        expect(armazem.isSuccess).equal(false);
        expect(armazem.isFailure).equal(true);
        expect(armazem.error).equal("Um armazem necessita de estar ou ativo ou desativo");
    })

    it('criar Armazem invalido, sem informação', () => {

        // @ts-ignore: Unreachable code error
        let armazem = Armazem.cria(null, new ArmazemID(validID));

        expect(armazem.isSuccess).equal(false);
        expect(armazem.isFailure).equal(true);
        expect(armazem.error).equal("Não podem existir campos indefinidos ou null para criar um armazem!");
    })
})

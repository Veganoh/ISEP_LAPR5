import { Repo } from "../../core/infra/Repo";
import { Enpacotamento } from "../../domain/enpacotamento/enpacotamento";
import { EnpacotamentoId } from "../../domain/enpacotamento/enpacotamentoId";

export default interface IEnpacotamentoRepo extends Repo<Enpacotamento> {
    save(Enpacotamento: Enpacotamento): Promise<Enpacotamento>;
    findByDomainId(EnpacotamentoId: EnpacotamentoId | number): Promise<Enpacotamento>;
    encontraTodosEnpacotamentos() : Promise<Enpacotamento[]>;
    findPagina(pag: number, num: number): Promise<{count: number, lista: Enpacotamento[]}>;
}
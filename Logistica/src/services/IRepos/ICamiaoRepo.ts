import { Repo } from "../../core/infra/Repo";
import { Camiao } from "../../domain/camiao/camiao";
import { CamiaoId } from "../../domain/camiao/camiaoId";

export default interface ICamiaoRepo extends Repo<Camiao> {
    existId(camiaoId: CamiaoId): Promise<boolean>;
    save(camiao: Camiao): Promise<Camiao>;
    findByDomainId(camiaoId: CamiaoId | string): Promise<Camiao>;
    encontraTodosCamioes(): Promise<Camiao[]>;
    obterTodosAtivos(): Promise<Camiao[]>;
    //mudarAtividade(camiao: Camiao): Promise<Camiao>;
}
import { Repo } from "../../core/infra/Repo";

export default interface IEntregaRepo extends Repo<String> {
    exists(entrega: string): Promise<boolean>;
}
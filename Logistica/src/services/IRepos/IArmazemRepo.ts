import { Repo } from "../../core/infra/Repo";

export default interface IArmazemRepo extends Repo<String> {
  exists(armazem: string): Promise<boolean>;
}
import { Repo } from "../../core/infra/Repo";

export default interface IAuthRepo extends Repo<String> {
  verifyUserToken(credentials: string): Promise<any>;
}
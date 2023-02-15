import { Result } from "../../core/logic/Result";

export default interface IAuthService  {
  autenticarUtilizador( credentials: string ): Promise<Result<any>>;
}

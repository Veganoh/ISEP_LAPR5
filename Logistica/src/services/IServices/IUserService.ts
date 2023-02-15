import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService  {
  criarUser(userDTO : IUserDTO): Promise<Result<IUserDTO>>;
  encontraUser(id : number): Promise<Result<IUserDTO>>;
  anonimizarUser(id : number): Promise<Result<IUserDTO>>;
  findAll(): Promise<Result<IUserDTO[]>>;
}


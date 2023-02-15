import { Mapper } from "../core/infra/Mapper";

import { User } from "../domain/user/user";
import { UserFactory } from "../factories/UserFactory";
import UserDTO from "../interfaces/UserDTO";

import { Result } from "../core/logic/Result";



export class UserMap extends Mapper<User> {

  public static toDTO( user : User): UserDTO{

      return {
          userId : user.id.toValue(),
          primeiroNome: user.primeiroNome,
          ultimoNome: user.ultimoNome,
          email : user.email.value,
          telemovel: user.telemovel.value,
          role: user.role.value,
      } as UserDTO;
  }

  public static toDomain( user: any ): Result<User> {
      const userOrError = UserFactory.criarUserComDTO(user);

      return userOrError.isSuccess ? Result.ok(userOrError.getValue()) : Result.fail(userOrError.error);
  }

  public static toPersistence( user: User): any {
      return{
        id : user.id.toString(),
        userId : user.id.toValue(),
        primeiroNome: user.primeiroNome,
        ultimoNome: user.ultimoNome,
        email : user.email.value,
        telemovel: user.telemovel.value,
        role: user.role.value,
      }
  }
}
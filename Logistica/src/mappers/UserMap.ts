import { User } from "../domain/user/user";
import { IUserDTO } from "../dto/IUserDTO";
import { Mapper } from "../core/infra/Mapper";
import { IUserPersistence } from "../dataschema/IUserPersistence";
import { UserFactory } from "../factories/UserFactory";
import { Document, Model } from 'mongoose';



export class UserMap extends Mapper<User> {

  public static toDTO( user : User): IUserDTO{

      return {
          userId : user.id.toValue(),
          primeiroNome: user.primeiroNome,
          ultimoNome: user.ultimoNome,
          email : user.email.value,
          telemovel: user.telemovel.value,
          role: user.role.value,
      } as IUserDTO;
  }

  public static toDomain( user: any | Model<IUserPersistence & Document> ): User {
      const userOrError = UserFactory.criarUserComDTO(user);

      userOrError.isFailure ? console.log(userOrError.error): '';

      return userOrError.isSuccess ? userOrError.getValue() : null;
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
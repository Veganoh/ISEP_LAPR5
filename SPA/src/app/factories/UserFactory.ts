import { User } from "../domain/user/user";
import  UserDTO  from "../interfaces/UserDTO";
import { Result } from "../core/logic/Result";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { UserTelemovel } from "../domain/user/userTelemovel";
import { UserEmail } from "../domain/user/userEmail";
import { UserRole } from "../domain/user/userRole";

export class UserFactory{
   
    public static criarUserComDTO(userDTO: UserDTO): Result<User> {

        const userEmail = UserEmail.create(userDTO.email);
        if (userEmail.isFailure)
            return Result.fail(userEmail.error);

        const userTelemovel = UserTelemovel.create(userDTO.telemovel);
        if (userTelemovel.isFailure)
            return Result.fail(userTelemovel.error);

        const userRole = UserRole.cria(userDTO.role);
        if (userRole.isFailure)
        return Result.fail(userRole.error);

        const user = User.cria({
            primeiroNome : userDTO.primeiroNome,
            ultimoNome : userDTO.ultimoNome,
            email : userEmail.getValue(),
            telemovel : userTelemovel.getValue(),
            role : userRole.getValue(),
        }, new UniqueEntityID(userDTO.userId));

        return user;
    }

}
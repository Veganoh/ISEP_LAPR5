import { User } from "../domain/user/user";
import { UserEmail } from "../domain/user/userEmail";
import { IUserDTO } from "../dto/IUserDTO";
import { UserTelemovel } from "../domain/user/userTelemovel";
import { Result } from "../core/logic/Result";
import { UserRole } from "../domain/user/userRole";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


export class UserFactory {
    public static criarUserComDTO(dto : IUserDTO): Result<User>{
        const email = UserEmail.create(dto.email);
        if (email.isFailure)
            return Result.fail(email.error);

        const telemovel = UserTelemovel.create(dto.telemovel);
        if (telemovel.isFailure)
            return Result.fail(telemovel.error);
        
        const role = UserRole.cria(dto.role);
        if (role.isFailure)
            return Result.fail(role.error);
        

        if (dto.userId === undefined || dto.userId === null)  dto.userId = -1;    

        const user = User.cria({
            primeiroNome : dto.primeiroNome,
            ultimoNome : dto.ultimoNome,
            email: email.getValue(),
            telemovel: telemovel.getValue(),
            role: role.getValue(),
        }, new UniqueEntityID(dto.userId));

        return user;
    }
}
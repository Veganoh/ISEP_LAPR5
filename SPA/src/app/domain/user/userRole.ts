import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface UserRoleProps {
    value: string;
}

export class UserRole extends ValueObject<UserRoleProps>{
    get value (): string {
        return this.props.value;
    }

    private constructor (props: UserRoleProps){
        super(props);
    }

    public static cria(role: string): Result<UserRole>{
        const guardResult = Guard.againstNullOrUndefined(role, 'role');

        if(!guardResult.succeeded)
            return Result.fail<UserRole>(guardResult.message);
                 
        return Result.ok<UserRole>(new UserRole({ value: role}))
    }

}
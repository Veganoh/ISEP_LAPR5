import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { UserId } from "./userId";
import { UserEmail } from "./userEmail";
import { UserRole } from "./userRole";
import { Guard } from "../../core/logic/Guard";
import { UserTelemovel } from "./userTelemovel";


interface UserProps {
  primeiroNome: string;
  ultimoNome: string;
  email: UserEmail;
  telemovel : UserTelemovel;
  role: UserRole;
}

export class User extends AggregateRoot<UserProps> {

  get id (): UniqueEntityID {
    return this._id;
  }

  get userId (): UserId {
    return new UserId(this.userId.toValue());
  }

  get email (): UserEmail {
    return this.props.email;
  }

  set email (email: UserEmail) {
    this.props.email = email;
  }

  get primeiroNome (): string {
    return this.props.primeiroNome
  }

  set primeiroNome (primeiroNome: string) {
    this.props.primeiroNome = primeiroNome;
  }

  get ultimoNome (): string {
    return this.props.ultimoNome;
  }

  set ultimoNome (ultimoNome: string) {
    this.props.ultimoNome = ultimoNome;
  }

  get telemovel (): UserTelemovel {
    return this.props.telemovel;
  }

  set telemovel (telemovel: UserTelemovel) {
    this.props.telemovel = telemovel;
  }


  get role (): UserRole {
    return this.props.role;
  }
  
  set role (value: UserRole) {
      this.props.role = value;
  }

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static cria(props: UserProps, id?: UniqueEntityID): Result<User> {

    const guardedProps = [
      { argument: props.primeiroNome, argumentName: 'primeiroNome' },
      { argument: props.ultimoNome, argumentName: 'ultimoNome' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.role, argumentName: 'role' },
      { argument: props.telemovel, argumentName: 'telemovel' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) 
      return Result.fail<User>(guardResult.message)
   
    const user = new User(props,id)
   
      
    return Result.ok<User>(user);
  }
}
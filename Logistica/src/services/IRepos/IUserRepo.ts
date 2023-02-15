import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/user/user";
import { UserId } from "../../domain/user/userId";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	findAll() : Promise<User[]>;
	findById (userId: UserId | number ): Promise<User>;
	findByEmail ( userEmail: string ): Promise<User>;
}
  
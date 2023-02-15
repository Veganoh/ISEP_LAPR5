import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';

import IUserRepo from "../services/IRepos/IUserRepo";
import { User } from "../domain/user/user";
import { UserId } from "../domain/user/userId";
import { UserMap } from "../mappers/UserMap";

@Service()
export default class UserRepo implements IUserRepo{

    constructor(
        @Inject('userSchema') private userSchema : Model<IUserPersistence & Document>,
    ){}
  

    public async exists(user: User): Promise<boolean> {
        
        const idX = user.id instanceof UserId ? (<UserId> user.id).toValue() : user.id;

        const query = { enpacotamentoId: idX}; 
        const userDocument = await this.userSchema.findOne( query as FilterQuery<IUserPersistence & Document>);

        return !!userDocument === true;
    }

    public async findById (UserId: UserId | number): Promise<User> {
        const query = { userId: UserId};
        const userRecord = await this.userSchema.findOne( query as FilterQuery<IUserPersistence & Document> );

        if( userRecord != null) {
          return UserMap.toDomain(userRecord);
        }
        else
        return null;
    }

    public async findAll(): Promise<User[]> {
      const userRecords = await this.userSchema.find();

      let listaUsers: User[] = [];
      
      userRecords.forEach(user => {
        listaUsers.push(UserMap.toDomain(user));
      })
      return listaUsers;
  }

    public async save (user: User): Promise<User> {
        const query = { userId: user.id.toValue()}; 

        const userDocument = await this.userSchema.findOne( query );

        try {
        if (userDocument === null ) {
            const rawUser: any = UserMap.toPersistence(user);

            const userCreated = await this.userSchema.create(rawUser);


            return UserMap.toDomain(userCreated);
        } else {
            userDocument.id = user.id.toValue;
            userDocument.primeiroNome = user.primeiroNome;
            userDocument.ultimoNome = user.ultimoNome;
            userDocument.email = user.email.value;
            userDocument.telemovel = user.telemovel.value;
            userDocument.role = user.role.value;

            await userDocument.save();

            return user;
        }
        } catch (err) {
          throw err;
        }
    }

    public async findByEmail(userEmail: string): Promise<User> {
      const query = { email: userEmail};
        const userRecord = await this.userSchema.findOne( query as FilterQuery<IUserPersistence & Document> );

        if( userRecord != null) 
          return UserMap.toDomain(userRecord);
        
        return null;
    }
}
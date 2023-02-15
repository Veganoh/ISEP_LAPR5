import { Service, Inject } from 'typedi';
import { Result } from "../core/logic/Result";
import IAuthService from './IServices/IAuthService';
import IAuthRepo from './IRepos/IAuthRepo';
import IUserRepo from './IRepos/IUserRepo';
import config from "../../config";
import { User } from '../domain/user/user';
import { UserMap } from '../mappers/UserMap';

const jwt = require('jsonwebtoken');

@Service()
export default class AuthService implements IAuthService {
    constructor(
        @Inject(config.repos.auth.name) private authRepo : IAuthRepo,
        @Inject(config.repos.user.name) private userRepo : IUserRepo
    ) {}

    public async autenticarUtilizador(token: string): Promise<Result<any>> {
        const payload = await this.authRepo.verifyUserToken(token);

        if ( payload === null ) 
            return Result.fail( "Token do google inválido." );

        const user = await this.userRepo.findByEmail( payload['email'] );

        if ( user === null )
            return Result.fail( "O utilizador não se encontra registado no sistema." );
        
        const jwt = this.gerarJWT( user );

        if ( jwt === null )
            return Result.fail( "Erro a gerar o JWT" );

        return Result.ok( {user: UserMap.toDTO( user ), jwt: jwt } );
    }

    public gerarJWT(user: User): Promise<any> {
        let jwtSecretKey = config.jwtSecret;

        let data = UserMap.toDTO(user);

        return jwt.sign(data, jwtSecretKey, { expiresIn: '7d' });
    }
}

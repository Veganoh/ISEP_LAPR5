import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import { IUserDTO } from '../dto/IUserDTO';
import IUserRepo from './IRepos/IUserRepo';
import IUserService from './IServices/IUserService';
import { UserMap } from '../mappers/UserMap';
import { UserFactory } from '../factories/UserFactory';
import IRoleRepo from './IRepos/IRoleRepo';

@Service()
export default class UserService implements IUserService{
    constructor(
        @Inject(config.repos.user.name) private userRepo : IUserRepo,
    ){}


    public async criarUser(userDto: IUserDTO): Promise<Result<IUserDTO>> {
        try{
         

            const userOrError = await UserFactory.criarUserComDTO(userDto);

            if (userOrError.isFailure){
                return Result.fail<IUserDTO>(userOrError.errorValue());
            }
            const userResult = userOrError.getValue();

            const userExiste = await this.userRepo.exists(userResult)

            if(userExiste)
                return Result.fail<IUserDTO>("O user com ID " + userDto.userId + " já existe..." );

            await this.userRepo.save(userResult);

            const userDTOResult = UserMap.toDTO(userResult) as IUserDTO;
            
            return Result.ok<IUserDTO>( userDTOResult)
        }catch (e) {
            throw e;
        }
        
    }

    
    public async anonimizarUser(id: number): Promise<Result<IUserDTO>>{
        try{
            
            const user = await this.userRepo.findById(id);

            if (user === null){
                return Result.fail<IUserDTO>("User não encontrado");
            }

            let reg = /./gi
            const userDTOResult = UserMap.toDTO(user) as IUserDTO;
            userDTOResult.email =   userDTOResult.email.replace(reg,"x");
            userDTOResult.primeiroNome = userDTOResult.primeiroNome.replace(reg,"x");
            userDTOResult.ultimoNome = userDTOResult.ultimoNome.replace(reg,"x");
            userDTOResult.telemovel = userDTOResult.telemovel.replace(reg,"x");
            userDTOResult.role = userDTOResult.role.replace(reg,"x");

            const userNovo = UserFactory.criarUserComDTO(userDTOResult);

            if(userNovo.isFailure)
            return Result.fail(userNovo.error)

            await this.userRepo.save(userNovo.getValue());

            return Result.ok<IUserDTO>(userDTOResult);
        }catch (e){
            throw e;
        }
    }

    public async encontraUser(id: number): Promise<Result<IUserDTO>>{
        try{
            
            const user = await this.userRepo.findById(id);

            if (user === null){
                return Result.fail<IUserDTO>("User não encontrado");
            }
            else{
                const userDTOResult = UserMap.toDTO(user) as IUserDTO;
                return Result.ok<IUserDTO>(userDTOResult)
            }

        }catch (e){
            throw e;
        }
    }

    public async findAll(): Promise<Result<IUserDTO[]>> {
            try{
                const listaResultadoUsers = await this.userRepo.findAll();

                if (listaResultadoUsers === null || listaResultadoUsers.length === 0) 
                    return Result.fail("Não foram encontrados users...");

                let listaUsersDTO: IUserDTO[] = [];

                listaResultadoUsers.forEach(user => {
                    const userDTO = UserMap.toDTO(user);
                    listaUsersDTO.push(userDTO);
                })
                return Result.ok<IUserDTO[]> ( listaUsersDTO );
            }catch (e){
                throw e;
            }
    }
}
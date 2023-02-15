import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import IUserController from './IControllers/IUserController';
import IUserService from '../services/IServices/IUserService';
import { IUserDTO } from '../dto/IUserDTO';
import { Result } from "../core/logic/Result";



@Service()
export default class UserController implements IUserController {
  constructor(
      @Inject(config.services.user.name) private serviceInstance : IUserService
  ) {}

  public async criarUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.serviceInstance.criarUser(req.body as IUserDTO) as Result<IUserDTO>;
  
      if (userOrError.isFailure) {
        return res.status(402).send(userOrError.error);
      }

      const userDTO = userOrError.getValue();
      return res.json( userDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };
  
  public async encontraUser(req: Request, res: Response, next: NextFunction){
    try{
        const userOrError = await this.serviceInstance.encontraUser(req.params.userId as unknown as number) as Result<IUserDTO>;
     
        if(userOrError.isFailure){
          return res.status(404).send(userOrError.error);
      }
      
      const userDTO = userOrError.getValue();
      
      return res.json(userDTO).status(202);
    } catch(e){
      return next(e);
    }
  }

  public async findAll(req: Request, res: Response, next: NextFunction){
    try{
      const userOrError = await this.serviceInstance.findAll() as Result<IUserDTO[]>;

      if(userOrError.isFailure){
          return res.status(404).send(userOrError.error);
      }

      const userDTO = userOrError.getValue();
      return res.json(userDTO).status(202);
    } catch(e){
      return next(e);
    }
  }

    
  public async anonimizarUser(req: Request, res: Response, next: NextFunction){
    try{
      const userOrError = await this.serviceInstance.anonimizarUser(req.params.userId as unknown as number) as Result<IUserDTO>;

      if(userOrError.isFailure){
        return res.status(404).send(userOrError.error);
      }

      const userDTO = userOrError.getValue();
      return res.json( userDTO ).status(201);
    }catch(e){
      return next(e);
    }
  }
}
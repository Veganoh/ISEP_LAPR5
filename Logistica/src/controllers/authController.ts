import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import IAuthService from '../services/IServices/IAuthService';

import IAuthController from './IControllers/IAuthController';


@Service()
export default class AuthController implements IAuthController {
    constructor(
        @Inject(config.services.auth.name) private authServiceInstance : IAuthService
    ) {} 

    public async autenticarUtilizador(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtTokenOrError = await this.authServiceInstance.autenticarUtilizador(req.body.credentials);
            
            if ( ( jwtTokenOrError ).isFailure ) 
                return res.status(401).send( jwtTokenOrError.error );

            
            return res.json( jwtTokenOrError.getValue() ).status(200);
        }
        catch (e) {
            return next(e);
        }
    };
  
}
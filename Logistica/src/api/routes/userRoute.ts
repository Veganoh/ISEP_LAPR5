import { application, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import IUserController from '../../controllers/IControllers/IUserController';

import config from "../../../config";
import { authenticateToken } from '../middlewares/isAuth';

const route = Router();

export default (app: Router) => {
  app.use((req, res, next) => { 
    authenticateToken(req, res, next); 
	});
  
  app.use('/users', route);

  const ctrl = Container.get(config.controllers.user.name) as IUserController;

  route.post('',
    celebrate({
      body: Joi.object({
        userId: Joi.number().required(),
        primeiroNome: Joi.string().required(),
        ultimoNome: Joi.string().required(),
        email: Joi.string().required(),
        telemovel: Joi.string().required(),
        role: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.criarUser(req, res, next) );

    route.patch('/:userId', function(req,res,next){ ctrl.anonimizarUser(req,res,next); }); 

    route.get('', function(req,res,next){ ctrl.findAll(req,res,next); }); 

    route.get('/pagina', function(req, res, next){ ctrl.findAll(req, res, next); });

    route.get('/:userId', function(req,res,next){ ctrl.encontraUser(req,res,next); }); 

  };

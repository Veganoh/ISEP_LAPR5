import { application, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import IEnpacotamentoController from '../../controllers/IControllers/IEnpacotamentoController';

import config from "../../../config";
import { authenticateToken } from '../middlewares/isAuth';

const route = Router();

export default (app: Router) => {
  app.use((req, res, next) => { 
    authenticateToken(req, res, next); 
	});
  
  app.use('/enpacotamentos', route);

  const ctrl = Container.get(config.controllers.enpacotamento.name) as IEnpacotamentoController;

  route.post('',
    celebrate({
      body: Joi.object({
        domainId: Joi.number().required(),
        entrega: Joi.string().required(),
        matricula: Joi.string().required(),
        tempoColocacao: Joi.number().required(),
        tempoRetirada: Joi.number().required(),
        coordenadaX: Joi.number().required(),
        coordenadaY: Joi.number().required(),
        coordenadaZ: Joi.number().required(),
      })
    }),
    (req, res, next) => ctrl.criarEnpacotamento(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        domainId: Joi.number().required(),
        matricula: Joi.string().required(),
        tempoColocacao: Joi.number().required(),
        tempoRetirada: Joi.number().required(),
        coordenadaX: Joi.number().required(),
        coordenadaY: Joi.number().required(),
        coordenadaZ: Joi.number().required(),
      })
    }),
    (req, res, next) => ctrl.editarEnpacotamento(req, res, next) );
  
    route.get('', function(req,res,next){ ctrl.encontraTodosEnpacotamentos(req,res,next); }); 

    route.get('/pagina', function(req, res, next){ ctrl.listarPaginaEnpacotamentos(req, res, next); });

    route.get('/:domainId', function(req,res,next){ ctrl.encontraEnpacotamento(req,res,next); }); 

  };

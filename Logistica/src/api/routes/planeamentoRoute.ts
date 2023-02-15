import { application, Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IPlaneamentoController from '../../controllers/IControllers/IPlaneamentoController';
import { authenticateToken } from '../middlewares/isAuth';

const route = Router();

export default (app: Router) => {
  app.use((req, res, next) => { 
    authenticateToken(req, res, next); 
	});
  
  app.use('/planeamento', route);

  const ctrl = Container.get(config.controllers.planeamento.name) as IPlaneamentoController;

    route.post('',
    celebrate({
        body: Joi.object({
          camiaoId: Joi.string().required(),
          data: Joi.string().required(),
          algoritmo: Joi.number().required().min(1).max(4)
        })
    }),
    (req, res, next) => ctrl.obterPlaneamento(req, res, next)
    );  

    route.post('/frota',
    celebrate({
        body: Joi.object({
          camiaoId: Joi.string().required(),
          data: Joi.string().required(),
          algoritmo: Joi.number().required().min(5).max(6)
        })
    }),
    (req, res, next) => ctrl.obterPlaneamentoFrota(req, res, next)
    );

    route.post('/persistir',
    celebrate({
        body: Joi.object({
          camiao: Joi.string().required(),
          data: Joi.string().required(),
          rota: Joi.array().items(Joi.string()).min(3).required()
        })
    }),
    (req, res, next) => ctrl.persistirPlaneamento(req, res, next)
    );

    route.get('/rotas',
    function(req,res,next){
      ctrl.obterRotaFixa(req,res,next);
    });

    route.get('/pagina', (req, res, next) =>
      ctrl.listarPaginaRotas(req, res, next)
    );

};


import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IAuthController from '../../controllers/IControllers/IAuthController';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  const ctrl = Container.get(config.controllers.auth.name) as IAuthController;

  route.post('',
    celebrate({
        body: Joi.object({
            credentials: Joi.string().required()
        })
    }),
    (req, res, next) => ctrl.autenticarUtilizador(req, res, next) );

};


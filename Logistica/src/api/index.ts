import { Router } from 'express';
import auth from './routes/authRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import camiao from './routes/camiaoRoute';
import percurso from './routes/percursoRoute';
import enpacotamento from './routes/enpacotamentoRoute';
import planeamento from './routes/planeamentoRoute';
import { authenticateToken } from './middlewares/isAuth';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	camiao(app);
	percurso(app);
	enpacotamento(app);
	planeamento(app);


	return app
}
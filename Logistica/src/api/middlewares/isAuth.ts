import jwt from 'jsonwebtoken';
import config from '../../../config';

export function authenticateToken(req, res, next) {

  try {
    if ((req.headers.authorization && req.headers.authorization.split(' ')[0] !== 'Token') && (req.headers.authorization && req.headers.authorization.split(' ')[0] !== 'Bearer')) 
      return res.sendStatus(401);
      
    const token = req.headers.authorization.split(' ')[1];

    if ( token == null ) 
      return res.sendStatus(401);

    jwt.verify( token, config.jwtSecret as string, (err: any, user: any) => {

      if ( err ) 
        return res.sendStatus(403);

      req.user = user;

      next();
    })
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
}

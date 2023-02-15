import { Service } from 'typedi';

import config from '../../config';
import IAuthRepo from '../services/IRepos/IAuthRepo';

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(config.google_client_id);


@Service()
export default class AuthRepo implements IAuthRepo {
    async verifyUserToken(token: string): Promise<any> {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: config.google_client_id,
            });
            
            const payload = ticket.getPayload();
            
            return  payload;
        } catch (e) {
            return null
        }
    }

    exists(t: String): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    save(t: String): Promise<String> {
        throw new Error('Method not implemented.');
    }
}
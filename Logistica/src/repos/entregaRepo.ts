import { Service } from 'typedi';

import IEntregaRepo from '../services/IRepos/IEntregaRepo';
import config from '../../config';

const https = require('https');

@Service()
export default class EntregaRepo implements IEntregaRepo{
    
    public async exists(entrega: string): Promise<boolean> {
        let url = config.gestao_armazens_url.split("//")[1];
        let hostname = url.split(":")[0];
        let port = url.split(":")[1];

        const options = {
            hostname: hostname,
            port: port,
            path: '/api/Entregas/' + entrega,
            headers: {
                Authorization: `Bearer ${config.jwtToken}`
            }
        }

        try {
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; 
            
            return await https.get(options, (resp: any) => {
                if (resp.statusCode === 200)
                    return true;

                return false;
            }).on("error", (err) => {
                throw err;
            })
        } catch ( e ) {
            throw e;
        }
    }

    public async save(entrega : string): Promise<string> {return null;}
}


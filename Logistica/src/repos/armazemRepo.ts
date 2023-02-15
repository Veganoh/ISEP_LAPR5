import { Service } from 'typedi';

import IArmazemRepo from '../services/IRepos/IArmazemRepo';
import config from '../../config';

const https = require('https');

@Service()
export default class ArmazemRepo implements IArmazemRepo {

    public async exists(armazem: string): Promise<boolean> {
        const url = config.gestao_armazens_url.split("//")[1];
        const hostname = url.split(":")[0];
        const port = url.split(":")[1];

        const options = {
            hostname: hostname,
            port: port,
            path: '/api/Armazens/' + armazem,
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

    public async save(armazem: string): Promise<string> { return null;}
}
import { Env } from '../environments/profiles/env';

export const environment = {
    env: Env.dev,
    production: false,
    apiUrl:'http://localhost:3307/api/',
    authenticateUrl :'http://localhost:3307/authenticate'
};

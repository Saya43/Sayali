import { Env } from "./profiles/env";

export const environment = {
  env: Env.production,
  production: true,
  apiUrl:'http://localhost:3307/api/',
  authenticateUrl :'http://localhost:3307/authenticate'

};

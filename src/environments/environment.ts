// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Env } from "./profiles/env";

export const environment = {
  env: Env.dev,
  production: false,
  //  apiUrl:'http://localhost:8080/api/',
  //  authenticateUrl :'http://localhost:8080/authenticate'
    apiUrl:'https://internal-uat-cp.godrejhf.com/api/',
   authenticateUrl :'https://internal-uat-cp.godrejhf.com/authenticate'

};


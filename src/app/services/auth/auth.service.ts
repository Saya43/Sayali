
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
 import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data={"applicationId":"app1",
   "secretKey":"application1"}
  constructor(private http:HttpClient) { }
    authenticateUser():Observable<any>{

    const headers = { 'content-type': 'application/json',
                      'access-control-allow-origin':'*',
                      'X-Frame-Options': 'deny'                    }  
    const body=JSON.stringify(this.data);
    return this.http.post(environment.authenticateUrl, this.data,{'headers':headers})
}
errorHandler(error: HttpErrorResponse) {
  return throwError(error|| "server error.");
}
}


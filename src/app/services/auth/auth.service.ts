
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data={"applicationId":"app1",
   "secretKey":"application1"}
  constructor(private http:HttpClient) { }
    authenticateUser():Observable<any>{

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(this.data);
    console.log(body)
    return this.http.post(environment.authenticateUrl, this.data,{'headers':headers})
}
}


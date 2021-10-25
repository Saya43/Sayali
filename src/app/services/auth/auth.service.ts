import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrl ='http://localhost:8080/authenticate'
 data={"username":"flentas",
  "password":"password"}
  constructor(private http:HttpClient) { }
authenticateUser():Observable<any>{
  
//   const formData = new FormData(); 

//   //formData.append('data',this.data);
//   const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
// return this.http.post(this.baseApiUrl,this.data,config)
const headers = { 'content-type': 'application/json'}  
const body=JSON.stringify(this.data);
console.log(body)
return this.http.post(this.baseApiUrl, this.data,{'headers':headers})
}
}

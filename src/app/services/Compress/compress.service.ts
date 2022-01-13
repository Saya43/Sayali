
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
 import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompressService {
compress='compress'
compresspdf='compresspdf'
accessToken:any
  constructor(private http:HttpClient) { }

  //during making http request add observable 
  upload(dataSource:any,isChecked:any):Observable<any> {
    this.accessToken= sessionStorage.getItem('accessToken');

     const headers = { 'Authorization': `Bearer ${this.accessToken}`,
                      'access-control-allow-origin':'*',
                      'X-Frame-Options': 'deny'
    }  
    // Create form data
    const formData = new FormData(); 
    for  (var i =  0; i <  dataSource.length; i++)  { 
      var data:any=dataSource[i] 
      formData.append("file",data);
     
    }
    if(isChecked===true){
      return this.http.post(environment.apiUrl+this.compress, formData,{'headers':headers,responseType:'blob'}).pipe(catchError(this.errorHandler))
    }
    else{
      return this.http.post(environment.apiUrl+this.compresspdf, formData,{'headers':headers,responseType:'blob'}).pipe(catchError(this.errorHandler))
    }
    
}
  errorHandler(error: HttpErrorResponse) {
    return throwError(error || "server error.");
  }
}

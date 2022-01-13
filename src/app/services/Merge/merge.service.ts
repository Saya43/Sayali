import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
 import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// import { Observable } from 'rxjs/Rx'

@Injectable({
  providedIn: 'root'
})
export class MergeService {
httpOptions:any
merge='merge'
accessToken:any
  constructor(private http:HttpClient) { }
    
  //during making http request add observable 
  upload(dataSource:any):Observable<any> {
   this.accessToken= sessionStorage.getItem('accessToken');

   const headers = { 'Authorization': `Bearer ${this.accessToken}`,
                     'access-control-allow-origin':'*',
                     'X-Frame-Options': 'deny'
                     }  
   // Create form data
   const formData = new FormData(); 
     for  (var i =  0; i <  dataSource.length; i++)  { 
       var data:any=dataSource[i] 
       formData.append("files",data);
     }
     return this.http.post(environment.apiUrl+this.merge, formData,{'headers':headers,responseType:'blob'}).pipe(catchError(this.errorHandler))
    }

   errorHandler(error: HttpErrorResponse) {
        return throwError(error || "server error.");
    }

}

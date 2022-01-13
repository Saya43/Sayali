import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
 import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SplitService {
split='split'
accessToken:any

  constructor(private http:HttpClient) { }
  
  upload(dataSource:any,Ranges:any):Observable<any>  {
    this.accessToken= sessionStorage.getItem('accessToken');

    const headers = { 'Authorization': `Bearer ${this.accessToken}`,
                      'access-control-allow-origin':'*',
                      'X-Frame-Options': 'deny'
                    }  
    const formData = new FormData(); 
    formData.append("file",dataSource[0]);
    formData.append("pageRange",Ranges);

    return this.http.post(environment.apiUrl+this.split, formData,{'headers':headers,responseType:'blob'}).pipe(catchError(this.errorHandler))
  }
  errorHandler(error: HttpErrorResponse) {
    
    return throwError(error|| "server error.");
}
}


import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompressService {
compress='compress'
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
      formData.append("file",data);
     
    }
    return this.http.post(environment.apiUrl+this.compress, formData,{'headers':headers,responseType:'blob'})
    
}
}

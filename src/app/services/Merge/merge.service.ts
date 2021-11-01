
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

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

    const headers = { 'Authorization': `Bearer ${this.accessToken}`}  
    // Create form data
    const formData = new FormData(); 
      for  (var i =  0; i <  dataSource.length; i++)  { 
        var data:any=dataSource[i] 
        formData.append("files",data);
      }
      console.log(headers)
    return this.http.post(environment.apiUrl+this.merge, formData,{'headers':headers,responseType:'blob'})
  }

}

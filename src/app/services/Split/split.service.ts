
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SplitService {
split='split'
accessToken:any

  constructor(private http:HttpClient) { }
  
  upload(dataSource:any,Ranges:any):Observable<any>  {
    this.accessToken= sessionStorage.getItem('accessToken');

    const headers = { 'Authorization': `Bearer ${this.accessToken}`}  
    console.log(dataSource)
    const formData = new FormData(); 
    formData.append("file",dataSource[0]);
    formData.append("pageRange",Ranges);

    console.log(formData.getAll("files"))
    return this.http.post(environment.apiUrl+this.split, formData,{'headers':headers,responseType:'blob'})}
}

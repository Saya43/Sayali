
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MergeService {
httpOptions:any
  constructor(private http:HttpClient) { }
  baseApiUrl = "http://localhost:8080/api/merge"
  //during making http request add observable 
  upload(dataSource:any):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
   // formData.append("file", dataSource, dataSource.name);
      for  (var i =  0; i <  dataSource.length; i++)  { 
        var data:any=dataSource[i] 
        formData.append("files",data);
        // formData.append("ranges",range)
     
     }
    // Make http post request over api
    // with formData as req
    console.log(formData)
    console.log(formData.getAll("files"))
    return this.http.post(this.baseApiUrl, formData,{responseType:'blob'})
    //console.log(formData.getAll("file"))
}

}

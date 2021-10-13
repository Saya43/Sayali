
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompressService {

  constructor(private http:HttpClient) { }
  baseApiUrl = "https://file.io"
  //during making http request add observable 
  upload(dataSource:any) {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
   // formData.append("file", dataSource, dataSource.name);
         for  (var i =  0; i <  dataSource.length; i++)  { 
      var data:any=dataSource[i] 
      formData.append("file",data);
      // formData.append("ranges",range)
     
     }
    // Make http post request over api
    // with formData as req
    //return this.http.post(this.baseApiUrl, formData)
    console.log(formData.getAll("file"))
}
}

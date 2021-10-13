
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplitService {

  constructor(private http:HttpClient) { }
  baseApiUrl = "https://file.io"
  //during making http request add observable 
  upload(dataSource:any,Ranges:any) {
  
    // Create form data
    const formData = new FormData(); 
    //      for  (var i =  0; i <  dataSource.length; i++)  { 
    //   var data:any=dataSource[i] 
    //   formData.append("file",data);
    //   formData.append("ranges",Ranges)
     
    //  }
    dataSource[0].ranges=Ranges
    console.log(dataSource)
    // Make http post request over api
    // with formData as req
    //return this.http.post(this.baseApiUrl, formData)
}
}

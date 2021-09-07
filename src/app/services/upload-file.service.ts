
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    
  // API url
  baseApiUrl = "https://file.io"
    
  constructor(private http:HttpClient) { }
  
  // Returns an observable
  upload(files:any):Observable<any> {
  
      // Create form data
      const formData: FormData = new FormData();
      // console.log(files)
        
      // Store form name as "file" with file data
      formData.append("file", files);
      // console.log("sayali patil"+formData)
        
      // Make http post request over api
      // with formData as req
      console.log("insidev service ",formData.getAll("file"))
      return this.http.post(this.baseApiUrl, formData)
  }
}
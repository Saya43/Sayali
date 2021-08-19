import { Component, OnInit } from '@angular/core';
import  {  HttpClient  }  from  '@angular/common/http';
import  {  FormGroup,  FormControl,  Validators}  from  '@angular/forms';
@Component({
  selector: 'app-compress',
  templateUrl: './compress.component.html',
  styleUrls: ['./compress.component.css']
})
export  class  CompressComponent {
  files:string  []  =  [];
  uploadForm =  new  FormGroup({
     file:  new  FormControl('',  [Validators.required])
   });
  myFiles: any;
 
  constructor(private httpClient:  HttpClient)  {  }
  get f(){
      return  this.uploadForm.controls;
   }
   isShown: boolean = false ; // hidden by default

  onFileChange(event:any){
    for  (var i =  0; i <  event.target.files.length; i++)  {  
      var name = event.target.files[i].name;
      var type = event.target.files[i].type;
      var size = event.target.files[i].size;
      var modifiedDate = event.target.files[i].lastModifiedDate;
      
      console.log ('Name: ' + name + "\n" + 
        'Type: ' + type + "\n" +
        'Last-Modified-Date: ' + modifiedDate + "\n" +
        'Size: ' + Math.round(size / 1024) + " KB");   
      this.files.push(event.target.files[i].name);
    }
      this.isShown = ! this.isShown;
  }
 submitForm(){
    const formData =  new  FormData();
    for  (var i =  0; i <  this.myFiles.length; i++)  {  
      formData.append("file[]",  this.myFiles[i]);
   } 
  }
}


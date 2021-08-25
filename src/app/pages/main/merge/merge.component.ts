import { Component, OnInit } from '@angular/core';
import  {  HttpClient  }  from  '@angular/common/http';

import  {  FormGroup,  FormControl,  Validators}  from  '@angular/forms';
@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})

export class MergeComponent implements OnInit {
  files:string  []  =  [];
  myFiles: any;
  isLoading=false;
  isShown: boolean = false ; // hidden by default
totalCount:number;
bestPractices: any = [];
bestPracticesTemp: any = [];

  uploadForm =  new  FormGroup({
     file:  new  FormControl('',  [Validators.required])
  });
 
  constructor(private http: HttpClient)  {  }
 /**
   * Show loader screen
   */
  start() {
    this.isLoading = true;
    this.wait(2000).then( () => this.isLoading = false );
  }

  async wait(ms: number): Promise<void> {
    return new Promise<void>( resolve => setTimeout( resolve, ms) );
  }
  
   get f(){
      return  this.uploadForm.controls;
   }

  onFileChange(event:any)  {
console.log(event.target.files)

this.bestPractices=event.target.files;
this.bestPracticesTemp=this.bestPractices;
    for  (var i =  0; i <  event.target.files.length; i++)  {  
      var name = event.target.files[i].name;
      var type = event.target.files[i].type;
      var size = event.target.files[i].size;
      var modifiedDate = event.target.files[i].lastModifiedDate;
     
      // console.log ('Name: ' + name + "\n" + 
      //               'Type: ' + type + "\n" +
      //               'Last-Modified-Date: ' + modifiedDate + "\n" +
      //               'Size: ' + Math.round(size / 1024) + " KB");   
      this.files.push(event.target.files[i].name);

    }
    this.totalCount=this.files.length;
    this.isShown = ! this.isShown;
  }
 
  submitForm(){
    const formData =  new  FormData();
    for  (var i =  0; i <  this.myFiles.length; i++)  {  
      formData.append("file[]",  this.myFiles[i]);
    } 
  }
  

  ngOnInit(): void {
    this.start()
    // const promise = this.http.get('').toPromise();
    // promise.then((data: any) => {
    //   this.bestPractices = data;
    //   this.bestPracticesTemp = this.bestPractices;
    // }).
    // catch((error: any) => {
    //   console.error('Promise rejected with : ' + JSON.stringify(error));
    // });


  }
}

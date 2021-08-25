import { Component, OnInit,TemplateRef } from '@angular/core';
import  {  HttpClient  }  from  '@angular/common/http';
import  {  FormGroup,  FormControl,  Validators}  from  '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.css']
})
export class SplitComponent implements OnInit {
  files:string  []  =  [];
  uploadForm =  new  FormGroup({
    file:  new  FormControl('',  [Validators.required])
  });

myFiles: any;
isLoading=false;
isShown: boolean = false ; // hidden by default
//changes made here
formModal1: BsModalRef;
constructor(private httpClient:  HttpClient,private modalService:BsModalService)  {  }
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
  
    openFormModal1(modalForm1: TemplateRef<any>): void{
      this.formModal1= this.modalService.show(modalForm1, {
        // backdrop: 'static',
      //   keyboard: false,
      //   class: 'modal-dialog-centered',
       });
    }
  ngOnInit(): void {
    this.start()
  }
}

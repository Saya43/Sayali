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
  clicked = false;
  dropDownFlag = false;
  dropdownDefaultValue = 'Select';
 
  websiteList: any = ['Normal Quality', 'High Quality', 'Best Quality']
   
  form = new FormGroup({
    website: new FormControl('', Validators.required)
  });
   
  get f(){
    return this.form.controls;
  }
   
  submit(){
    console.log(this.form.value);
  }
 
  constructor(private httpClient:  HttpClient)  {  }
  /**
   * Show/Hide constitution dropdown
   */
   showConstitutionDropdown(): void{
    if(this.dropDownFlag === true){
      this.clicked = this.dropDownFlag = false;
    }
    else{
      this.clicked = this.dropDownFlag = true;
    }
  }
  
  /**
   * Set constitution formcontrol value
   */
   setConstitution(constitution: string): void{
    // this.signUpDetails.controls['constitution'].setValue(constitution);
    this.dropdownDefaultValue = constitution;
    this.clicked = this.dropDownFlag = false;
  }


  // get f(){
  //     return  this.uploadForm.controls;
  //  }
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


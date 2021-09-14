import { Component, OnInit } from '@angular/core';
import  {  HttpClient  }  from  '@angular/common/http';
import  {  FormGroup,  FormControl,FormBuilder,  Validators}  from  '@angular/forms';
@Component({
  selector: 'app-compress',
  templateUrl: './compress.component.html',
  styleUrls: ['./compress.component.css']
})
 export  class  CompressComponent implements OnInit {
  files:string  []  =  [];
  uploadForm =  new  FormGroup({
    file:  new  FormControl('',  [Validators.required])
  });

  signUpDetails: any = FormGroup;
myFiles: any;
isLoading=false;
isShown: boolean = false ; // hidden by default

dropdownDefaultValue = 'Select';

constitutionList = [
  {
    name: 'Normal Quality'
  },
  {
    name: 'High Quality'
  },
  {
    name: 'Best Quality'
  }
];

clicked = false;
dropDownFlag = false;


// websiteList: any = ['Normal Quality', 'High Quality', 'Best Quality']
   
// form = new FormGroup({
//   website: new FormControl('', Validators.required)
// });
 
// get f(){
//   return this.form.controls;
// }
 
// submit(){
//   console.log(this.form.value);
// }
constructor(private httpClient:  HttpClient,private fb: FormBuilder)  {  }
start() {
    this.isLoading = true;
    this.wait(2000).then( () => this.isLoading = false );
  }
  
  async wait(ms: number): Promise<void> {
    return new Promise<void>( resolve => setTimeout( resolve, ms) );
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
    ngOnInit(): void {
      this.start()
      this.signUpDetails = this.fb.group({
        firstName: ['', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required
        ])],
        lastName: ['', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required
        ])],
        channelPartnerName: ['', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required
        ])],
        constitution: ['', Validators.required],
        emailId: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        ])],
        contactNumber: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
        ])]
      })
    }
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
    this.signUpDetails.controls['constitution'].setValue(constitution);
    this.dropdownDefaultValue = constitution;
    this.clicked = this.dropDownFlag = false;
  }
}

  
  
//   files:string  []  =  [];
//   uploadForm =  new  FormGroup({
//      file:  new  FormControl('',  [Validators.required])
//    });
//   myFiles: any;

 
//   websiteList: any = ['Normal Quality', 'High Quality', 'Best Quality']
   
//   form = new FormGroup({
//     website: new FormControl('', Validators.required)
//   });
   
//   get f(){
//     return this.form.controls;
//   }
   
//   submit(){
//     console.log(this.form.value);
//   }
 
//   constructor(private httpClient:  HttpClient)  {  }
  
//    isShown: boolean = false ; // hidden by default

//   onFileChange(event:any){
//     for  (var i =  0; i <  event.target.files.length; i++)  {  
//       var name = event.target.files[i].name;
//       var type = event.target.files[i].type;
//       var size = event.target.files[i].size;
//       var modifiedDate = event.target.files[i].lastModifiedDate;
      
//       console.log ('Name: ' + name + "\n" + 
//         'Type: ' + type + "\n" +
//         'Last-Modified-Date: ' + modifiedDate + "\n" +
//         'Size: ' + Math.round(size / 1024) + " KB");   
//       this.files.push(event.target.files[i].name);
//     }
//       this.isShown = ! this.isShown;
//   }
//  submitForm(){
//     const formData =  new  FormData();
//     for  (var i =  0; i <  this.myFiles.length; i++)  {  
//       formData.append("file[]",  this.myFiles[i]);
//    } 
//   }
// }






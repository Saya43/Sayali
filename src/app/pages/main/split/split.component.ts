import { Component, OnDestroy, OnInit,TemplateRef } from '@angular/core';
import  {  HttpClient  }  from  '@angular/common/http';
import  {  FormGroup,  FormControl,  Validators}  from  '@angular/forms';
import{SplitService} from '../../../services/Split/split.service'
 import { ValidationMessages } from '../../../shared/models/validation-messages';

interface Compress{
  lastModified: any,
  lastModifiedDate: any,
  name:any,
  size: any,
  type: any,
  srNo:any,
  webkitRelativePath: any
  
}
let ELEMENT_DATA:Compress[] = [
]
@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.css']
})
export class SplitComponent implements OnInit,OnDestroy {
  files:string  []  =  [];
  uploadForm =  new  FormGroup({
    file:  new  FormControl('',  [Validators.required])
  });
ranges:any;
myFiles: any;
isLoading=false;
isShown: boolean = false ; // hidden by default
dataSource = ELEMENT_DATA;
bestPractices: any = [];
bestPracticesTemp: any = [];
validationFlag:boolean=false;
invalidFormatValidation:any=ValidationMessages.invalidRange;
//changes made here
constructor(private httpClient:  HttpClient,private uploadService: SplitService)  {  }
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
    this.bestPractices=event.target.files;
    this.bestPracticesTemp=this.bestPractices;
      for  (var i =  0; i <  event.target.files.length; i++)  {  
        var name = event.target.files[i].name;
        var type = event.target.files[i].type;
        var size = event.target.files[i].size;
        var modifiedDate = event.target.files[i].lastModifiedDate; 
        console.log(event.target.files)
        this.files.push(event.target.files[i].name);
        ELEMENT_DATA.push(event.target.files[i]);
  
      }
       if(this.isShown===true){
        this.isShown=true
      }
      else{
        this.isShown= !this.isShown
      }
      
      this.dataSource = [...ELEMENT_DATA];
    }
   submit(){
     var regex=/^[0-9\-,]+$/
     var result=regex.test(this.ranges)
     if(result==false){
//error message to be shown
  console.log("error")
  this.validationFlag=true
     }
     else if(result==true){
      let temp=this.ranges.split(",")
      console.log(temp)
      for(let i=0;i<temp.length;i++){
        if(temp[i].includes("-")){
             let temp1=temp[i].split("-")
             if(temp1[0]<temp1[1]){
              this.validationFlag=false

              this.uploadService.upload(this.dataSource,this.ranges)
             }
             else{
               //error messagre shown
               console.log("error")
               this.validationFlag=true

             }
        }
        else  if(temp[i]=='') 
        {
          this.validationFlag=true
          console.log('error to be shown')
        }
        // console.log(temp[i])
        // console.log(temp[i]=='')


      }
     }
    //this.uploadService.upload(this.dataSource,this.ranges)

    }
  
  
  ngOnInit(): void {
    this.start()
    this.dataSource=[]
  ELEMENT_DATA=[]
  }
  ngOnDestroy(): void {
  }
}

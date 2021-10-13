import { Component, OnDestroy, OnInit } from '@angular/core';
import  {  HttpClient  }  from  '@angular/common/http';
import  {  FormGroup,  FormControl,FormBuilder,  Validators}  from  '@angular/forms';
import{CompressService} from '../../../services/Compress/compress.service'

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
  selector: 'app-compress',
  templateUrl: './compress.component.html',
  styleUrls: ['./compress.component.css']
})

export  class  CompressComponent implements OnInit,OnDestroy {
  files:string  []  =  [];
  uploadForm =  new  FormGroup({
    file:  new  FormControl('',  [Validators.required])
  });

signUpDetails: any = FormGroup;
myFiles: any;
isLoading=false;
isShown: boolean = false ; // hidden by default
clicked = false;
dropDownFlag = false;
dropdownDefaultValue = 'Select';
dataSource = ELEMENT_DATA;
bestPractices: any = [];
bestPracticesTemp: any = [];
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

constructor(private httpClient:  HttpClient,private fb: FormBuilder,private uploadService: CompressService)  {  }
// show loader
start() {
    this.isLoading = true;
    this.wait(2000).then( () => this.isLoading = false );
}
  
async wait(ms: number): Promise<void> {
  return new Promise<void>( resolve => setTimeout( resolve, ms) );
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
submitFo(){
  this.uploadService.upload(this.dataSource)

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
  this.dataSource=[]
  ELEMENT_DATA=[]
}
ngOnDestroy(): void {
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









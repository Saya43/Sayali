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
  myFiles: any;
  isLoading=false;
  isShown: boolean = false ; // hidden by default
  dataSource = ELEMENT_DATA;
  uploadForm =  new  FormGroup({
    file:  new  FormControl('',  [Validators.required])
  });




constructor(private httpClient:  HttpClient,private uploadService: CompressService)  {  }
  // show loader
  start() {
      this.isLoading = true;
      this.wait(2000).then( () => this.isLoading = false );
  }
  
  async wait(ms: number): Promise<void> {
    return new Promise<void>( resolve => setTimeout( resolve, ms) );
  }
  
  //input file selection function
  onFileChange(event:any){

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

  //file upload function
  submitForm(){
    this.uploadService.upload(this.dataSource).subscribe(
      (event: any) => {
        let url = window.URL.createObjectURL(event);
          let a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = 'compressed.jpg';
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        console.log(event)
      }
    )
  }
  ngOnInit(): void {
    this.start()
    
    this.dataSource=[]
    ELEMENT_DATA=[]
  }
  ngOnDestroy(): void {
  }


}









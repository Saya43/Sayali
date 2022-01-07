
import { Component, OnDestroy, OnInit } from '@angular/core';
import  {  HttpClient  }  from  '@angular/common/http';
import  {  FormGroup,  FormControl,FormBuilder,  Validators}  from  '@angular/forms';
import{CompressService} from '../../../services/Compress/compress.service'
import { AuthService } from '../../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  disabled:boolean=false;
  submit:boolean=false
  isChecked:boolean = true;
  isLoading=false;
  success:boolean=false;
  isError4:boolean=false;
  isError401:boolean=false;
  isError0: boolean=false;
  isErrorNotJpg:boolean=false;
  isErrorNotPdf:boolean=false;
  error500:boolean=false;
  isShown: boolean = false ; // hidden by default
  Compresser: string='Image';
  compress: string[] = ['PDF', 'Image'];
status:any=2;
statusId:any=2;


  dataSource = ELEMENT_DATA;
  uploadForm =  new  FormGroup({
    file:  new  FormControl('',  [Validators.required])
    
  });
  filterByStatus: any = [
    {
      "name": 'PDF',
      "checked": false,
      "id": 1,
      "disabled":false
    },

    {
      "name": 'Image',
      "checked": true,
      "id": 2,
      "disabled":false
    }
];



constructor(private httpClient:  HttpClient,private uploadService: CompressService,private authservice:AuthService,private _snackBar: MatSnackBar)  {  }
  // show loader
  pageLoader() {
    this.isLoading = true;
    this.wait(2000).then( () => this.isLoading = false );
  }
  start() {
    this.isLoading = true;
  }
  stop() {
    this.isLoading = false;
  }
  async wait(ms: number): Promise<void> {
    return new Promise<void>( resolve => setTimeout( resolve, ms) );
  }

     
snackBarSuccess(message:any){

  this._snackBar.open(message, ' ', {
  duration: 3000
  });
   $(".mat-snack-bar-container").css({
    'background-color': '#9FC356',
    'color':'white' 

  });
  $(".mat-simple-snackbar span").css({
    'font-weight': '500',
  });
}


snackBarFailure(err:any){
  this._snackBar.open(err,'', {
  duration: 3000,
  });
  $(".mat-snack-bar-container").css({
    'background-color': 'red',
    'color':'white' 

  });
  $(".mat-simple-snackbar span").css({
    'font-weight': '500'
  });
}

  //input file selection function
  onFileChange(event:any){
      if(this.isChecked==true){
        var allowedExtension = ".jpg";
        var allowedExtension2 = ".jpeg";
        var hasInvalidFiles = false;
        for (var i = 0; i < event.target.files.length; i++) {
          var name = event.target.files[i].name;
          if (!name.endsWith(allowedExtension) && !name.endsWith(allowedExtension2)) {
          hasInvalidFiles = true;
        }
      }
      if (hasInvalidFiles) {
        //this.selectedFile.value = ""; 
        // alert("asdas","Unsupported file selected.");
        this.snackBarFailure("Please select only JPG/JPEG files")
        // this.isErrorNotJpg = true
        // this.wait(3000).then(() => this.isErrorNotJpg = false);
        // return;
      }
    }
    else if(this.isChecked==false){
      var allowedExtension = ".pdf";
      var hasInvalidFiles = false;
      for (var i = 0; i < event.target.files.length; i++) {
        var name = event.target.files[i].name;
        if (!name.endsWith(allowedExtension)) {
          hasInvalidFiles = true;
        }
      }
      if (hasInvalidFiles) {
        //this.selectedFile.value = ""; 
        // alert("asdas","Unsupported file selected.");
        this.snackBarFailure("Please select only PDF files")
        // this.isErrorNotPdf = true
        // this.wait(3000).then(() => this.isErrorNotPdf = false);
        // return;
      }
    }
      for  (var i =  0; i <  event.target.files.length; i++)  {  
        var name = event.target.files[i].name;
        var type = event.target.files[i].type;
        var size = event.target.files[i].size;
        var modifiedDate = event.target.files[i].lastModifiedDate; 
        this.files.push(event.target.files[i].name);
        ELEMENT_DATA.push(event.target.files[i]);

      }
      
      this.disabled=true
  
      if(this.isShown===true){
        this.isShown=true
      }
      else{
        this.isShown= !this.isShown
      }
      this.dataSource = [...ELEMENT_DATA];
    }

    filterStatusOptions($event: any){
      console.log($event)
      this.isShown=false
      this.files=[]
      this.dataSource=[]
      ELEMENT_DATA=[]
      this.disabled=false    
      this.statusId=$event.value
      
  
    }

  //file upload function
  submitForm(){
    this.start();
    this.uploadService.upload(this.dataSource).subscribe(
      (event) => 
      {
        let url = window.URL.createObjectURL(event);
          let a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          var today = new Date(); 
          var dd = String(today.getDate()).padStart(2, '0');
          var MM = String(today.getMonth() + 1).padStart(2, '0');
          var yyyy = today.getFullYear();
          var hh=String(today.getHours()).padStart(2, '0');
          var mm=String(today.getMinutes()).padStart(2, '0');
          var ss=String(today.getSeconds()).padStart(2, '0');
          var datetime= dd+MM+yyyy+hh+mm+ss;
        a.download = 'compressed_' + datetime+'.jpg';
        // if(event.status=200){
        //   this.success=true
        //   this.wait(3000).then( () => this.success = false );

        // }
        this.snackBarSuccess("Compressed Successfully")
        this.isShown=false
        this.files=[]
        this.dataSource=[]
        ELEMENT_DATA=[]
        this.disabled=false
          //a.download = 'compressed.jpg';
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        this.stop();

      },(err)=>{
        
        if(err.status==401){
          this.authservice.authenticateUser().subscribe(res => {
            sessionStorage.setItem('accessToken', res.token)
            })
            // this.isError401=true
            // this.wait(3000).then( () => this.isError401 = false );
        }
     
      //   if(err.status==0){
                    
      //     this.isError0=true
      //     this.wait(5000).then( () => this.isError0 = false );

      //   }
      //  if(err.status==400){
      //     this.isError4=true
      //     this.wait(2000).then( () => this.isError4 = false );

      //   }
      //   if(err.status==500){
      //     this.error500=true
      //     this.wait(2000).then( () => this.error500 = false );
      //   }
      this.snackBarFailure(err)
        this.stop(); 
      },

    )
   
  }
  ngOnInit(): void {
    this.pageLoader()
    
    this.dataSource=[]
    ELEMENT_DATA=[]
  }
  ngOnDestroy(): void {
  }


}









import { Component, OnDestroy, OnInit ,ViewChild} from '@angular/core';
import  {  HttpClient  }  from  '@angular/common/http';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatTable} from '@angular/material/table';
import  {  FormGroup,  FormControl,  Validators}  from  '@angular/forms';
import{MergeService} from '../../../services/Merge/merge.service'
import { AuthService } from '../../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as $ from 'jquery';
interface Merge{
  lastModified: any,
  lastModifiedDate: any,
  name:any,
  size: any,
  type: any,
  srNo:any,
  webkitRelativePath: any
  isDuplicate:any
  isSelected:any
}
let ELEMENT_DATA:Merge[] = [
]
@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})


export class MergeComponent implements OnInit,OnDestroy {
@ViewChild('table') table: MatTable<Merge>;
  
  displayedColumns: string[] = ['row','sr.no','name','actions'];
  dataSource = ELEMENT_DATA;
  loading: boolean = false; 
  files:string  []  =  [];
  myFiles: any;
  isLoading=false;
  success:boolean=false;
  isError0:boolean=false;
  isError4:boolean=false;
  isErrorNotPdf:boolean=false;
  error500:boolean=false;
  isError401:boolean=false;
  isShown: boolean = false ;// hidden by default
  totalCount:number;
  bestPractices: any = [];
  bestPracticesTemp: any = [];
  selectedFile:any
  sort:boolean=true

  uploadForm =  new  FormGroup({
     file:  new  FormControl('',  [Validators.required])
  });
 
  constructor(private http: HttpClient,private uploadService: MergeService,private authservice:AuthService,private _snackBar: MatSnackBar)  { 
   
   }
 /**
   * Show loader screen
   */
  pageLoader() {
    this.isLoading = true;
    this.wait(2000).then( () => this.isLoading = false );
  }
  start() {
    this.isLoading = true;
    // this.wait(2000).then( () => this.isLoading = false );
  }
  stop() {
    this.isLoading = false;
    // this.wait(2000).then( () => this.isLoading = false );
  }
  async wait(ms: number): Promise<void> {
    return new Promise<void>( resolve => setTimeout( resolve, ms) );
  }
  get f(){
      return  this.uploadForm.controls;
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

// Find Duplicate Elements In table
toFindDuplicates() {
  let resultToReturn = false;
  const arry=ELEMENT_DATA.map(obj => obj.name);
  arry.forEach((element,index)=>{
    if(arry.indexOf(element)!=index){
        ELEMENT_DATA[index].isDuplicate=true      
    }
  })
}
toSort(Sort:any){
  if(Sort=='asc'){
    this.sort=false
    this.toSortAscending()
  }
  else if(Sort=='dsc'){
    this.sort=true
    this.toSortDescending()
  }

}
toSortAscending(){
  if(this.selectedFile>=0){
  this.selectedFile=-1
  }  
  ELEMENT_DATA.sort((a, b) => { 
    let fa = a.name.toLowerCase(), 
     fb = b.name.toLowerCase(); 
    if (fa < fb){ 
      return -1; 
    } 
    if (fa > fb){ 
      return 1; 
    } 
   
    return 0; 
  });
  ELEMENT_DATA.forEach((element,index)=>{
    element.srNo=index+1
  })
  this.dataSource = [...ELEMENT_DATA];

  
}
toSortDescending(){
  if(this.selectedFile>=0){
    this.selectedFile=-1
  }
  ELEMENT_DATA.sort((a, b) => { 
    let fa = a.name.toLowerCase(), 
     fb = b.name.toLowerCase(); 
    if (fa > fb) { return -1; } 
    if (fa <fb) { return 1; } return 0; });
    ELEMENT_DATA.forEach((element,index)=>{
      element.srNo=index+1

    })
  this.dataSource = [...ELEMENT_DATA];
}

onClear(){
 
  this.dataSource=[]
  ELEMENT_DATA=[...this.dataSource]
  this.files=[]
  this.ngOnDestroy
}

// Select File
onFileChange(event:any)  {
  var allowedExtension = ".pdf";
  var hasInvalidFiles = false;
  for  (var i =  0; i <  event.target.files.length; i++)  {  
    var name = event.target.files[i].name;
     
    if (!name.endsWith(allowedExtension)) {
      hasInvalidFiles = true;
    }
    

  }
  if(hasInvalidFiles) {
    //this.selectedFile.value = ""; 
   // alert("asdas","Unsupported file selected.");
   this.snackBarFailure('Please select only PDF File')

    // this.isErrorNotPdf=true
    //     this.wait(3000).then( () => this.isErrorNotPdf = false );
    // return;
  }
 
    for  (var i =  0; i <  event.target.files.length; i++)  {  
      var name = event.target.files[i].name;
      var type = event.target.files[i].type;
      var size = event.target.files[i].size;
      var modifiedDate = event.target.files[i].lastModifiedDate; 
      event.target.files[i].srNo=i+1
      event.target.files[i].isDuplicate=false
      event.target.files[i].isSelected=false
      this.files.push(event.target.files[i]);
      ELEMENT_DATA.push(event.target.files[i]);

    }
     if(this.isShown===true){
      this.isShown=true
    }
    else{
      this.isShown= !this.isShown
    }
    this.dataSource = [...ELEMENT_DATA];
    this.totalCount = this.dataSource.length;
    this.toFindDuplicates()
    for(var i=0; i<this.dataSource.length;i++){
        this.dataSource[i].srNo=i+1
    }
}

// Moving the records of table in Upword direction
moveRecordUpwords(){
  if(this.selectedFile<=1){
    return
  }
  else{
    const temp=ELEMENT_DATA[this.selectedFile-1]
    ELEMENT_DATA[this.selectedFile-1]=ELEMENT_DATA[this.selectedFile-2]
    ELEMENT_DATA[this.selectedFile-2]=temp
    this.selectedFile = this.selectedFile - 1 
    ELEMENT_DATA[this.selectedFile-1].srNo = this.selectedFile
    ELEMENT_DATA[this.selectedFile].srNo = this.selectedFile + 1 
    this.dataSource=[...ELEMENT_DATA]
  }
}

// Moving the records of table in Downword direction
moveRecordDownwords(){
  if(ELEMENT_DATA.length==this.selectedFile){
    }
  else{
    const temp=ELEMENT_DATA[this.selectedFile-1]
    ELEMENT_DATA[this.selectedFile-1]=ELEMENT_DATA[this.selectedFile]
    ELEMENT_DATA[this.selectedFile]=temp
    this.selectedFile=this.selectedFile+1
    ELEMENT_DATA[this.selectedFile-1].srNo=this.selectedFile
    ELEMENT_DATA[this.selectedFile-2].srNo=this.selectedFile-1
    this.dataSource=[...ELEMENT_DATA]
  }
}
// Selection of file using radio button
onFileSelected($event:any){
// ($event.value)
}

//  Drag and drop functionality
dropTable(event: CdkDragDrop<Merge[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
      for(var i=0; i<this.dataSource.length;i++){
        this.dataSource[i].srNo=i+1

      }
      this.selectedFile=-1
      this.table.renderRows();
}



submitForm(){

  this.start();
  this.uploadService.upload(this.dataSource).subscribe(

    (event: any) => {
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
        a.download = 'merged_' +datetime+'.pdf';
      
        // if(event.status=200){
        //   this.success=true
        //   this.wait(3000).then( () => this.success = false );
        // }
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        //this.snackBarSuccess(err)
        console.log(event)
        this.snackBarSuccess('Merged Successfully')
        this.stop();
    },(err)=>{
   
      console.log(err)
    this.snackBarFailure(err)
      // if(err.status==0){
                    
      //   this.isError0=true
      //   this.wait(5000).then( () => this.isError0 = false );

      // }
      if(err.status==401){
        this.authservice.authenticateUser().subscribe(res => {
          sessionStorage.setItem('accessToken', res.token)
          })
          // this.isError401=true
          // this.wait(3000).then( () => this.isError401 = false );
      }
      // if(err.status==400){
      //   this.isError4=true
      //   this.wait(3000).then( () => this.isError4 = false );
      // }
      // if(err.status==500){

      //   this.error500=true
      //   this.wait(2000).then( () => this.error500 = false );

      // }
       this.stop();
    },


  )

}


//Delete row of table
deleteRow(id:any){
  this.dataSource = ELEMENT_DATA.filter((item: any) => item.srNo !== id)
  this.dataSource = [...this.dataSource];
  ELEMENT_DATA=[...this.dataSource]
  for(var i=0; i<this.dataSource.length;i++){
    this.dataSource[i].srNo=i+1
  } 
}


  ngOnInit(): void {
     this.pageLoader()
    this.dataSource=[]
    ELEMENT_DATA=[]
  }
  ngOnDestroy(): void {
  }

}



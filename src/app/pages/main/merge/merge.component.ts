import { Component, OnInit ,ViewChild} from '@angular/core';
import  {  HttpClient  }  from  '@angular/common/http';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatTable} from '@angular/material/table';
import  {  FormGroup,  FormControl,  Validators}  from  '@angular/forms';
import { FileUploadService } from '../../../services/upload-file.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';



interface Merge{
  lastModified: any,
lastModifiedDate: any,
name:any,
size: any,
type: any,
srNo:any,
webkitRelativePath: any
}
const ELEMENT_DATA: Merge[] = [
]
@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})


export class MergeComponent implements OnInit {
  @ViewChild('table') table: MatTable<Merge>;
  
  displayedColumns: string[] = ['sr.no','name','actions'];
  dataSource = ELEMENT_DATA;
  shortLink: string = "";
  loading: boolean = false; 
  files:string  []  =  [];
  myFiles: any;
  isLoading=false;
  isShown: boolean = false ;// hidden by default
totalCount:number;
bestPractices: any = [];
bestPracticesTemp: any = [];

  uploadForm =  new  FormGroup({
     file:  new  FormControl('',  [Validators.required])
  });
 
  constructor(private http: HttpClient,private uploadService: FileUploadService)  {  }
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

toFindDuplicates() {
  let resultToReturn = false;
  const arry=ELEMENT_DATA.map(obj => obj.name);
  resultToReturn = arry.some((element, index) => {
    return arry.indexOf(element) !== index
});
if (resultToReturn) {
    console.log('Duplicate elements exist');
    }
    else {
        console.log('Duplicates dont exist ');
        }
    }

  onFileChange(event:any)  {
    const duplicate= this.toFindDuplicates()
console.log("duplicate val",duplicate)
console.log(event.target.files)
this.bestPractices=event.target.files;
this.bestPracticesTemp=this.bestPractices;
    for  (var i =  0; i <  event.target.files.length; i++)  {  
      var name = event.target.files[i].name;
      var type = event.target.files[i].type;
      var size = event.target.files[i].size;
      var modifiedDate = event.target.files[i].lastModifiedDate; 
      event.target.files[i].srNo=i+1
      console.log(event.target.files[i])
      this.files.push(event.target.files[i]);
      ELEMENT_DATA.push(event.target.files[i]);

    }
    console.log(ELEMENT_DATA)
    console.log("before ",this.isShown)
    if(this.isShown===true){
      this.isShown=true
    }
    else{
      this.isShown= !this.isShown
    }
  
    console.log("after",this.isShown)
    this.dataSource = [...ELEMENT_DATA];
    console.log("element_data",ELEMENT_DATA)


        
  

    // let resultToReturn = false;
    // // call some function with callback function as argument
    // resultToReturn = ELEMENT_DATA.some((element, index) => {
    //     return ELEMENT_DATA.indexOf(element) !== index
    // });
    // if (resultToReturn) {
    //     console.log('Duplicate elements exist')
            
    //     }
    //     else {
    //         console.log('Duplicates dont exist')
    //         }

          
 for(var i=0; i<this.dataSource.length;i++){
  this.dataSource[i].srNo=i+1
}
  // this.dataSource.find()
  }

  dropTable(event: CdkDragDrop<Merge[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    for(var i=0; i<this.dataSource.length;i++){
      this.dataSource[i].srNo=i+1
  }
    this.table.renderRows();
   
  }

  submitForm(){
    const formData =  new  FormData();
    for  (var i =  0; i <  this.myFiles.length; i++)  {  
      formData.append("file[]",  this.myFiles[i]);
    } 
  }
//   onUpload() {
//     this.loading = !this.loading;
//      console.log("onupload ",this.files);
//     this.uploadService.upload(this.files).subscribe(
//         (event: any) => {
//             if (typeof (event) === 'object') {

//                 // Short link via api response
//                 this.shortLink = event.link;
//                 console.log("inside event trigger")

//                 this.loading = false; // Flag variable 
//             }
//         }
//     );
// }
 

  

deleteRow(id:any){
  this.dataSource = this.dataSource.filter((item: any) => item.srNo !== id)
  this.dataSource = [...this.dataSource];
  for(var i=0; i<this.dataSource.length;i++){
    this.dataSource[i].srNo=i+1
}
  console.log(this.dataSource);
}

  ngOnInit(): void {
    this.start()
  }

}

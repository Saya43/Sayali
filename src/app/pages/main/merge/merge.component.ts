import { Component, OnInit ,ViewChild} from '@angular/core';
import  {  HttpClient  }  from  '@angular/common/http';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatTable} from '@angular/material/table';
import  {  FormGroup,  FormControl,  Validators}  from  '@angular/forms';
import { FileUploadService } from '../../../services/upload-file.service';

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
const ELEMENT_DATA: Merge[] = [
]
@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})


export class MergeComponent implements OnInit {
  @ViewChild('table') table: MatTable<Merge>;
  
  displayedColumns: string[] = ['row','sr.no','name','actions'];
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
selectedFile:any

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
  arry.forEach((element,index)=>{
    if(arry.indexOf(element)!=index){
        ELEMENT_DATA[index].isDuplicate=true      
    }
  })
  }
  
  // moveElement(initialIndex: number,finalIndex:number) {
  //   const array=ELEMENT_DATA.map(obj => obj.name);
  //   array.splice(finalIndex,0,array.splice(initialIndex,1)[0])
  //   console.log("array index",array);
  //   return array;
  // }
  

  onFileChange(event:any)  {
this.bestPractices=event.target.files;
this.bestPracticesTemp=this.bestPractices;
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
    // console.log(ELEMENT_DATA)
    // console.log("before ",this.isShown)
    if(this.isShown===true){
      this.isShown=true
    }
    else{
      this.isShown= !this.isShown
    }
   
  
    this.dataSource = [...ELEMENT_DATA];
    this.totalCount = this.dataSource.length;
    // console.log("element_data",ELEMENT_DATA)


        this.toFindDuplicates()
        // this.moveElement(initialIndex,finalIndex)
        

          
          for(var i=0; i<this.dataSource.length;i++){
            this.dataSource[i].srNo=i+1
          }
  // this.dataSource.find()
}
moveRecordUpwords(){
  if(this.selectedFile<=1){
    return
  }else{
  const temp=ELEMENT_DATA[this.selectedFile-1]
  ELEMENT_DATA[this.selectedFile-1]=ELEMENT_DATA[this.selectedFile-2]
  ELEMENT_DATA[this.selectedFile-2]=temp
    // ELEMENT_DATA[this.selectedFile-1].srNo=this.selectedFile
    //  ELEMENT_DATA[this.selectedFile-2].srNo=this.selectedFile-1
  // ELEMENT_DATA[this.selectedFile]=temp
  //this.selectedFile=this.selectedFile-1
  //console.log(this.selectedFile)

  this.selectedFile = this.selectedFile - 1 
  ELEMENT_DATA[this.selectedFile-1].srNo = this.selectedFile
  ELEMENT_DATA[this.selectedFile].srNo = this.selectedFile + 1 

 this.dataSource=[...ELEMENT_DATA]

  }
}
// moveRecordUpwords(){
//   if(this.selectedFile==1){
//     // return
//   }else{
//     console.log(ELEMENT_DATA[this.selectedFile])
//     const temp=ELEMENT_DATA[this.selectedFile]
//   ELEMENT_DATA[this.selectedFile]=ELEMENT_DATA[this.selectedFile-1]
//   ELEMENT_DATA[this.selectedFile-1]=temp
//   // ELEMENT_DATA[this.selectedFile]=temp
//   this.selectedFile=this.selectedFile-1
//   console.log(this.selectedFile)
//   ELEMENT_DATA[this.selectedFile].srNo=this.selectedFile
//   ELEMENT_DATA[this.selectedFile-1].srNo=this.selectedFile
//  console.log(this.selectedFile)
//  this.dataSource=[...ELEMENT_DATA]
//   }
// }
moveRecordDownwords(){
  if(ELEMENT_DATA.length==this.selectedFile){
    
  }else{
  // console.log(ELEMENT_DATA)
  console.log(ELEMENT_DATA[this.selectedFile])
  const temp=ELEMENT_DATA[this.selectedFile-1]
  console.log(temp)
  ELEMENT_DATA[this.selectedFile-1]=ELEMENT_DATA[this.selectedFile]
  ELEMENT_DATA[this.selectedFile]=temp
  console.log(this.selectedFile)
  this.selectedFile=this.selectedFile+1
  ELEMENT_DATA[this.selectedFile-1].srNo=this.selectedFile
  ELEMENT_DATA[this.selectedFile-2].srNo=this.selectedFile-1
 
 this.dataSource=[...ELEMENT_DATA]
  }
}
  onFileSelected($event:any){
    // console.log($event.value)
  }

  dropTable(event: CdkDragDrop<Merge[]>) {
    console.log(this.dataSource)
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

function intialIndex(intialIndex: any, finalIndex: any) {
  throw new Error('Function not implemented.');
}


function finalIndex(intialIndex: any, finalIndex: any) {
  throw new Error('Function not implemented.');
}

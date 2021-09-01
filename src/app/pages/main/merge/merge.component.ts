import { Component, OnInit ,ViewChild} from '@angular/core';
import  {  HttpClient  }  from  '@angular/common/http';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatTable} from '@angular/material/table';
import  {  FormGroup,  FormControl,  Validators}  from  '@angular/forms';

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
 
  constructor(private http: HttpClient)  {  }
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
  

  onFileChange(event:any)  {
console.log(event.target.files)
// this.dataSource=event.target.files;
this.bestPractices=event.target.files;
this.bestPracticesTemp=this.bestPractices;
    for  (var i =  0; i <  event.target.files.length; i++)  {  
      var name = event.target.files[i].name;
      var type = event.target.files[i].type;
      var size = event.target.files[i].size;
      var modifiedDate = event.target.files[i].lastModifiedDate;
      // console.log ('Name: ' + name + "\n" + 
      //               'Type: ' + type + "\n" +
      //               'Last-Modified-Date: ' + modifiedDate + "\n" +
      //               'Size: ' + Math.round(size / 1024) + " KB");  
      event.target.files[i].srNo=i+1
      console.log(event.target.files[i])
      this.files.push(event.target.files[i].name);
      ELEMENT_DATA.push(event.target.files[i]);

    }
    console.log(ELEMENT_DATA)
    this.isShown = ! this.isShown;
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
  // deleteRow(i:any){
  //   this.dataSource= this.dataSource.splice(i,1);

  //   console.log(this.dataSource)
  //   console.log(i)


  // }
// deleteRow(id:any){
//     console.log("datasource ",ELEMENT_DATA)
//     for(let i = 0; i < ELEMENT_DATA.length; ++i){
//         if (ELEMENT_DATA[i].srNo ==id) {
//           ELEMENT_DATA.splice(i,1);
//           this.dataSource=ELEMENT_DATA
//             console.log("delete data ",this.dataSource)

//          }
//         // console.log("data sourse ",this.dataSource[i].srNo)
//     }
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

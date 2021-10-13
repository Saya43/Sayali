import { Component, OnDestroy, OnInit ,ViewChild} from '@angular/core';
import  {  HttpClient  }  from  '@angular/common/http';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatTable} from '@angular/material/table';
import  {  FormGroup,  FormControl,  Validators}  from  '@angular/forms';
import{MergeService} from '../../../services/Merge/merge.service'

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
  isShown: boolean = false ;// hidden by default
  totalCount:number;
  bestPractices: any = [];
  bestPracticesTemp: any = [];
  selectedFile:any
  sort:boolean=true
  uploadForm =  new  FormGroup({
     file:  new  FormControl('',  [Validators.required])
  });
 
  constructor(private http: HttpClient,private uploadService: MergeService)  {  }
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
  console.log(this.selectedFile)
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
    console.log(this.selectedFile)
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
  ELEMENT_DATA=[]
  this.ngOnDestroy
}

// Select File
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
// console.log($event.value)
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

// submitForm(){
//   this.uploadService.upload(this.dataSource).subscribe(
//     (event: any) => {
//       console.log(event)
//     }
//   )
// }

submitForm(){
  this.uploadService.upload(this.dataSource).subscribe(
    (event: any) => {
      let url = window.URL.createObjectURL(event);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = 'abc.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      console.log(event)
    }
  )
}

//Delete row of table
deleteRow(id:any){
  this.dataSource = this.dataSource.filter((item: any) => item.srNo !== id)
  this.dataSource = [...this.dataSource];
  for(var i=0; i<this.dataSource.length;i++){
    this.dataSource[i].srNo=i+1
  } 

}


  ngOnInit(): void {
    this.start()
    this.dataSource=[]
    ELEMENT_DATA=[]
  }
  ngOnDestroy(): void {
  }

}



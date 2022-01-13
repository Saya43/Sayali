import { Component, NgZone, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SplitService } from '../../../services/Split/split.service'
import { ValidationMessages } from '../../../shared/models/validation-messages';
import { AuthService } from '../../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Compress {
  lastModified: any,
  lastModifiedDate: any,
  name: any,
  size: any,
  type: any,
  srNo: any,
  webkitRelativePath: any

}
let ELEMENT_DATA: Compress[] = [
]
@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.css']
})
export class SplitComponent implements OnInit, OnDestroy {
  files: string[] = [];
  uploadForm = new FormGroup({
    file: new FormControl('', [Validators.required])
  });
  ranges: any;
  myFiles: any;
  isLoading = false;
  isShown: boolean = false; // hidden by default
  dataSource = ELEMENT_DATA;
  bestPractices: any = [];
  bestPracticesTemp: any = [];
  validationFlag: boolean = false;
  disabled: boolean = false;
  invalidFormatValidation: any = ValidationMessages.invalidRange;
  //changes made here
  constructor(private httpClient: HttpClient, private uploadService: SplitService, private authservice: AuthService,private _snackBar: MatSnackBar,private ngZone: NgZone) { }
  /**
  * Show loader screen
  */
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
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }

  get f() {
    return this.uploadForm.controls;
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


  onFileChange(event: any) {

    var allowedExtension = ".pdf";
    var hasInvalidFiles = false;
    for (var i = 0; i < event.target.files.length; i++) {
      var name = event.target.files[i].name;
      if (!name.endsWith(allowedExtension)) {
        hasInvalidFiles = true;
      }
    }
    if (hasInvalidFiles) {
      this.snackBarFailure("Please select only PDF files")
    }


    this.bestPractices = event.target.files;
    this.bestPracticesTemp = this.bestPractices;


    for (var i = 0; i < event.target.files.length; i++) {
      var name = event.target.files[i].name;
      var type = event.target.files[i].type;
      var size = event.target.files[i].size;
      var modifiedDate = event.target.files[i].lastModifiedDate;
      this.files.push(event.target.files[i].name);
      ELEMENT_DATA.push(event.target.files[i]);
    }
    this.disabled = true

    if (this.isShown === true) {
      this.isShown = true
    }
    else {
      this.isShown = !this.isShown
    }

    this.dataSource = [...ELEMENT_DATA];
  }
  submit() {
    this.start();
    this.validationFlag = false
    var regex = /^[0-9\-,]+$/
    var result = regex.test(this.ranges)
    if (result == false) {
      //error message to be shown
      this.validationFlag = true
    }
    else if (result == true) {
      let temp = this.ranges.split(",")
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].includes("-")) {
          let temp1 = temp[i].split("-")
          if (temp1[0] < temp1[1]) {
            //this.validationFlag=false

          }
          else {
            //error messagre shown
            this.validationFlag = true
          }
        }
        else if (temp[i] == '') {
          this.validationFlag = true
        }
      }
      if (this.validationFlag == false) {
        this.uploadService.upload(this.dataSource, this.ranges).subscribe(
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
            var hh = String(today.getHours()).padStart(2, '0');
            var mm = String(today.getMinutes()).padStart(2, '0');
            var ss = String(today.getSeconds()).padStart(2, '0');
            var datetime = dd + MM + yyyy + hh + mm + ss;
            a.download = 'splited_' + datetime + '.zip';
            // if (event.status = 200) {
            //   this.success = true
            //   this.wait(3000).then(() => this.success = false);

            // }
            this.snackBarSuccess("Splitted Successfully")
            this.isShown = false
            this.files = []
            this.ranges = []
            this.dataSource = []
            ELEMENT_DATA = []
            this.disabled = false
            //a.download = 'splited.zip';
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
            this.stop();
          },
          (err) => {
            var errorMessage1:any
            // console.log(err)
            var reader = new FileReader();
            reader.onloadend = (e)  => {
              this.ngZone.run(() => {
                errorMessage1 = JSON.parse((<any>e.target).result)
                this._snackBar.open(errorMessage1.message,'', {
                  duration: 3000,
                  });
                  $(".mat-snack-bar-container").css({
                    'background-color': 'red',
                    'color':'white' 
                
                  });
                  $(".mat-simple-snackbar span").css({
                    'font-weight': '500'
                  });
              })
      
            }
            reader.readAsText(err.error);
            if (err.status == 401) {
              this.authservice.authenticateUser().subscribe(res => {
                sessionStorage.setItem('accessToken', res.token)
              })
            }
            this.stop();
          }
        )
      }
    }
  }


  ngOnInit(): void {
    this.pageLoader()
    this.dataSource = []
    ELEMENT_DATA = []
  }
  ngOnDestroy(): void {
  }
}

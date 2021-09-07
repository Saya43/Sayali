import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavService } from './sidenav/sidenav.service';
import { FileUploadService } from './upload-file.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[SidenavService,FileUploadService]
})
export class ServicesModule { }

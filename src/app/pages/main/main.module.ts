import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../main/main.component';
import { SplitComponent } from '../main/split/split.component';
import { CompressComponent } from '../main/compress/compress.component';
import { MergeComponent } from '../main/merge/merge.component';
import { MainRoutes} from './main.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoaderComponent, SidebarComponent } from 'src/app/shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    MainComponent,
    MergeComponent,
    SplitComponent,
    CompressComponent,   
     SidebarComponent,
     LoaderComponent
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    DragDropModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(MainRoutes),

  ]
})
export class MainModule { }

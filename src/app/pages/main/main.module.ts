import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../main/main.component';
import { SplitComponent } from '../main/split/split.component';
import { CompressComponent } from '../main/compress/compress.component';
import { MergeComponent } from '../main/merge/merge.component';
import { MainRoutes} from './main.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SidebarComponent } from 'src/app/shared';

@NgModule({
  declarations: [
    MainComponent,
    MergeComponent,
    SplitComponent,
    CompressComponent,   
     SidebarComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(MainRoutes),

  ]
})
export class MainModule { }

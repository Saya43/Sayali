import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import{MatSidenavModule} from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [
    
  
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatSidenavModule,
    MatTooltipModule,

  ],
  exports:[
    MatListModule,
    MatSidenavModule,
    MatTooltipModule,

  ]
  
})
export class SharedModule {

 }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SidebarComponent } from 'src/app/shared';



@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MainModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import{MatSidenavModule} from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  
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
    HeaderComponent,
    FooterComponent

  ]
  
})
export class SharedModule {

 }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import  {  HttpClientModule  }  from  '@angular/common/http';
import  {  FormsModule,  ReactiveFormsModule  }  from  '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal'
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    HomeComponent,
    
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalModule.forRoot(),

  ],
  providers: [BsModalService]
}
)
export class HomeModule { }

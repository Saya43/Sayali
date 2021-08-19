import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import  {  HttpClientModule  }  from  '@angular/common/http';
import  {  FormsModule,  ReactiveFormsModule  }  from  '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal'
import { SharedModule } from 'src/app/shared/shared.module';
//import { SidebarComponent } from 'src/app/shared/components/side-nav/side-nav.component';
@NgModule({
  declarations: [
    HomeComponent,
   // SidebarComponent,
    
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    // RouterModule.forChild(HomeRoutes),
    ModalModule.forRoot(),

  ],
  providers: [BsModalService]
}
)
export class HomeModule { }

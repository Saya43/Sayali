import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MergeComponent } from './merge/merge.component';
import { HomeComponent } from './home.component';
import { SplitComponent } from './split/split.component';
import { CompressComponent } from './compress/compress.component';
import { HomeRoutes } from './home.routing';
import { RouterModule } from '@angular/router';
import { FooterComponent, HeaderComponent } from 'src/app/shared';
import  {  HttpClientModule  }  from  '@angular/common/http';
import  {  FormsModule,  ReactiveFormsModule  }  from  '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal'
import { SharedModule } from 'src/app/shared/shared.module';
//import { SidebarComponent } from 'src/app/shared/components/side-nav/side-nav.component';
@NgModule({
  declarations: [
    MergeComponent,
    HomeComponent,
    SplitComponent,
    CompressComponent,
    FooterComponent,
    HeaderComponent,
   // SidebarComponent,
    
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(HomeRoutes),
    ModalModule.forRoot(),

  ],
  providers: [BsModalService]
}
)
export class HomeModule { }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   breadcrumbItem: any = '';
   breadcrumbItemFlag: boolean = false;
   isShown: boolean = false ; // hidden by default

   constructor(private _sidenavService: SidenavService,private router: Router) { }

   merge(){
      this.router.navigate(["main/merge"])
   }
   split(){
      this.router.navigate(["main/split"])
   }
   compress(){
      this.router.navigate(["main/compress"])
   }
   ngOnInit(): void {
      console.log(window.location.pathname.split('2')[0].split('/')[1])
      if(window.location.pathname.split('2')[0].split('/')[1]=='home'){
            this.isShown=true;
      }

      // On click of sidebar menu items, breadcrumb item populated
      this._sidenavService.selectedMenuItem$.subscribe(
         element => {
         // console.log(element);
         this.breadcrumbItem = element;
         console.log(this.breadcrumbItem);
      });
   }

}

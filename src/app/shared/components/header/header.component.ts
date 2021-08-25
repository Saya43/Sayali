import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  breadcrumbItem: any = '';
  breadcrumbItemFlag: boolean = false;

  constructor(private _sidenavService: SidenavService,private router: Router) { }
  isShown: boolean = false ; // hidden by default
  gotoHome(){
    this.router.navigate(["home"])
  }
  ngOnInit(): void {

    // console.log(window.location.pathname.split('2')[0].split('/')[1])
    if(window.location.pathname.split('2')[0].split('/')[1]=='home'){
      this.isShown=true;
      this.breadcrumbItemFlag=false;
    }

     // On click of sidebar menu items, breadcrumb item populated
     this._sidenavService.selectedMenuItem$.subscribe(
      element => {
         console.log(element);
        this.breadcrumbItem = element;
        // console.log(this.breadcrumbItem);
    });
    this.breadcrumbItem =  localStorage.getItem("breadcrumb")

    // if(this.breadcrumbItem==='' ){
    //   this.breadcrumbItem=window.location.pathname.split('2')[0].split('/')[2]
    //   // console.log(this.breadcrumbItem);

    // }


       // On click of sidebar menu items, breadcrumb flag value
       this._sidenavService.selectedMenuItemFlag$.subscribe(
        element => {
          this.breadcrumbItemFlag = element;
      });
    

  }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
 
@Injectable()
export class SidenavService {
  // With this subject you can save the sidenav state and consumed later into other pages.
  public sideNavState$: Subject<boolean> = new Subject();

  // Variable: Selected menu item from Sidebar
  selectedMenuItem = new Subject<string>();
  selectedMenuItem$ = this.selectedMenuItem.asObservable();

  // Variable: Selected menu item flag
  selectedMenuItemFlag = new Subject<boolean>();
  selectedMenuItemFlag$ = this.selectedMenuItemFlag.asObservable();

  constructor() { }
  
  /**
   * Set Breadcrumb value
   */
  setBreadcrumb(name: string, flag: boolean){
    this.selectedMenuItem.next(name);
    this.selectedMenuItemFlag.next(flag);
  }
}

import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from '../../../shared/models/animations';
import { SidenavService } from '../../../services/sidenav/sidenav.service';
import { Router } from '@angular/router';
//import * as $ from 'jquery';
declare let $: any;
interface Page {
  id: number;
  link: string;
  name: string;
  icon: string;
}

interface Icons {
  id: number;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [onSideNavChange, animateText]
})
export class SidebarComponent implements OnInit {
  public sideNavState: boolean = false;
  public linkText: boolean = false;

  currentUrlName: any;

  public pages: Page[] = [
    {id:1, name: 'Merge', link:'/main/merge', icon: 'assets/Images/menu-icon/merge-icon-before-click.svg'},
    {id:2, name: 'Split', link:'/main/split', icon: 'assets/Images/menu-icon/split-icon-before-click.svg'},
    {id:3, name: 'Compress', link:'/main/compress', icon: 'assets/Images/menu-icon/compress-icon-before-click.svg'},
  ]

  public icons : Icons[] = [
    {id:1, icon: 'assets/Images/menu-icon/merge-icon-after-click.svg'},
    {id:2, icon: 'assets/Images/menu-icon/split-icon-after-click.svg'},
    {id:3, icon: 'assets/Images/menu-icon/compress-icon-after-click.svg'},
  ]

  // Menu item variables
  selectedMenuName = '';
  selectedMenuId: number = -1;
  previousMenuNameId: number = -1;
  previousMenuImageId: number = -1;

  constructor(private _sidenavService: SidenavService, private router: Router) { }

  ngOnInit(): void {
    $('body').addClass('df');
    this.currentUrlName = window.location.pathname.split('/');
    this.currentUrlName = '/' + this.currentUrlName[1] + '/' + this.currentUrlName[2];

    // Menu item icon background color change code
    setTimeout(() => {
      if(this.sideNavState === true){
        return;
      }
      else{
        this.pages.forEach(ele => {
          if(ele.link === this.currentUrlName){
            this._sidenavService.setBreadcrumb(ele.name, true);

            $('.mat-drawer-content').removeClass('sideBarOpen');
            $('.mat-drawer-content').addClass('sideBarClose');

            const selectedItem = ele.id;
            this.selectedMenuId = selectedItem;
            const itemId = ele.id + 20; // id for menu item
            this.previousMenuNameId = itemId;
            const itemImageId = ele.id + 30; // id for menu item icon
            this.previousMenuImageId = itemImageId;

            this.icons.forEach(element => {
              if(element.id === selectedItem){
                $("#"+itemImageId).attr("src",element.icon);
              }
            })
            $('#'+itemImageId).addClass('selected-icon');
          }
        })
      }
    },500);
  }

  /**
   * On Sidenav toggle
   * 1. Show menu items
   * 2. Highlight menu items
   */
  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;

    // Menu item icon background color change code
    if(this.sideNavState === true){
      $('.mat-drawer-content').removeClass('sideBarClose');
      $('.mat-drawer-content').addClass('sideBarOpen');

      if(
        this.selectedMenuId === -1 && this.previousMenuNameId === -1 && this.previousMenuImageId === -1
      ){
        $('#'+this.selectedMenuId).addClass('selected');
        $('#'+this.previousMenuNameId).addClass('menu-item-selected');
      }
      else{
        $('#'+this.selectedMenuId).addClass('selected');
        $('#'+this.previousMenuNameId).addClass('menu-item-selected');
      }
    }
    else{
      $('.mat-drawer-content').removeClass('sideBarOpen');
      $('.mat-drawer-content').addClass('sideBarClose');

      if(
        this.selectedMenuId === -1 && this.previousMenuNameId === -1 && this.previousMenuImageId === -1
      ){
        $('#'+this.selectedMenuId).removeClass('selected');
        $('#'+this.previousMenuNameId).removeClass('menu-item-selected');
        $('#'+this.selectedMenuId).removeClass('menu-item-background-hover');
        $('#'+this.previousMenuNameId).removeClass('menu-item-hover');
        $('#'+this.previousMenuImageId).addClass('selected-icon');
      }
      else{
        $('#'+this.selectedMenuId).removeClass('selected');
        $('#'+this.previousMenuNameId).removeClass('menu-item-selected');
        $('#'+this.selectedMenuId).removeClass('menu-item-background-hover');
        $('#'+this.previousMenuNameId).removeClass('menu-item-hover');
        $('#'+this.previousMenuImageId).addClass('selected-icon');
      }
    }

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)

    this._sidenavService.sideNavState$.next(this.sideNavState)
  }

  /**
   * Process menu item background changes
   * id: menu item id
   */
  processMenuItem(id: any){
    const itemId = id + 20; // id for menu item
    const itemImageId = id + 30; // id for menu item icon
    this.selectedMenuId = id; // selected menu item id
    this.previousMenuNameId = itemId; // selected menu name
    this.previousMenuImageId = itemImageId; // selected menu icon

    this.icons.forEach(ele => {
      if(ele.id === id){
        $("#"+itemImageId).attr("src",ele.icon);
      }
    })
    if(this.sideNavState === true){
      $('#'+id).addClass('selected');
      $('#'+itemId).addClass('menu-item-selected');
    }
    else{
      $('#'+itemImageId).addClass('selected-icon');
    }
  }

  /**
   * Remove processed menu item background changes
   */
  removeCssForPreviousSelected(){
    $('#'+this.selectedMenuId).removeClass('selected');
    $('#'+this.previousMenuNameId).removeClass('menu-item-selected');
    $('#'+this.selectedMenuId).removeClass('menu-item-background-hover');
    $('#'+this.previousMenuNameId).removeClass('menu-item-hover');
    $('#'+this.previousMenuImageId).removeClass('selected-icon');

    this.pages.forEach(ele => {
      if(ele.id === this.selectedMenuId){
        $("#"+this.previousMenuImageId).attr("src",ele.icon);
      }
    })
  }

  /**
   * Show menu item content
   * id: menu item id
   */
  showMenuItemContent(id: any, name: any): void{
    this._sidenavService.setBreadcrumb(name, true);

    if(this.sideNavState === true){
      if(
        this.selectedMenuId === -1 && this.previousMenuNameId === -1 && this.previousMenuImageId === -1
      ){
        this.processMenuItem(id);
      }
      else{
        this.removeCssForPreviousSelected();
        this.processMenuItem(id);
      }
    }
    else{
      if(
        this.selectedMenuId === -1 && this.previousMenuNameId === -1 && this.previousMenuImageId === -1
      ){
        this.processMenuItem(id);
      }
      else{
        this.removeCssForPreviousSelected();
        this.processMenuItem(id);
      }
    }

    this.pages.forEach(ele => {
      if(ele.id === id){
        this.router.navigate([ele.link]);
      }
    })
  }

  /**
   * Process menu item background changes on hover
   * id: menu item id
   */
  menuItemHoverEnter(id: any): void{
    const itemId = id + 20; // id for menu item name

    if(this.sideNavState === true && id !== this.selectedMenuId){
      $('#'+id).addClass('menu-item-background-hover');
      $('#'+itemId).addClass('menu-item-hover');
    }
  }

  /**
   * Remove processed menu item background changes on mouse hover left
   * id: menu item id
   */
  menuItemHoverLeft(id: any): void{
    const itemId = id + 20; // id for menu item name

    if(this.sideNavState === true && id !== this.selectedMenuId){
      $('#'+id).removeClass('menu-item-background-hover');
      $('#'+itemId).removeClass('menu-item-hover');
    }
  }
}

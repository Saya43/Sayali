import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { onMainContentChange } from 'src/app/shared';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [ onMainContentChange ]
})
export class MainComponent implements OnInit, OnDestroy {
  public onSideNavChange: boolean; // Sidenav change flag
  sideNavChange: Subscription;
  // token:any
  constructor(private _sidenavService: SidenavService,private authservice:AuthService) {
    this.sideNavChange = this._sidenavService.sideNavState$.subscribe( res => {
      this.onSideNavChange = res;
    })
    this.authservice.authenticateUser().subscribe(res => {
      
      console.log(res.token)
      sessionStorage.setItem('accessToken',res.token)
    })


  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void{
    this.sideNavChange.unsubscribe();
  }
}

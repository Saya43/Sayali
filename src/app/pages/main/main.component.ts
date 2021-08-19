import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { onMainContentChange } from 'src/app/shared';
import { SidenavService } from '../../services/sidenav/sidenav.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [ onMainContentChange ]
})
export class MainComponent implements OnInit, OnDestroy {
  public onSideNavChange: boolean; // Sidenav change flag
  sideNavChange: Subscription;

  constructor(private _sidenavService: SidenavService) {
    this.sideNavChange = this._sidenavService.sideNavState$.subscribe( res => {
      this.onSideNavChange = res;
    })
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void{
    this.sideNavChange.unsubscribe();
  }
}

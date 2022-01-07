import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { onMainContentChange } from 'src/app/shared';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { AuthService } from '../../services/auth/auth.service';
import jwt_decode from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [ onMainContentChange ]
})
export class MainComponent implements OnInit, OnDestroy {
  public onSideNavChange: boolean; // Sidenav change flag
  success:boolean=false;
  isError4:boolean=false;
  error500:boolean=false;
  sideNavChange: Subscription;
  // token:any
  isLoading=false;

  start() {
    this.isLoading = true;
  }
  stop() {
    this.isLoading = false;
  }
  async wait(ms: number): Promise<void> {
    return new Promise<void>( resolve => setTimeout( resolve, ms) );
  }
     
snackBarSuccess(message:any){

  this._snackBar.open(message, ' ', {
  duration: 3000
  });
   $(".mat-snack-bar-container").css({
    'background-color': '#9FC356',
    'color':'white' 

  });
  $(".mat-simple-snackbar span").css({
    'font-weight': '500',
  });
}


snackBarFailure(err:any){
  this._snackBar.open(err,'', {
  duration: 3000,
  });
  $(".mat-snack-bar-container").css({
    'background-color': 'red',
    'color':'white' 

  });
  $(".mat-simple-snackbar span").css({
    'font-weight': '500'
  });
}
  constructor(private _sidenavService: SidenavService,private authservice:AuthService,private _snackBar: MatSnackBar) {
    this.sideNavChange = this._sidenavService.sideNavState$.subscribe( res => {
      this.onSideNavChange = res;
    })
 
   
    if(sessionStorage.getItem('accessToken')){
  
    }
    else{   
      this.start();
    this.authservice.authenticateUser().subscribe(res => {
    sessionStorage.setItem('accessToken', res.token)
    // if(res.status=200){
    //   this.success=true
    //   this.wait(2000).then( () => this.success = false );

    // }
    this.snackBarSuccess("successfully authenticated")
    this.stop();
    },
    
    (err)=>{
        if(err.status==401){
          this.authservice.authenticateUser().subscribe(res => {
            sessionStorage.setItem('accessToken', res.token)
            })
         
        }
        this.snackBarFailure(err)
      //  if(err.status==400){
      //     this.isError4=true
      //     this.wait(2000).then( () => this.isError4 = false );

      //   }
    
      //   if(err.status==500){
      //     this.error500=true
      //     this.wait(2000).then( () => this.error500 = false );

      //   }
        this.stop();

      },
     
    )
  }


  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void{
    this.sideNavChange.unsubscribe();
  }
}
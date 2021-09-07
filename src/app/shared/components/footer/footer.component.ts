import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  isShown: boolean = false ; // hidden by default

  ngOnInit(): void {
    if(window.location.pathname.split('2')[0].split('/')[1]=='home'){
      this.isShown=true;
    }
  }

}

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalState } from '../../../global.state';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AuthenticationService } from '../../../services/index';

@Component({
  selector: 'ba-page-top',    
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss'],
  providers: [AuthenticationService]   
})
export class BaPageTop implements OnInit{

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;
  css: boolean = false;  
  selected: string;
  output: string;    

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;  

  constructor(private _state: GlobalState, private authenticationService : AuthenticationService, private router : Router) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
      });    
  }

  ngOnInit() {      
  
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }
  
  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public logOut() {
      this.authenticationService.logout();
      //this.router.navigate(['../../login']);
  }    
}


import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { GlobalState } from '../../../global.state';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'ba-page-top',    
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']   
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

  constructor(private _state: GlobalState) {
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
}


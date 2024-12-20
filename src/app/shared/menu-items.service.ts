import { Injectable } from '@angular/core';


export interface Menu {

  state: string;
  name: string;
  type: string;
  icon: string;
  role: string;


}

const MENUITEM = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard', role: '' }
]
@Injectable()
export class MenuItems {
  getMenuItems(): Menu[] {
    return MENUITEM;
  }

}
import { Component } from '@angular/core';

import { MENU_ITEMSـADMIN , MENU_ITEMSـSUPER_ADMIN , MENU_ITEMSـUSER } from './pages-menu';
import { NbRoleProvider } from '@nebular/security';
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  constructor(public roleProvider: NbRoleProvider) {
    this.roleProvider.getRole().subscribe((role : string) =>{
      switch (role.toLowerCase()) {
        case "admin":
          this.menu=MENU_ITEMSـADMIN
          break;
        case "user":
          this.menu=MENU_ITEMSـUSER
          break;
        case "superadmin":
          this.menu=MENU_ITEMSـSUPER_ADMIN
          break;
        default:
          break;
      }
    })
   }

  menu = [];
}

import { CommonModule } from '@angular/common';
import { ModuleWithProviders , NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MyPasswordAuthStrategy } from './strategy/mypass';
import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule  } from '@nebular/auth';
import { NbSecurityModule  , NbRoleProvider } from '@nebular/security';
import { RoleProvider } from './role/roleprovider';
import { AuthGuard } from './guard/auth-guard.service';
import { 
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule
} from '@nebular/theme';

import { NgxLoginComponent } from './login/login.component';



export const AUTH_PROVIDERS=[
  ...NbAuthModule.forRoot({

    strategies: [
      MyPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: '/assets/data/',
        login : {
          endpoint: "user",
          method: 'get'
        },
        logout: {
          endpoint: "user-logout.json",
          method: 'get'
        }
      }),
    ],

  }).providers,
  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: 'auth',
      },
      user: {
        parent: 'guest',
        create: 'draft',
        edit: 'draft',
        view: ['user' , 'draft']
      },
      admin: {
        parent: "user"
      },
      superadmin: {
        parent: "admin"
      }
    },
  }).providers,
  {
    provide: NbRoleProvider, useClass: RoleProvider,
  },
  AuthGuard,
  MyPasswordAuthStrategy,
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,

    NbAuthModule,
  ],
  declarations: [
    NgxLoginComponent, 
  ],
  providers: [
    ...AUTH_PROVIDERS
  ]
})
export class NgxAuthModule {
  static forRoot(): ModuleWithProviders<NgxAuthModule> {
    return {
      ngModule: NgxAuthModule,
      providers: [
        ...AUTH_PROVIDERS
      ]
    }
  }
}
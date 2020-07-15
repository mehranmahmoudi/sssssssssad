import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { NbAuthService , NbAuthSimpleToken } from '@nebular/auth';
import { Injectable } from '@angular/core';
import { NbRoleProvider } from '@nebular/security';

@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthSimpleToken) => {
          console.log(token);
          return token.isValid() ? (token.getValue()['role'] as string).toLowerCase()  : 'guest';
        }),
      );
  }
}
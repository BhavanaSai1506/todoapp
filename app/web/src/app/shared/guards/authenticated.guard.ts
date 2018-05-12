import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import {Observable} from "rxjs";

import * as fromAuth from '@core/store/auth/reducers';
import {map} from "rxjs/internal/operators";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromAuth.getLoggedIn).pipe(
      map(authed => {
        if (!authed) {
          this.router.navigate(['/auth']);
          return false;
        }
        return true;
      })
    );
  }
}

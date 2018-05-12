import {Component} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from "rxjs";

import {Router} from "@angular/router";

import * as Auth from '@core/store/auth/actions';
import * as fromAuth from '@core/store/auth/reducers';

@Component({
  selector: 'td-navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

  isAuth$: Observable<boolean>;

  constructor(private store: Store<fromAuth.State>, private router: Router) {
    this.isAuth$ = store.select(fromAuth.getLoggedIn);
  }

  logout() {
    this.store.select(fromAuth.getLoggedIn).subscribe((autenticated) => {
      if (!autenticated) {
        this.router.navigate(['auth']);
      }
    });
    this.store.dispatch(new Auth.Logout());
  }
}

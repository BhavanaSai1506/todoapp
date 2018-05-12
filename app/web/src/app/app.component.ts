import {Component, Inject} from '@angular/core';
import {ApiService} from "@core/shared/services/api/api.service";
import {ILocalStorage, LocalStorage} from "@core/shared/services/storage";
import {Store} from "@ngrx/store";

import * as Auth from "@core/store/auth/actions";
import * as fromAuth from "@core/store/auth/reducers";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    apiService: ApiService,
    private store: Store<fromAuth.State>,
    @Inject(LocalStorage) private localStorage: ILocalStorage) {

    this.localStorage.setItem("test", 'data test');

    store.dispatch(new Auth.CheckAuthentication());

  }
}

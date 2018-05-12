import {Component, Inject} from '@angular/core';
import {ApiService} from "@core/shared/services/api/api.service";
import {ILocalStorage, LocalStorage} from "@core/shared/services/storage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    apiService: ApiService,
    @Inject(LocalStorage) private localStorage: ILocalStorage) {

    this.localStorage.setItem("test", 'data test');

  }
}

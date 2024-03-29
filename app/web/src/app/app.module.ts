import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthCoreModule} from "@core/store/auth/auth.module";
import {TodosCoreModule} from "@core/store/todo/todo.module";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {metaReducers, reducers} from "@core/store";
import {StoreModule} from "@ngrx/store";
import {ApiService} from "@core/shared/services/api/api.service";
import {CoreModule} from "@core/core.module";
import {LocalStorage} from "@core/shared/services/storage";
import {SharedModule} from "src/app/shared/shared.module";
import {routes} from "src/app/app.routes";
import {TodosModule} from "src/app/modules/todos/todos.module";
import {AuthModule} from "src/app/modules/auth/auth.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


export function storage() {
  return localStorage;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,

    HttpClientModule,

    NgbModule.forRoot(),

    SharedModule,
    routes,

    TodosModule,
    AuthModule,

    CoreModule.forRoot([
      {provide: LocalStorage, useFactory: (storage)}
    ]),

    StoreModule.forRoot(reducers, {metaReducers}),

    AuthCoreModule.forRoot(),
    TodosCoreModule.forRoot(),

    EffectsModule.forRoot([]),

    StoreDevtoolsModule.instrument()
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

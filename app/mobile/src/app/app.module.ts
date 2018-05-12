import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {EffectsModule} from "@ngrx/effects";

import {StoreDevtoolsModule} from "@ngrx/store-devtools";

import {StoreModule} from "@ngrx/store";
import {CoreModule} from "@core/core.module";
import {LocalStorage} from "@core/shared/services/storage";
import {metaReducers, reducers} from "@core/store";
import {AuthCoreModule} from "@core/store/auth/auth.module";
import {TodosCoreModule} from "@core/store/todo/todo.module";
import {ApiService} from "@core/shared/services/api/api.service";

export function storage() {
  return localStorage;
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    CoreModule.forRoot([
      {provide: LocalStorage, useFactory: (storage)}
    ]),

    StoreModule.forRoot(reducers, {metaReducers}),

    AuthCoreModule.forRoot(),
    TodosCoreModule.forRoot(),

    EffectsModule.forRoot([]),

    StoreDevtoolsModule.instrument()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiService
  ]
})
export class AppModule {
}

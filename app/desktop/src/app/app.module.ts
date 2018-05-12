import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "@core/core.module";
import {LocalStorage} from "@core/shared/services/storage";
import {StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "@core/store";
import {AuthCoreModule} from "@core/store/auth/auth.module";
import {TodosCoreModule} from "@core/store/todo/todo.module";
import {ApiService} from "@core/shared/services/api/api.service";


export function storage() {
    return localStorage;
}

@NgModule({
    imports: [
        BrowserModule,

        CommonModule,

        HttpClientModule,

        CoreModule.forRoot([
            {provide: LocalStorage, useFactory: (storage)}
        ]),

        StoreModule.forRoot(reducers, {metaReducers}),

        AuthCoreModule.forRoot(),
        TodosCoreModule.forRoot(),

        EffectsModule.forRoot([]),

        StoreDevtoolsModule.instrument()

    ],
    declarations: [
        AppComponent
    ],
    providers: [
        ApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
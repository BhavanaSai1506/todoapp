import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AuthService} from "@core/store/auth/services/auth.service";
import {StoreModule} from "@ngrx/store";
import {reducers} from "@core/store/auth/reducers";
import {EffectsModule} from "@ngrx/effects";
import {AuthenticationEffects} from "@core/store/auth/effects";

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [],
    providers: [AuthService]
})
export class AuthCoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootAuthModule
        };
    }
}

@NgModule({
    imports: [
        AuthCoreModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([
            AuthenticationEffects
        ]),
    ],
})
export class RootAuthModule {
}
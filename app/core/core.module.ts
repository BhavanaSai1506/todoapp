/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
import {ModuleWithProviders, NgModule, Optional, SkipSelf} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

import {SHARED_COMPONENTS} from "@core/shared/components";
import {SHARED_PIPES} from "@core/shared/pipes";
import {SHARED_DIRECTIVES} from "@core/shared/directives";
import {SHARED_PROVIDERS} from "@core/shared/services";

export const SHARED_MODULES: any[] = [
    HttpClientModule
];

@NgModule({
    imports: [
        ...SHARED_MODULES
    ],
    declarations: [
        ...SHARED_DIRECTIVES,
        ...SHARED_COMPONENTS,
        ...SHARED_PIPES,
    ],
    exports: [
        ...SHARED_DIRECTIVES,
        ...SHARED_COMPONENTS,
        ...SHARED_PIPES,

        ...SHARED_MODULES,

    ],
    providers: [
        ...SHARED_PROVIDERS,
    ]
})
export class CoreModule {
    // configuredProviders: *required to configure LocalStorage per platform
    static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: configuredProviders
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule already loaded; Import in root module only.');
        }
    }
}
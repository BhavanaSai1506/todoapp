import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TodosService} from "@core/store/todo/services/todo.service";
import {reducers} from "@core/store/todo/reducers";
import {TodosEffects} from "@core/store/todo/effects";

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [],
    providers: [TodosService]
})
export class TodosCoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootTodosModule
        };
    }
}

@NgModule({
    imports: [
        TodosCoreModule,
        StoreModule.forFeature('todos', reducers),
        EffectsModule.forFeature([TodosEffects]),
    ],
})
export class RootTodosModule {
}
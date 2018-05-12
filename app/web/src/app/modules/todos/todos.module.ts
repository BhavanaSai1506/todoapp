import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { routing } from "./todos.routes";

import { TodosPageComponent } from "./pages/todos.page";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
    imports: [
        SharedModule,
        routing,

        NgbModule.forRoot()
    ],
    declarations: [
        TodosPageComponent
    ],
    exports: [

    ]
})
export class TodosModule {

}

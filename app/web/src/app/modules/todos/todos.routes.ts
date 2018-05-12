import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosPageComponent } from "./pages/todos.page";
import {AuthenticatedGuard} from "../../shared/guards/authenticated.guard";

const routes: Routes = [
    {
        path: '',
        component: TodosPageComponent,
        canActivate: [AuthenticatedGuard],
        canActivateChild: [AuthenticatedGuard]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

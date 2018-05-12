import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPageComponent } from "./pages/auth.page";

import {UnauthenticatedGuard} from "../../shared/guards/unauthenticated.guard";

const routes: Routes = [
    {
        path: '',
        component: AuthPageComponent,
        canActivate: [UnauthenticatedGuard],
        canActivateChild: [UnauthenticatedGuard]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

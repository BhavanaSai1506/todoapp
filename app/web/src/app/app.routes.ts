import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TodosModule} from "src/app/modules/todos/todos.module";
import {AuthModule} from "src/app/modules/auth/auth.module";
const appRoutes:Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full'
  },
  {
    path: 'todos',
    //loadChildren: 'src/appmodules/todos/todos.module#TodosModule',
    loadChildren: () => TodosModule,
  },
  {
    path: 'auth',
    //loadChildren: 'src/app/modules/auth/auth.module#AuthModule',
    loadChildren: () => AuthModule
  }
];

export const routes:ModuleWithProviders = RouterModule.forRoot(appRoutes);

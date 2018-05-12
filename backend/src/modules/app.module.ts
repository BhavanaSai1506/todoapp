'use strict';

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from "./todos/todos.module";

@Module({
    controllers: [],
    components: [],
    modules: [
        UsersModule,
        TodosModule,
        AuthModule
    ],
    exports: []
})
export class ApplicationModule { }
'use strict';

import { Module, RequestMethod } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { TodosController } from './todos.controller';
import { IUser } from "../../models/interfaces/IUser";
import { UsersService } from "../users/users.service";

@Module({
    controllers: [TodosController],
    components: [UsersService],
    modules: [],
    exports: []
})
export class TodosModule {

    configure(consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(TodosController);
    }
}

'use strict';

import { Module, RequestMethod } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { UsersController } from './users.controller';
import { UsersService } from "./users.service";

@Module({
    controllers: [UsersController],
    components: [UsersService],
    modules: [],
    exports: [UsersService]
})
export class UsersModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(UsersController);
    }
}

'use strict';

import { Middleware, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { MessageCodeError } from '../lib/error/MessageCodeError';
import { models } from '../models/index';
import { UsersService } from "../modules/users/users.service";

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    constructor(public usersService: UsersService) {}

    resolve () {
        return async function (req: Request, res: Response, next: NextFunction) {
            if (req.headers.authorization && (req.headers.authorization as string).split(' ')[0] === 'Bearer') {
                
                let token = (req.headers.authorization as string).split(' ')[1];
                if (!token) throw new MessageCodeError('request:unauthorized');
                
                try {
                    let user = await this.usersService.getUserFromToken(token);
                    if (!user) throw new MessageCodeError('request:unauthorized');
                }catch(err){
                    throw new MessageCodeError('request:unauthorized');
                }

                next();

            } else {
                throw new MessageCodeError('request:unauthorized');
            }
            
        }.bind(this);
    }
}

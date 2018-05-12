'use strict';

import {Controller, Post, HttpStatus, Req, Res} from '@nestjs/common';
import { Request, Response } from 'express';
import { MessageCodeError } from '../../lib/error/MessageCodeError';
import { AuthService } from './auth.service';
import { models, sequelize } from '../../models/index';

@Controller()
export class AuthController {
    constructor (private authService: AuthService) { }

    @Post('login')
    public async login (@Req()req, @Res() res) {
        console.error(req, res);
        const body = req && req.body;
        if (!body) throw new MessageCodeError('auth:login:missingInformation');
        if (!body.email) throw new MessageCodeError('auth:login:missingEmail');
        if (!body.password) throw new MessageCodeError('auth:login:missingPassword');

        const token = await this.authService.sign(body);

        const user = await models.User.findOne({
            where: {
                email: body.email
            }
        });

        const response = {
            user,
            token : 'Bearer ' + token
        };
        res.status(HttpStatus.ACCEPTED).json(response);
    }

    @Post('register')
    public async register (@Req()req, @Res() res) {
        const body = req && req.body;
        if (!body) throw new MessageCodeError('auth:login:missingInformation');
        if (!body.email) throw new MessageCodeError('auth:login:missingEmail');
        if (!body.password) throw new MessageCodeError('auth:login:missingPassword');

        let emailExists = await this.authService.emailExists(body.email);

        if(emailExists) throw new MessageCodeError('auth:register:userAlreadyExists');

        let user = await sequelize.transaction(async t => {
            return await models.User.create(body, { transaction: t });
        });

        const token = await this.authService.sign(body);

        const response = {
            user,
            token : 'Bearer ' + token
        };

        res.status(HttpStatus.ACCEPTED).json(response);
    }
}
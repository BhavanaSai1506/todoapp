'use strict';

import {Controller, Get, Post, Put, Delete, HttpStatus, Res, Req} from '@nestjs/common';
import {Request, Response} from 'express';
import {MessageCodeError} from '../../lib/error/MessageCodeError';
import {models, sequelize} from '../../models/index';

@Controller()
export class UsersController {
    @Get('users')
    public async index(@Req()req, @Res() res) {
        const users = await models.User.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Post('users')
    public async create(@Req()req, @Res() res) {
        const body = req.body;
        if (!body || (body && Object.keys(body).length === 0))
            throw new MessageCodeError('user:create:missingInformation');

        await sequelize.transaction(async t => {
            return await models.User.create(body, {transaction: t});
        });

        return res.status(HttpStatus.CREATED).send();
    }

    @Get('users/:id')
    public async show(@Req()req, @Res() res) {
        const id = req.params.id;
        if (!id) throw new MessageCodeError('user:show:missingId');

        const user = await models.User.findOne({
            where: {id}
        });
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('users/:id')
    public async update(@Req()req, @Res() res) {
        const id = req.params.id;
        const body = req.body;
        if (!id) throw new MessageCodeError('user:update:missingId');
        if (!body || (body && Object.keys(body).length === 0)) throw new MessageCodeError('user:update:missingInformation');

        await sequelize.transaction(async t => {
            const user = await models.User.findById(id, {transaction: t});
            if (!user) throw new MessageCodeError('user:notFound');

            /* Keep only the values which was modified. */
            const newValues = {};
            for (const key of Object.keys(body)) {
                if (user.getDataValue(key as any) !== body[key]) newValues[key] = body[key];
            }

            return await user.update(newValues, {transaction: t});
        });

        return res.status(HttpStatus.OK).send();
    }

    @Delete('users/:id')
    public async delete(@Req()req, @Res() res) {
        const id = req.params.id;
        if (!id) throw new MessageCodeError('user:delete:missingId');

        await
            sequelize.transaction(async t => {
                return await models.User.destroy({
                    where: {id},
                    transaction: t
                });
            });

        return res.status(HttpStatus.OK).send();
    }
}

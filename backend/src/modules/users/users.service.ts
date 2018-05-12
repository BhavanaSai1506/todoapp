import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { models } from '../../models/index';

@Component()
export class UsersService {
    
    async getUserFromToken(token: string) {
        
        if(!token) {
            return Promise.reject('No token provided');
        }

        let decoded: any; 

        try {
            decoded = await jwt.verify(token, process.env.JWT_KEY || '');
        }catch(err) {
            return Promise.reject(err);
        }

        const user = await models.User.findOne({
            where: {
                id: decoded.id,
                email: decoded.email
            }
        });

        return Promise.resolve(user);
    }
}
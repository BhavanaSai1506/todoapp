'use strict';

import { Instance } from 'sequelize';

export interface ITodo {
    id: number;
    completed: boolean;
    title: string;
    createdAt: Date;
    completedAt: Date;
    UserId: number;
}

export interface ITodoInstance extends Instance<ITodo> {
    dataValues: ITodo;
}

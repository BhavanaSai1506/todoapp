'use strict';

import * as crypto from 'crypto';
import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { MessageCodeError } from '../lib/error/MessageCodeError';
import { ITodo, ITodoInstance } from './interfaces/ITodo';
import { SequelizeModels } from "./index";

export default function Todo(sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<ITodoInstance, ITodo> {
    let Todo = sequelize.define<ITodoInstance, ITodo>('Todo', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        completed: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: false
        },
        completedAt: {
            type: dataTypes.DATE,
            allowNull: true
        }
    }, {
            tableName: 'todos',
            paranoid: false,
            timestamps: true,
            scopes: {},
            indexes: [],
            classMethods: {
                associate(models: SequelizeModels) {
                    Todo.belongsTo(models.User, {
                        foreignKey: {
                            allowNull: false
                        }
                    });
                }
            },
            instanceMethods: {},
            hooks: {
                beforeValidate(todo: ITodoInstance, options: any): void {
                    if (!options.transaction) throw new Error('Missing transaction.');
                    if (!todo.getDataValue('title')) throw new MessageCodeError('todo:create:missingTitle');
                },
                beforeCreate(todo: ITodoInstance, options: any): void {
                    if (!options.transaction) throw new Error('Missing transaction.');
                },
                beforeDestroy(todo: ITodoInstance, options: any): void {
                    if (!options.transaction) throw new Error('Missing transaction.');
                }
            }
        });

    return Todo;
}

import {Action} from '@ngrx/store';

import {UserRegister} from "@core/store/auth/models";

export enum RegisterActionTypes {
    Register = '[Auth] Register user',
    RegisterSuccess = '[Auth] Register with success',
    RegisterFailed = '[Auth] Register failed'
}

export class Register implements Action {
    readonly type = RegisterActionTypes.Register;

    constructor(public payload: UserRegister) {
    }
}

export class RegisterSuccess implements Action {
    readonly type = RegisterActionTypes.RegisterSuccess;

    constructor(public payload?: any) {
    }
}

export class RegisterFailure implements Action {
    readonly type = RegisterActionTypes.RegisterFailed;

    constructor(public payload?: any) {
    }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type RegisterActionsUnion =
    | Register
    | RegisterSuccess
    | RegisterFailure;
import {Action} from '@ngrx/store';

import {UserLogin} from "@core/store/auth/models";

export enum LoginActionTypes {
    Login = '[Auth] Login user',
    LoginSuccess = '[Auth] Login with success',
    LoginFailed = '[Auth] Login failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */


export class Login implements Action {
    readonly type = LoginActionTypes.Login;

    constructor(public payload: UserLogin) {
    }
}


export class LoginSuccess implements Action {
    readonly type = LoginActionTypes.LoginSuccess;

    constructor(public payload?: any) {
    }
}


export class LoginFailure implements Action {
    readonly type = LoginActionTypes.LoginFailed;

    constructor(public payload?: any) {
    }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type LoginActionsUnion =
    | Login
    | LoginSuccess
    | LoginFailure;

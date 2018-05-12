import {Action} from '@ngrx/store';

export enum LogoutActionTypes {
    Logout = '[Auth] Logout user',
    LogoutSuccess = '[Auth] Logout with success',
    LogoutFailed = '[Auth] Logout failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class Logout implements Action {
    readonly type = LogoutActionTypes.Logout;

    constructor(public payload?: any) {
    }
}


export class LogoutSuccess implements Action {
    readonly type = LogoutActionTypes.LogoutSuccess;

    constructor(public payload?: any) {
    }
}

export class LogoutFailure implements Action {
    readonly type = LogoutActionTypes.LogoutFailed;

    constructor(public payload?: any ) {
    }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type LogoutActionsUnion =
    | Logout
    | LogoutSuccess
    | LogoutFailure;
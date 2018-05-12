import {Action} from '@ngrx/store';

export enum CheckAuthActionTypes {
    CheckAuth = '[Auth] Check authentication',
    CheckAuthSuccess = '[Auth] Check authentication succes',
    CheckAuthFailure = '[Auth] Check authentication failed',
    CheckAuthSuccessButNoUser = '[Auth] Check authentication succes, but no user'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class CheckAuthentication implements Action {
    readonly type = CheckAuthActionTypes.CheckAuth;

    constructor(public payload?: any) {
    }
}


export class CheckAuthenticationSuccess implements Action {
    readonly type = CheckAuthActionTypes.CheckAuthSuccess;

    constructor(public payload?: any) {
    }
}


export class CheckAuthenticationFailure implements Action {
    readonly type = CheckAuthActionTypes.CheckAuthFailure;

    constructor(public payload?: any) {
    }
}

export class CheckAuthenticationNoUser implements Action {
    readonly type = CheckAuthActionTypes.CheckAuthSuccessButNoUser;

    constructor(public payload?: any) {
    }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CheckAuthActionsUnion =
    | CheckAuthentication
    | CheckAuthenticationSuccess
    | CheckAuthenticationFailure
    | CheckAuthenticationNoUser;
import {User} from "@core/store/auth/models";
import {
    CheckAuthActionsUnion,
    CheckAuthActionTypes,
    LoginActionsUnion,
    LoginActionTypes,
    LogoutActionsUnion,
    LogoutActionTypes,
    RegisterActionsUnion,
    RegisterActionTypes
} from "@core/store/auth/actions";

export interface State {

    tokenCheckComplete: boolean;
    isLoggedIn: boolean;
    inProgress: boolean;

    user: User;
    error: null;
}

export const initialState: State = {
    tokenCheckComplete: false,
    isLoggedIn: false,
    inProgress: false,

    user: null,
    error: null,
};

export function reducer(
    state = initialState,
    action: LoginActionsUnion | RegisterActionsUnion | LogoutActionsUnion | CheckAuthActionsUnion): State {

    switch (action.type) {

        /**
         * --------------------------------------------------
         * Check Authentication Actions
         * --------------------------------------------------
         */

        case CheckAuthActionTypes.CheckAuth: {
            return {
                ...state,
                tokenCheckComplete: false,
                isLoggedIn: false,
                inProgress: true,
                error: null,
            };
        }

        case CheckAuthActionTypes.CheckAuthSuccess: {
            return {
                ...state,
                tokenCheckComplete: true,
                isLoggedIn: true,
                inProgress: false,
                user: action.payload.user
            };
        }

        case CheckAuthActionTypes.CheckAuthFailure: {
            return {
                ...state,
                tokenCheckComplete: true,
                isLoggedIn: false,
                inProgress: false
            };
        }

        case CheckAuthActionTypes.CheckAuthSuccessButNoUser: {
            return {
                ...state,
                tokenCheckComplete: true,
                isLoggedIn: false,
                inProgress: false
            };
        }

        /**
         * --------------------------------------------------
         * Login Actions
         * --------------------------------------------------
         */

        case LoginActionTypes.Login : {
            return {
                ...state,
                inProgress: true,
                isLoggedIn: false,
                tokenCheckComplete: false,
                error: null
            };
        }

        case LoginActionTypes.LoginSuccess : {
            return {
                ...state,
                inProgress: false,
                isLoggedIn: true,
                tokenCheckComplete: true,
                user: action.payload.user

            };
        }

        case LoginActionTypes.LoginFailed : {
            return {
                ...state,
                inProgress: false,
                isLoggedIn: false,
                tokenCheckComplete: true,
                error: action.payload.error
            };
        }

        /**
         * --------------------------------------------------
         * Logout Actions
         * --------------------------------------------------
         */

        case LogoutActionTypes.Logout : {
            return {
                ...state,
                inProgress: true
            };
        }

        case LogoutActionTypes.LogoutSuccess : {
            return initialState;
        }

        case LogoutActionTypes.LogoutFailed : {
            return {
                ...state,
                inProgress: false,
                error: action.payload.error
            };
        }

        /**
         * --------------------------------------------------
         * Register Actions
         * --------------------------------------------------
         */

        case RegisterActionTypes.Register : {
            return {
                ...state,
                inProgress: true,
                isLoggedIn: false,
                tokenCheckComplete: false,
                error: null
            };
        }

        case RegisterActionTypes.RegisterSuccess : {
            return {
                ...state,
                inProgress: false,
                isLoggedIn: true,
                tokenCheckComplete: true,
                user: action.payload.user
            };
        }

        case RegisterActionTypes.RegisterFailed : {
            return {
                ...state,
                inProgress: false,
                isLoggedIn: false,
                tokenCheckComplete: true,
                error: action.payload.error
            };
        }

        default: {
            return state;
        }
    }
}

export const getLoggedIn = (state: State) => state.isLoggedIn;
export const getUser = (state: State) => state.user;
export const getError = (state: State) => state.error;
export const getInProgress = (state: State) => state.inProgress;

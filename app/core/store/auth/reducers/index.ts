import * as fromAuth from '@core/store/auth/reducers/auth.reducer';
import * as fromRoot from '@core/store';
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface AuthState {
    auth: fromAuth.State;
}

export interface State extends fromRoot.State {
    auth: AuthState;
}

export const reducers = {
    auth: fromAuth.reducer
};

/**
 * --------------------------------------------------
 * State selectors
 * --------------------------------------------------
 */
export const selectAuthState = createFeatureSelector<AuthState>('auth');

/**
 * --------------------------------------------------
 * QUERIES
 * --------------------------------------------------
 */

export const selectAuthStatus = createSelector(selectAuthState, (state: AuthState) => state.auth);

export const getLoggedIn = createSelector(selectAuthStatus, fromAuth.getLoggedIn);
export const getUser = createSelector(selectAuthStatus, fromAuth.getUser);
export const getError = createSelector(selectAuthStatus, fromAuth.getError);
export const getInProgress = createSelector(selectAuthStatus, fromAuth.getInProgress);
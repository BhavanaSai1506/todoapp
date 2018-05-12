import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from "@ngrx/store";
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap,} from 'rxjs/operators';

import {
    CheckAuthActionTypes,
    CheckAuthentication,
    CheckAuthenticationFailure,
    CheckAuthenticationNoUser,
    CheckAuthenticationSuccess,
    Login,
    LoginActionTypes,
    LoginFailure,
    LoginSuccess,
    Logout,
    LogoutActionTypes,
    LogoutFailure,
    LogoutSuccess,
    Register,
    RegisterActionTypes,
    RegisterFailure,
    RegisterSuccess
} from "@core/store/auth/actions";
import {User, UserLogin, UserLoginResponse, UserRegister} from "@core/store/auth/models";
import {AuthService} from "@core/store/auth/services/auth.service";

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class AuthenticationEffects {
    constructor(private authService: AuthService, private actions$: Actions) {
    }

    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType<Login>(LoginActionTypes.Login),
        map((action: Login) => action.payload),
        switchMap((payload: UserLogin) =>
            this.authService.login(payload).pipe(
                map((response: UserLoginResponse) => new LoginSuccess(response)),
                catchError(err => of(new LoginFailure(err)))
            )
        )
    );

    @Effect()
    register$: Observable<Action> = this.actions$.pipe(
        ofType<Register>(RegisterActionTypes.Register),
        map((action: Register) => action.payload),
        switchMap((payload: UserRegister) =>
            this.authService.register(payload).pipe(
                map((res: any) => new RegisterSuccess(res)),
                catchError(err => of(new RegisterFailure(err)))
            )
        )
    );

    @Effect()
    logout$: Observable<Action> = this.actions$.pipe(
        ofType<Logout>(LogoutActionTypes.Logout),
        map((action: Logout) => action.payload),
        switchMap(() =>
            this.authService.logout().pipe(
                map(() => new LogoutSuccess()),
                catchError(err => of(new LogoutFailure(err)))
            )
        )
    );

    @Effect()
    checkAuth$: Observable<Action> = this.actions$.pipe(
        ofType<CheckAuthentication>(CheckAuthActionTypes.CheckAuth),
        map((action: CheckAuthentication) => action.payload),
        switchMap(() =>
            this.authService.checkAuth().pipe(
                map((user: User) => user ?
                    new CheckAuthenticationSuccess(user) :
                    new CheckAuthenticationNoUser()
                ),
                catchError(err => of(new CheckAuthenticationFailure(err)))
            )
        )
    );
}
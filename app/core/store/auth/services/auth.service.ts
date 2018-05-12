import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs/index";

import {UserLogin, UserLoginResponse, UserRegister} from "@core/store/auth/models";
import {ApiUrls} from "@core/shared/services/api";
import {ILocalStorage, LocalStorage} from "@core/shared/services/storage";
import {ApiService} from "@core/shared/services/api/api.service";
import {ACCESS_TOKEN_STORAGE_KEY, USER_STORAGE_KEY} from "@core/shared/constants";

@Injectable()
export class AuthService {

    constructor(
        private apiService: ApiService,
        @Inject(LocalStorage) private localStorage: ILocalStorage) {
    }

    login(payload: UserLogin): Observable<UserLoginResponse> {
        return new Observable(observer => {
            this.apiService.post(ApiUrls.LOGIN, payload)
                .subscribe(response => {

                    const {user, token} = response;

                    this.saveUserResponseToStorage({user, token});

                    observer.next({user, token});
                    observer.complete();

                }, (err) => {
                    const error = err && err.errorMessage ? err.errorMessage : 'Error';
                    observer.error({error});
                });
        });
    }

    register(payload: UserRegister): Observable<UserLoginResponse> {
        return new Observable(observer => {
            this.apiService.post(ApiUrls.REGISTER, payload)
                .subscribe(response => {

                    const {user, token} = response;

                    this.saveUserResponseToStorage({user, token});

                    observer.next({user, token});
                    observer.complete();

                }, (err) => {
                    const error = err && err.errorMessage ? err.errorMessage : 'Error';
                    observer.error({error});
                });
        });
    }

    logout() {
        return new Observable(observer => {
            AuthService.removeUserFromStorage();
            observer.next();
            observer.complete();
        });
    }

    checkAuth() {
        return new Observable(observer => {
            try {
                const userResponse: UserLoginResponse = AuthService.getUserFromStorage();
                userResponse ? observer.next(userResponse) : observer.next(null);
                observer.complete();
            }
            catch (e) {
                observer.error({error: e});
            }
        });
    }

    private saveUserResponseToStorage({user, token}): void {

        localStorage.setItem(
            USER_STORAGE_KEY,
            JSON.stringify(user)
        );

        localStorage.setItem(
            ACCESS_TOKEN_STORAGE_KEY,
            token
        );
    }

    private static removeUserFromStorage(): void {

        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);

    }

    private static getUserFromStorage(): UserLoginResponse | null {

        let user = JSON.parse(
            localStorage.getItem(USER_STORAGE_KEY)
        );

        let token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

        return user && token ? {user, token} : null;
    }
}
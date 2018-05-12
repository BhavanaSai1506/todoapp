import { Component,} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import { Router } from "@angular/router";

import * as Auth from '@core/store/auth/actions';
import * as fromAuth from '@core/store/auth/reducers';
// import * as fromAuth from '../../../../../../core/store/authentication/reducers';

@Component({
    selector: 'td-auth-page',
    templateUrl: 'auth.page.html',
    styleUrls: ['./auth.page.scss']
})
export class AuthPageComponent {

    loginForm: FormGroup;
    registerForm: FormGroup;

    error$ = this.store.select(fromAuth.getError);

    constructor(private store: Store<fromAuth.State>, private router: Router) {

       this.loginForm = new FormGroup ({
        email: new FormControl('', Validators.required),
        password: new FormControl('',Validators.required)
       });

       this.registerForm = new FormGroup ({
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('',Validators.required)
       });

       this.store.select(fromAuth.getLoggedIn).subscribe((isLoggedIn) => {
            if(isLoggedIn) {
                this.router.navigate(['todos']);
            }
       });
    }

    login() {
        this.store.dispatch(new Auth.Login({
            email: this.loginForm.controls.email.value,
            password: this.loginForm.controls.password.value
        }));
    }

    register() {
        this.store.dispatch(new Auth.Register({
            firstName: this.registerForm.controls.firstname.value,
            lastName: this.registerForm.controls.lastname.value,
            email: this.registerForm.controls.email.value,
            password: this.registerForm.controls.password.value
        }));
    }
}

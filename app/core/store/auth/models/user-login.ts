import {User} from "@core/store/auth/models/user";

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserLoginResponse {
    user: User;
    token: string;
}
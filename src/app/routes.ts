import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";

export let routes = [
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
]
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { AuthGuard } from "./guards/auth.guard";
import { NotLoggedInGuard } from "./guards/not-logged-in.guard";

export let routes = [
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [NotLoggedInGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NotLoggedInGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'reset/password',
        component: ResetPasswordComponent,
        canActivate: [NotLoggedInGuard]
    }
]
import { Routes } from '@angular/router';
import {SignupComponent} from "./signup.component";
import {SigninComponent} from "./signin.component";
import {LogoutComponent} from "./logout.component";
import {RedirectComponent} from "./redirect.component";

export const AUTH_ROUTES : Routes = [
    { path: '', component:RedirectComponent, pathMatch: 'full' },
    {path: 'signup', component: SignupComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'logout', component: LogoutComponent}

]
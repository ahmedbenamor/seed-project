import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common";
import {LogoutComponent} from "./logout.component";
import {SigninComponent} from "./signin.component";
import {SignupComponent} from "./signup.component";
import {ReactiveFormsModule} from "@angular/forms";
import {authRouting} from "./auth.routing";
import {RedirectComponent} from "./redirect.component";
@NgModule({
    declarations : [
        LogoutComponent,
        SigninComponent,
        SignupComponent,
        RedirectComponent
    ],
    imports : [
        CommonModule,
        ReactiveFormsModule,
        authRouting
    ],
    providers : [

    ]
})
export class AuthModule{

}
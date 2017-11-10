import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import {HttpModule} from "@angular/http";
import { AppComponent } from "./app.component";
import {MessageComponent} from "./messages/message.component";
import {MessageListComponent} from "./messages/message-list.component";
import {MessageInoutComponent} from "./messages/message-inout.component";
import {MessageService} from "./messages/message.service";
import {MessagesComponent} from "./messages/messages.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {HeaderComponent} from "./header.component";
import {routing} from "./app.routing";
import {LogoutComponent} from "./auth/logout.component";
import {SigninComponent} from "./auth/signin.component";
import {SignupComponent} from "./auth/signup.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./auth/auth.service";
import {RedirectComponent} from "./auth/redirect.component";


@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInoutComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SigninComponent,
        SignupComponent,
        RedirectComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule
    ],
    providers : [MessageService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
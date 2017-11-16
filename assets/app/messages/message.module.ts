import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MessageComponent} from "./message.component";
import {MessageListComponent} from "./message-list.component";
import {MessageInoutComponent} from "./message-inout.component";
import {MessagesComponent} from "./messages.component";
import {FormsModule} from "@angular/forms";
import {MessageService} from "./message.service";



@NgModule({
declarations : [
    MessageComponent,
    MessageListComponent,
    MessageInoutComponent,
    MessagesComponent,
],
    imports:[
        CommonModule,
        FormsModule
    ],
    providers : [
        MessageService
    ]
})
export class MessageModule{

}
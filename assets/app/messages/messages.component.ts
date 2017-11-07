import { Component } from '@angular/core';
import {Message} from "./message.model";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html'
})
export class MessagesComponent {

    messageToEdit: Message;

}
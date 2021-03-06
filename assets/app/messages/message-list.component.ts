import {Component, OnInit} from '@angular/core';
import {Message} from "./message.model";
import {MessageService} from "./message.service";
@Component({
  selector :'message-list',
  templateUrl : './message-list.component.html',

})
export class MessageListComponent implements OnInit{
    messages: Message[] = [];

    constructor(private messageService: MessageService){

    }

    ngOnInit(){
        this.messageService.getMessages().subscribe(
            (messages: Message[])=> {
                console.log(messages);
                this.messages = messages;
            }
        );
    }
}
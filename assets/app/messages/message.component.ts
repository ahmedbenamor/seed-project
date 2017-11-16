import { Component, Input} from '@angular/core'
import {Message} from "./message.model";
import {MessageService} from "./message.service";
@Component({
    selector : 'app-message',
    templateUrl : './message.component.html',
    styleUrls : ['./message.component.css']
})
export class MessageComponent {
    color : string = '#3b5998';
    @Input('inputMessage') message: Message;

    constructor(private messageService: MessageService){

    }

    onEdit(){
       this.messageService.editMessage(this.message)
    }

    onDelete(){
        this.messageService.deleteMessage(this.message).subscribe(
            data => console.log(data),
            error => console.log(error)
        );
    }

    belongsToUser(){
        return localStorage.getItem('userId') == this.message.userId;
    }
}
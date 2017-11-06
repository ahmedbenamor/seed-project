import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Component({
    selector : 'message-input',
    templateUrl : './message-inout.component.html'
})
export class MessageInoutComponent {

constructor(private messageService: MessageService){

}
    onSubmit(form: NgForm){
        const message = new Message(form.value.content,'Ahmed');
        this.messageService.addMessage(message);
        form.resetForm();
    }
}
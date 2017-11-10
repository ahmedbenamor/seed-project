import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Component({
    selector : 'message-input',
    templateUrl : './message-inout.component.html'
})
export class MessageInoutComponent implements OnInit{
    message: Message;

constructor(private messageService: MessageService){

}
ngOnInit(){
    this.messageService.messageIsEdit.subscribe(
        (message:Message)=>this.message = message
    )
}
    onSubmit(form: NgForm){
    if(this.message){
        // Edit
        this.messageService.updateMessage(this.message)
            .subscribe(
                result => {
                    console.log(result);
                    this.message.content = form.value.content;
                    form.resetForm();
                    this.message = null;
                },
                error => {
                    form.resetForm();
                    this.message = null;
                }
            );

    }else{
        const message = new Message(form.value.content,'Ahmed');
        this.messageService.addMessage(message)
            .subscribe(
                data => {
                    console.log(data);
                    form.resetForm();
                    this.message = null;
                },
                error => {
                    console.error(error);
                    form.resetForm();
                    this.message = null;
                }
            );
     }

    }
    onClear(form: NgForm){
        this.message = null;
        form.resetForm();
    }
}
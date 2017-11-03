import { Component } from '@angular/core';

@Component({
    selector : 'message-input',
    templateUrl : './message-inout.component.html'
})
export class MessageInoutComponent {


    onSave(value: string){
        console.log(value);
    }
}
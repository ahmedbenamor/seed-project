import {Component} from '@angular/core';
import {Message} from "./message.model";
@Component({
  selector :'message-list',
  templateUrl : './message-list.component.html',

})
export class MessageListComponent {
    messages: Message[] = [
        new Message('hello', 'ahmed'),
        new Message('aaz', 'aezrds'),
        new Message('dgsdfg', 'jhg'),
        new Message('vfdg', 'tgdfg')
    ];
}
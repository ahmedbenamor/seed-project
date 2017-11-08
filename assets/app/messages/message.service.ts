import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers,Response } from "@angular/http";
import "rxjs/Rx";
import {Observable } from "rxjs";
import {Message} from "./message.model";



@Injectable()
export class MessageService {
    constructor(private http : Http){
    }
    messages: Message[]=[];
    messageIsEdit = new EventEmitter<Message>();

    addMessage(message: Message){

        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http.post('http://localhost:3000/message', body,{headers: headers})
            .map((response: Response)=> {
                const result = response.json();
                const message = new Message(result.obj.content,'Ahmed', result.obj._id, null);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response)=> Observable.throw(error));
    }

    getMessages(){
        return this.http.get('http://localhost:3000/message')
            .map((response:Response)=>{
                const messages = response.json().obj;
                let transformedMessage : Message[]= [];
                for(let message of messages){
                    transformedMessage.push(new Message(message.content,'Ahmed', message._id, null));
                }
                this.messages = transformedMessage;
                return transformedMessage;
            })
            .catch((error: Response)=> Observable.throw(error));
    }

    editMessage(message: Message){
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message){

        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http.patch('http://localhost:3000/message/'+message.messageId, body,{headers: headers})
            .map((response: Response)=>response.json())
            .catch((error: Response)=> Observable.throw(error.json()));

    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message),1);
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http.delete('http://localhost:3000/message/'+message.messageId,{headers: headers})
            .map((response: Response)=>response.json())
            .catch((error: Response)=> Observable.throw(error));
    }
}
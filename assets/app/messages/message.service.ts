import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers,Response } from "@angular/http";
import "rxjs/Rx";
import {Observable } from "rxjs";
import {Message} from "./message.model";
import {ErrorService} from "../errors/error.service";



@Injectable()
export class MessageService {
    constructor(private http : Http, private errorService: ErrorService){
    }
    messages: Message[]=[];
    messageIsEdit = new EventEmitter<Message>();

    addMessage(message: Message){

        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type':'application/json'});
        const token = localStorage.getItem('token')
            ? '?token='+localStorage.getItem('token')
            : '';

        return this.http.post('http://localhost:3000/message'+token, body,{headers: headers})
            .map((response: Response)=> {
                const result = response.json();
                const message = new Message(
                    result.obj.content,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response)=> {
                this.errorService.handleError(error.json())
                return Observable.throw(error)
            });
    }

    getMessages(){
        return this.http.get('http://localhost:3000/message')
            .map((response:Response)=>{
                const messages = response.json().obj;
                let transformedMessage : Message[]= [];
                for(let message of messages){
                   transformedMessage.push(new Message(
                       message.content,
                       message.user.firstName,
                       message._id,
                       message.user._id));
                }
                this.messages = transformedMessage;
                return transformedMessage;
            })
            .catch((error: Response)=> {
                this.errorService.handleError(error.json())
                return Observable.throw(error)
            });
    }

    editMessage(message: Message){
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message){

        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type':'application/json'});
        const token = localStorage.getItem('token')
            ? '?token='+localStorage.getItem('token')
            : '';
        return this.http.patch('http://localhost:3000/message/'+message.messageId + token, body,{headers: headers})
            .map((response: Response)=>response.json())
            .catch((error: Response)=> {
                this.errorService.handleError(error.json())
                return Observable.throw(error)
            });

    }

    deleteMessage(message: Message){

        const headers = new Headers({'Content-Type':'application/json'});
        const token = localStorage.getItem('token')
            ? '?token='+localStorage.getItem('token')
            : '';
        return this.http.delete('http://localhost:3000/message/'+message.messageId + token,{headers: headers})
            .map((response: Response)=>{
                this.messages.splice(this.messages.indexOf(message),1);
                return response.json();
            })
            .catch((error: Response)=> {
                this.errorService.handleError(error.json())
                return Observable.throw(error)
            });
    }
}
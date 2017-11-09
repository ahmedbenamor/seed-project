import {Component} from "@angular/core";
import { Router } from "@angular/router";
import {AuthService} from "./auth.service";

@Component({
    selector : "app-redirect",
    template : ``,
})
export class RedirectComponent {


    constructor(private authService: AuthService, private router : Router){
       if(authService.isLoggedIn()){
           this.router.navigate(['auth', 'logout']);
       }else {
           this.router.navigate(['auth', 'signin']);
       }

    }
}
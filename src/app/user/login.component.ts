import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
    templateUrl: './login.component.html',
    styles: [`
        em { float: right; font-size: 12px; color: #f22;}
    `]
})
export class LoginComponent {
    //Template driven form 
    userName
    password
    mouseOver
    loginInvalid: boolean = false;
    constructor(private authService: AuthService, private router: Router){

    }
    //custom server(ngf-server) only accepts username as 'johnpapa' for authentication, all other are invalid.
    //it doesn't check password.
    login(formValues) {
        this.authService.loginUser(formValues.userName,formValues.password).subscribe((response: any) => {
            if(response.success){                                                                   
                this.router.navigate(['events'])
            }
            else{
                this.loginInvalid = true
            }
        })
    }

    cancel() {
        this.router.navigate(['events'])
    }
}
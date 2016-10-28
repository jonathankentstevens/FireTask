import {Component, OnInit} from "@angular/core";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthService]
})

export class LoginComponent implements OnInit {

    loginError:string = "";
    email:string = "";
    password:string = "";

    constructor(private authService:AuthService, private router:Router) {
    }

    ngOnInit() {
    }

    login() {
        this.authService.login(this.email, this.password).then((success) => {
            this.loginError = "";
            this.router.navigate([""]);
        }).catch((err) => {
            this.loginError = "*** " + err.message;
        });
    }

}

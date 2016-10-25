import {Component, OnInit} from "@angular/core";
import {AuthService} from "../shared/auth.service";
import {User} from "../shared/user.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [AuthService]
})

export class RegisterComponent implements OnInit {

    user:User = new User();
    passwordVerify:string = "";
    registerError:string = "";

    constructor(private authService:AuthService, private router:Router) {
    }

    ngOnInit() {
    }

    submitRegister() {
        if (this.user.password === this.passwordVerify) {
            this.authService.createNewUser(this.user).then((success) => {
                this.registerError = "";
                this.router.navigate([""]);
            }).catch((err) => {
                this.registerError = "*** " + err.message;
            });
        } else {
            this.registerError = "*** Passwords do not match";
        }
    }

}

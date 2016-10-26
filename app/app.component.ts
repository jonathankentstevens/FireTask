import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from './shared/auth.service';
import {FirebaseAuthState} from 'angularfire2';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AuthService]
})

export class AppComponent implements OnInit {
    title:string = "Todo App";
    loggedIn:boolean = false;
    welcomeMsg:string = "";
    userAuth:FirebaseAuthState;

    constructor(private router:Router, private authService:AuthService) {
    }

    ngOnInit() {
        this.authService.getCurrent().subscribe(auth => {
            if (auth) {
                this.welcomeMsg = "Welcome, " + auth.auth.email;
                this.loggedIn = true;
            } else {
                this.welcomeMsg = "";
                this.loggedIn = false;
            }
        })
    }

    navigate(route:string) {
        this.router.navigate([route]);
    }

    logout() {
        this.authService.logout();
    }
}

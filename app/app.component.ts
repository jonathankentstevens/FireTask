import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFire} from 'angularfire2';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
    title:string = "Todo App";
    loggedIn:boolean = false;
    welcomeMsg:string = "";

    constructor(private router:Router, private af:AngularFire) {

    }

    ngOnInit() {
        this.af.auth.subscribe(auth => {
            if (auth) {
                this.welcomeMsg = "Welcome, " + auth.auth.email;
                this.loggedIn = true;
            } else {
                this.welcomeMsg = "";
                this.loggedIn = false;
            }
        });
    }

    navigate(route:string) {
        this.router.navigate([route]);
    }

    logout() {
        this.af.auth.logout();
        this.navigate("");
    }
}

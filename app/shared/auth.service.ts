import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFire, FirebaseAuthState} from 'angularfire2';
import {User} from "./user.model";

@Injectable()
export class AuthService {

    constructor(private af:AngularFire, private router:Router) {
    }

    createNewUser(user:User) {
        return this.af.auth.createUser({
            email: user.email,
            password: user.password
        })
    }

    getCurrent() {
        return this.af.auth
    }

    login(email:string, pass:string) {
        return this.af.auth.login({email: email, password: pass});
    }

    logout() {
        this.af.auth.logout();
        this.router.navigate([""]);
    }
}

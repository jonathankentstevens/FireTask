import {Injectable} from "@angular/core";
import {AngularFire} from 'angularfire2';
import {User} from "./user.model";

@Injectable()
export class AuthService {

    constructor(private af:AngularFire) {
    }

    createNewUser(user:User) {
        return this.af.auth.createUser({
            email: user.email,
            password: user.password
        })
    }

    login(email:string, pass:string) {
        return this.af.auth.login({email: email, password: pass});
    }

    logout() {
        return this.af.auth.logout();
    }
}

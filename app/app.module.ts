import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {routing, appRoutingProviders} from "./app.routing";
import {MaterialModule} from "@angular/material";
import {AngularFireModule, AuthProviders, AuthMethods} from "angularfire2";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";

export const firebaseConfig = {
    apiKey: "AIzaSyDO4cLoAfFo37TraE-TAzhnpdbEzp0xn98",
    authDomain: "todo-app-4a005.firebaseapp.com",
    databaseURL: "https://todo-app-4a005.firebaseio.com",
    storageBucket: "todo-app-4a005.appspot.com",
    messagingSenderId: "608611629294"
};

export const firebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        MaterialModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
    ],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})

export class AppModule {
}

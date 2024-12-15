import { Component } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-main",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent {
    constructor(private userService: UserService) {}
    get isLoggedIn(): boolean {
        return this.userService.isLogged;
    }
}

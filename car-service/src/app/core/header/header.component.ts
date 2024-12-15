import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
    constructor(private userService: UserService, private router: Router) {}

    get isLoggedIn(): boolean {
        return this.userService.isLogged;
    }

    // todo make getter for username
    get username(): string {
        return this.userService.getUser()?.username || "";
    }
    logout() {
        this.userService.logout().subscribe({
            next: () => {
                this.userService.clearUser();
                this.router.navigate(["/"]);
            },
            error: () => {
                this.userService.clearUser();
                console.log("ERRROR");

                this.router.navigate(["/users/login"]);
            },
            complete: () => {
                this.userService.clearUser();
                this.router.navigate(["/"]);
            },
        });
    }
}

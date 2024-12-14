import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

import { UserService } from "../../services/user.service";
import { emailValidator } from "src/app/utils/email-validator";
import { matchPassword } from "src/app/utils/match-password";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
    errorMsg!: string;

    form = this.fb.group({
        username: ["", [Validators.required, Validators.minLength(4)]],
        email: ["", [Validators.required, emailValidator()]],
        passGroup: this.fb.group(
            {
                password: ["", [Validators.required, Validators.minLength(4)]],
                rePassword: [
                    "",
                    [
                        Validators.required,
                        matchPassword("password", "rePassword"),
                    ],
                ],
            },
            {
                validators: [matchPassword("password", "rePassword")],
            },
        ),
    });
    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
    ) {}

    register(): void {
        if (this.form.invalid) {
            return console.error("Form is invalid!");
        }
        // console.log("Form submitted:", this.form.value);
        const {
            username,
            email,
            passGroup: { password, rePassword } = {},
        } = this.form.value;
        const userData = {
            username: username!,
            email: email!,
            password: password!,
            rePassword: rePassword!,
        };
        // console.log("Form submitted:", userData);
        this.userService.userSubscription = this.userService
            .register(userData)
            .subscribe({
                next: (res) => {
                    console.log("registered:", res);

                    this.userService.setUser(res);
                    this.router.navigate(["/catalog"]);
                },
                error: (err) => {
                    console.error("Error registering user:", err);
                    this.errorMsg =
                        err.error?.error ||
                        "An error occurred during registration.";
                },
            });
    }
}

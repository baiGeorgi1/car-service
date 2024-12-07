import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

import { UserService } from "../user.service";
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
                "re-password": [
                    "",
                    [
                        Validators.required,
                        matchPassword("password", "re-password"),
                    ],
                ],
            },
            {
                validators: [matchPassword("password", "re-password")],
            },
        ),
    });
    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        router: Router,
    ) {}

    register(): void {
        if (this.form.invalid) {
            return console.error("Form is invalid!");
        } else {
            console.log("Form submitted:", this.form.value);
        }
    }
}

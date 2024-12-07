import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

import { emailValidator } from "src/app/utils/email-validator";
import { UserService } from "../user.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent {
    // TODO - erroMSG
    errorMsg!: string;

    form = this.fb.group({
        email: ["", [Validators.required, emailValidator()]],
        password: ["", [Validators.required, Validators.minLength(4)]],
    });

    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private router: Router,
    ) {}

    login(): void {
        if (this.form.invalid) {
            return;
        }
        console.log(this.form.value);
    }
}

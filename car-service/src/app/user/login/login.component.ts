import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

import { emailValidator } from "src/app/utils/email-validator";
import { UserService } from "../../services/user.service";
import { ErrorService } from "src/app/core/error/error.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent {
    errorMsg: string = "";

    form = this.fb.group({
        email: ["", [Validators.required, emailValidator()]],
        password: ["", [Validators.required, Validators.minLength(4)]],
    });

    constructor(
        private errorService: ErrorService,
        private userService: UserService,
        private fb: FormBuilder,
        private router: Router,
    ) {}

    login(): void {
        if (this.form.invalid) {
            return;
        }

        const { email, password } = this.form.value;
        this.userService.userSubscription = this.userService
            .login(email!, password!)
            .subscribe({
                next: (userData) => {
                    if (userData) {
                        this.userService.setUser(userData);
                        this.router.navigate(["/"]);
                    }
                },
                error: () => {
                    const error = this.errorService.getError();
                    this.errorMsg = error.error;
                },
            });
    }
}

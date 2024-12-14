import { ValidatorFn } from "@angular/forms";

export function matchPassword(
    password: string,
    rePassword: string,
): ValidatorFn {
    return (control) => {
        const passwordVerify = control.get(password);
        const rePassVerify = control.get(rePassword);

        const match = passwordVerify?.value === rePassVerify?.value;

        return match ? null : { matchPassword: true };
    };
}

import { ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn {
    const regExp = new RegExp(`^[a-z0-9]+@[a-z]+\.[a-z]{2,}$`);

    return (control) => {
        const isInvalidEmail =
            control.value === "" || regExp.test(control.value);

        return isInvalidEmail ? null : { emailValidator: true };
    };
}

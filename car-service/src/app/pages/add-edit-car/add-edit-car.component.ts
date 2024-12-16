import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CarService } from "src/app/services/car.service";
import { UserService } from "src/app/services/user.service";
import { Car } from "src/app/types/car";

@Component({
    selector: "app-add-edit-car",
    templateUrl: "./add-edit-car.component.html",
    styleUrls: ["./add-edit-car.component.css"],
})
export class AddEditCarComponent implements OnDestroy {
    carAdded = {} as Car;
    editMode: boolean = false;
    addMode: boolean = false;
    subscribe$!: Subscription;
    errorMsg!: string;

    form = this.fb.group({
        model: [
            "",
            [
                Validators.required,
                Validators.minLength(2),
                Validators.pattern(/^[a-zA-Z\s]+$/),
            ],
        ],
        type: ["", [Validators.required, Validators.minLength(2)]],
        transmission: ["", [Validators.required, Validators.minLength(2)]],
        price: [
            "",
            [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
        ],
        hp: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
        imageUrl: ["", [Validators.required]],
        year: [
            "",
            [
                Validators.required,
                Validators.pattern(/^\d+$/),
                Validators.min(1950),
                Validators.max(2024),
            ],
        ],
        description: [
            "",
            [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(200),
            ],
        ],
    });

    constructor(
        private userService: UserService,
        private carService: CarService,
        private fb: FormBuilder,
        private router: Router,
    ) {}
    public get userId(): string {
        return this.userService.getUser()._id;
    }

    addCar(): void {
        if (this.form.invalid) {
            return;
        }
        // console.log("COMPLETED", this.form.value);
        const car = this.form.value;
        Object.assign(this.carAdded, car);
        this.carAdded.owner = this.userId;
        this.subscribe$ = this.carService.addCar(this.carAdded).subscribe({
            next: () => {
                this.form.reset();
                this.router.navigate(["catalog/my-cars"]);
            },
            error: (err) => {
                this.errorMsg = err.error.message;
            },
        });
    }

    ngOnDestroy(): void {
        if (this.subscribe$) {
            this.subscribe$.unsubscribe();
        }
    }
}

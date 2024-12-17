import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CarService } from "src/app/services/car.service";
import { UserService } from "src/app/services/user.service";
import { Car } from "src/app/types/car";

@Component({
    selector: "app-my-cars",
    templateUrl: "./my-cars.component.html",
    styleUrls: ["./my-cars.component.css"],
})
export class MyCarsComponent implements OnInit, OnDestroy {
    errorMsg!: string;
    subscribe$!: Subscription;

    myCars: Car[] = [];

    private get userId(): string {
        return this.userHttp.getUser()!._id;
    }

    constructor(
        private carApi: CarService,
        private userHttp: UserService,
        private router: Router,
    ) {}
    ngOnInit(): void {
        this.carApi.getCars().subscribe({
            next: (cars) => {
                for (const car in cars) {
                    const id = Object(cars[car].owner);
                    if (this.userId === id._id) {
                        this.myCars.push(cars[car]);
                    }
                }
            },
            error: (err) => {
                this.errorMsg = err.error.message;
            },
        });
    }
    addCar(): void {
        this.router.navigate(["/catalog/my-cars/add-car"]);
    }

    ngOnDestroy(): void {
        if (this.subscribe$!) {
            this.subscribe$.unsubscribe();
        }
    }
}

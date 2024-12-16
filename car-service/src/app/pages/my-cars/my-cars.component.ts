import { Component, OnInit } from "@angular/core";
import { CarService } from "src/app/services/car.service";
import { UserService } from "src/app/services/user.service";
import { Car } from "src/app/types/car";

@Component({
    selector: "app-my-cars",
    templateUrl: "./my-cars.component.html",
    styleUrls: ["./my-cars.component.css"],
})
export class MyCarsComponent implements OnInit {
    errorMsg!: string;
    myCars: Car[] = [];

    private get userId(): string {
        return this.userHttp.getUser()!._id;
    }

    constructor(private carApi: CarService, private userHttp: UserService) {}
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
}

import { Component, OnInit } from "@angular/core";
import { CarService } from "src/app/services/car.service";
import { Car } from "src/app/types/car";

@Component({
    selector: "app-car-info",
    templateUrl: "./car-info.component.html",
    styleUrls: ["./car-info.component.css"],
})
export class CarInfoComponent implements OnInit {
    cars: Car[] = [];

    constructor(private carApi: CarService) {}

    ngOnInit(): void {
        this.carApi.getCars().subscribe({
            next: (car) => {
                this.cars = car; // Съхранява данните в `cars`
                console.log("Cars fetched:", this.cars);
            },
            error: (err) => {
                console.error("Error fetching cars:", err);
            },
        });
    }
}

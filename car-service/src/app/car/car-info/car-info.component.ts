import { Component, LOCALE_ID, OnInit } from "@angular/core";
import { CarService } from "src/app/services/car.service";
import { Car } from "src/app/types/car";
// Transform digits
import { registerLocaleData } from "@angular/common";
import localeBg from "@angular/common/locales/bg";

registerLocaleData(localeBg);
@Component({
    providers: [
        {
            provide: LOCALE_ID,
            useValue: "bg-BG",
        },
    ],
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
                this.cars = car;
                // console.log("Cars fetched:", this.cars);
            },
            error: (err) => {
                console.error("Error fetching cars:", err);
            },
        });
    }
}

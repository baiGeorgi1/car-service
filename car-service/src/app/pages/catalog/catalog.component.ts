import { Component, OnInit } from "@angular/core";
import { CarService } from "src/app/services/car.service";
import { Car } from "src/app/types/car";

@Component({
    selector: "app-catalog",
    templateUrl: "./catalog.component.html",
    styleUrls: ["./catalog.component.css"],
})
export class CatalogComponent implements OnInit {
    cars: Car[] = [];

    constructor(private carApi: CarService) {}

    ngOnInit(): void {
        this.carApi.getCars().subscribe({
            next: (car) => {
                this.cars = car;
            },
            error: (err) => {
                console.error("Error fetching cars:", err);
            },
        });
    }
}

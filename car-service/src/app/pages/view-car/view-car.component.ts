import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Subscription } from "rxjs";
import { CarService } from "src/app/services/car.service";
import { UserService } from "src/app/services/user.service";
import { Car } from "src/app/types/car";

@Component({
    selector: "app-newest-cars",
    templateUrl: "./view-car.component.html",
    styleUrls: ["./view-car.component.css"],
})
export class ViewCarComponent implements OnInit {
    subscribe$!: Subscription;
    isOwner!: boolean;
    deleteMode: boolean = false;

    errorMsg!: string;
    car = {} as Car;
    carId: string = "";

    private get userId(): string {
        return this.userService.getUser()._id;
    }

    constructor(
        private location: Location,
        private userService: UserService,
        private carApi: CarService,
        private router: Router,
        private activeRoute: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        this.activeRoute.params.subscribe((data) => {
            this.carId = data["car-details"];
            this.subscribe$ = this.carApi
                .getCar(this.carId, this.userId)
                .subscribe({
                    next: (car) => {
                        if (car.owner === this.userId) {
                            this.isOwner = true;
                        }
                        this.car = car;
                    },
                    error: (err) => (this.errorMsg = err.error.message),
                });
        });
    }
    onDelete(carId: string) {
        this.deleteMode = false;
        this.subscribe$ = this.carApi.deleteCar(carId).subscribe({
            error: (error) => (this.errorMsg = error.error.message),
            complete: () => this.router.navigate(["catalog/my-cars"]),
        });
    }
    onCancel(): void {
        this.deleteMode = false;
    }
    goBack(): void {
        this.location.back();
    }
}